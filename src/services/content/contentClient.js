import { ALLOWED_CONTENT_BRANCHES } from './contentConfig';

export const CONTENT_ROUTES = Object.freeze({
  '/about': 'about',
  '/access_data': 'access-data',
  '/analyze_data': 'analyze-data',
  '/support': 'support',
});

const RESERVED_APPLICATION_ROUTES = new Set([
  '/home', '/explore', '/graphql', '/search', '/study', '/user',
  '/fileCentricCart', '/data-dictionary', '/data-harmonization',
  '/request-access', '/crdc',
]);

const RAW_ORIGIN = 'https://raw.githubusercontent.com';
const APPROVED_OWNER = 'CBIIT';
const APPROVED_REPOSITORY = 'crdc-popsci-content';
const SAFE_NAME = /^[A-Za-z0-9._-]+$/;
const SAFE_REVISION = /^\d{4}-\d{2}-\d{2}\.[1-9]\d*$/;
const SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SAFE_ROUTE = /^\/[a-z0-9]+(?:[_-][a-z0-9]+)*$/;
// eslint-disable-next-line no-control-regex
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/;
const MAX_MANIFEST_BYTES = 64 * 1024;
const MAX_MARKDOWN_BYTES = 100 * 1024;
const ALLOWED_MANIFEST_TYPES = ['application/json', 'text/plain'];
const ALLOWED_MARKDOWN_TYPES = ['text/markdown', 'text/plain', 'application/octet-stream'];
const RAW_HTML = /<\/?[A-Za-z!][^>]*>/;
const MDX_EXPRESSION = /^(?:import|export)\s.+from\s+['"]/m;
// eslint-disable-next-line no-control-regex
const MARKDOWN_CONTROL_CHARACTERS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;

export class ContentError extends Error {
  constructor(message, code = 'CONTENT_ERROR') {
    super(message);
    this.name = 'ContentError';
    this.code = code;
  }
}

export class ContentNotFoundError extends ContentError {
  constructor(message) {
    super(message, 'NOT_FOUND');
    this.name = 'ContentNotFoundError';
  }
}

export class ContentConfigurationError extends ContentError {
  constructor(message) {
    super(message, 'CONFIGURATION_ERROR');
    this.name = 'ContentConfigurationError';
  }
}

const assert = (condition, message, ErrorType = ContentError) => {
  if (!condition) throw new ErrorType(message);
};

const assertAllowedKeys = (value, allowed, label) => {
  assert(Object.keys(value).every((key) => allowed.includes(key)), `${label} contains an unsupported field.`);
};

const normalizedPath = (value, prefix) => {
  assert(typeof value === 'string' && value.startsWith(prefix), 'Content path is outside its allowed directory.');
  assert(!value.includes('\\') && !value.includes('%'), 'Content path contains unsafe encoding.');
  assert(!value.includes('?') && !value.includes('#'), 'Content path cannot contain a query or fragment.');
  assert(!CONTROL_CHARACTERS.test(value) && !value.startsWith('/'), 'Content path is malformed.');
  const segments = value.split('/');
  assert(segments.every((segment) => segment && segment !== '.' && segment !== '..'), 'Content path traversal is not allowed.');
  return segments.join('/');
};

const validateConfig = (config) => {
  let base;
  try {
    base = new URL(config.rawBase);
  } catch (error) {
    throw new ContentConfigurationError('The content base URL is invalid.');
  }
  assert(base.origin === RAW_ORIGIN && base.pathname === '/', 'The content base URL is not approved.', ContentConfigurationError);
  assert(SAFE_NAME.test(config.owner), 'The content owner is invalid.', ContentConfigurationError);
  assert(SAFE_NAME.test(config.repository), 'The content repository is invalid.', ContentConfigurationError);
  assert(config.owner === APPROVED_OWNER, 'The content owner is not approved.', ContentConfigurationError);
  assert(config.repository === APPROVED_REPOSITORY, 'The content repository is not approved.', ContentConfigurationError);
  assert(ALLOWED_CONTENT_BRANCHES.includes(config.ref), 'The content branch is invalid.', ContentConfigurationError);
  assert(config.manifestPath === 'manifest.json', 'The manifest path is invalid.', ContentConfigurationError);
};

const buildRawUrl = (config, filePath, query = {}) => {
  validateConfig(config);
  const path = filePath === config.manifestPath ? filePath : normalizedPath(filePath, filePath.startsWith('pages/') ? 'pages/' : 'assets/');
  const url = new URL(`${RAW_ORIGIN}/${config.owner}/${config.repository}/${config.ref}/${path}`);
  Object.entries(query).forEach(([key, value]) => url.searchParams.set(key, String(value)));
  return url;
};

const assertFinalUrl = (response, requestedUrl, config) => {
  if (!response.url) return;
  const finalUrl = new URL(response.url);
  const expectedPrefix = `/${config.owner}/${config.repository}/${config.ref}/`;
  assert(finalUrl.origin === requestedUrl.origin, 'Content request redirected to an unapproved origin.');
  assert(finalUrl.pathname.startsWith(expectedPrefix), 'Content request redirected outside the approved repository branch.');
};

const isAllowedType = (response, allowedTypes) => {
  const contentType = (response.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
  return allowedTypes.includes(contentType);
};

const wait = (milliseconds, signal) => new Promise((resolve, reject) => {
  const timeout = setTimeout(resolve, milliseconds);
  if (signal) {
    signal.addEventListener('abort', () => {
      clearTimeout(timeout);
      const error = new Error('Aborted');
      error.name = 'AbortError';
      reject(error);
    }, { once: true });
  }
});

const fetchText = async ({ url, config, signal, maxBytes, allowedTypes, retry = false }) => {
  let lastError;
  const attempts = retry ? 2 : 1;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const controller = new AbortController();
    const abort = () => controller.abort();
    if (signal) signal.addEventListener('abort', abort, { once: true });
    const timeout = setTimeout(abort, config.timeoutMs);
    try {
      const response = await fetch(url.toString(), {
        cache: url.pathname.endsWith(config.manifestPath) ? 'no-store' : 'default',
        credentials: 'omit',
        headers: { Accept: allowedTypes.join(', ') },
        signal: controller.signal,
      });
      assertFinalUrl(response, url, config);
      if (response.status === 404) throw new ContentNotFoundError('Remote content was not found.');
      assert(response.ok, `Remote content request failed (${response.status}).`);
      assert(isAllowedType(response, allowedTypes), 'Remote content returned an unexpected content type.');
      const declaredLength = Number(response.headers.get('content-length'));
      assert(!declaredLength || declaredLength <= maxBytes, 'Remote content exceeds the size limit.');
      const text = await response.text();
      assert(new Blob([text]).size <= maxBytes, 'Remote content exceeds the size limit.');
      return text;
    } catch (error) {
      lastError = error;
      if (controller.signal.aborted || (signal && signal.aborted) || attempt + 1 >= attempts) throw error;
      await wait(150 * (attempt + 1), signal);
    } finally {
      clearTimeout(timeout);
      if (signal) signal.removeEventListener('abort', abort);
    }
  }
  throw lastError;
};

const validateImage = (image) => {
  assert(image && typeof image === 'object', 'Primary image metadata is missing.');
  assertAllowedKeys(image, ['src', 'alt', 'position'], 'Primary image');
  assert(typeof image.alt === 'string' && image.alt.trim() && image.alt.length <= 300, 'Primary image alt text is invalid.');
  assert(['left', 'right'].includes(image.position), 'Primary image position is invalid.');
  let url;
  try {
    url = new URL(image.src);
  } catch (error) {
    throw new ContentError('Primary image URL is invalid.');
  }
  assert(url.protocol === 'https:' && url.origin === RAW_ORIGIN, 'Primary image origin is not approved.');
  assert(url.username === '' && url.password === '' && url.hash === '' && url.search === '', 'Primary image URL is malformed.');
  assert(!url.pathname.includes('%') && !CONTROL_CHARACTERS.test(url.pathname), 'Primary image path is malformed.');
  const segments = url.pathname.split('/').filter(Boolean);
  assert(segments[0] === 'CBIIT' && ['crdc-popsci-content', 'datacommons-assets'].includes(segments[1]), 'Primary image must be hosted in an approved CBIIT repository.');
  return { ...image, src: url.toString() };
};

export const validateManifest = (manifest) => {
  assert(manifest && typeof manifest === 'object' && !Array.isArray(manifest), 'Manifest must be an object.');
  assertAllowedKeys(manifest, ['schemaVersion', 'revision', 'publishedAt', 'pages'], 'Manifest');
  assert(manifest.schemaVersion === 1, 'Manifest schema version is unsupported.');
  assert(SAFE_REVISION.test(manifest.revision || ''), 'Manifest revision is invalid.');
  assert(Array.isArray(manifest.pages) && manifest.pages.length <= 50, 'Manifest pages are invalid.');
  const seenRoutes = new Set();
  const seenSlugs = new Set();
  const pages = manifest.pages.map((page) => {
    assert(page && typeof page === 'object' && !Array.isArray(page), 'Manifest page is invalid.');
    assertAllowedKeys(page, ['route', 'slug', 'title', 'menuLabel', 'markdown', 'primaryImage'], 'Manifest page');
    assert(SAFE_ROUTE.test(page.route || '') && page.route.length <= 80, 'Manifest route is not allowed.');
    assert(!RESERVED_APPLICATION_ROUTES.has(page.route), 'Manifest route conflicts with an application route.');
    assert(!seenRoutes.has(page.route), 'Manifest route is duplicated.');
    const expectedSlug = page.route.slice(1).replace(/_/g, '-');
    assert(SAFE_SLUG.test(page.slug || '') && expectedSlug === page.slug, 'Manifest slug does not match its route.');
    assert(!seenSlugs.has(page.slug), 'Manifest slug is duplicated.');
    assert(typeof page.title === 'string' && page.title.trim() && page.title.length <= 160, 'Manifest title is invalid.');
    assert(page.menuLabel === undefined
      || (typeof page.menuLabel === 'string' && page.menuLabel.trim() && page.menuLabel.length <= 60), 'Manifest menu label is invalid.');
    const markdown = normalizedPath(page.markdown, 'pages/');
    assert(markdown.endsWith('.md'), 'Manifest Markdown file must end in .md.');
    seenRoutes.add(page.route);
    seenSlugs.add(page.slug);
    return {
      route: page.route,
      slug: page.slug,
      title: page.title.trim(),
      menuLabel: page.menuLabel ? page.menuLabel.trim() : undefined,
      markdown,
      primaryImage: validateImage(page.primaryImage),
    };
  });
  return {
    schemaVersion: 1,
    revision: manifest.revision,
    publishedAt: manifest.publishedAt,
    pages,
  };
};

export const validateMarkdownText = (markdown) => {
  assert(typeof markdown === 'string', 'Markdown content must be text.');
  assert(!MARKDOWN_CONTROL_CHARACTERS.test(markdown), 'Markdown contains control characters.');
  assert(!RAW_HTML.test(markdown), 'Raw HTML is not allowed in Markdown.');
  assert(!MDX_EXPRESSION.test(markdown), 'MDX and module expressions are not allowed.');
  assert(!/^#\s/m.test(markdown), 'The page h1 is owned by the application.');
  const lineCount = markdown.split('\n').length;
  const linkCount = (markdown.match(/!?\[[^\]]*\]\([^)]*\)/g) || []).length;
  assert(lineCount <= 5000 && linkCount <= 500, 'Markdown exceeds its complexity limit.');
  return markdown;
};

export const createContentClient = (config) => {
  validateConfig(config);
  const fetchManifest = async (signal) => {
    const manifestUrl = buildRawUrl(config, config.manifestPath, { cb: Date.now() });
    const manifestText = await fetchText({
      url: manifestUrl,
      config,
      signal,
      maxBytes: MAX_MANIFEST_BYTES,
      allowedTypes: ALLOWED_MANIFEST_TYPES,
    });
    try {
      return validateManifest(JSON.parse(manifestText));
    } catch (error) {
      if (error instanceof ContentError) throw error;
      throw new ContentError('Remote content manifest is invalid.');
    }
  };
  return {
    fetchManifest,
    async fetchPage(route, signal) {
      if (!SAFE_ROUTE.test(route || '') || RESERVED_APPLICATION_ROUTES.has(route)) {
        throw new ContentNotFoundError('This content route is not supported.');
      }
      const manifest = await fetchManifest(signal);
      const page = manifest.pages.find((candidate) => candidate.route === route);
      if (!page) throw new ContentNotFoundError('This page is not present in the content manifest.');
      const markdownUrl = buildRawUrl(config, page.markdown, { rev: manifest.revision });
      const markdown = await fetchText({
        url: markdownUrl,
        config,
        signal,
        maxBytes: MAX_MARKDOWN_BYTES,
        allowedTypes: ALLOWED_MARKDOWN_TYPES,
        retry: true,
      });
      return {
        ...page,
        markdown: validateMarkdownText(markdown),
        revision: manifest.revision,
        publishedAt: manifest.publishedAt,
      };
    },
  };
};

export default createContentClient;
