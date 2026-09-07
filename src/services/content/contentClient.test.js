import {
  CONTENT_ROUTES,
  ContentConfigurationError,
  ContentError,
  createContentClient,
  validateManifest,
  validateMarkdownText,
} from './contentClient';

const config = {
  enabled: true,
  rawBase: 'https://raw.githubusercontent.com',
  owner: 'CBIIT',
  repository: 'crdc-popsci-content',
  ref: 'prod',
  manifestPath: 'manifest.json',
  pollMs: 0,
  fallbackEnabled: true,
  timeoutMs: 1000,
};

const manifest = {
  schemaVersion: 1,
  revision: '2026-09-06.1',
  pages: Object.entries(CONTENT_ROUTES).map(([route, slug]) => ({
    route,
    slug,
    title: slug,
    markdown: `pages/${slug}.md`,
    primaryImage: {
      src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/image.png',
      alt: 'Description',
      position: 'left',
    },
  })),
};

const response = (body, requestUrl, contentType) => ({
  ok: true,
  status: 200,
  url: requestUrl,
  headers: {
    get: (name) => (name.toLowerCase() === 'content-type' ? contentType : null),
  },
  text: () => Promise.resolve(body),
});

describe('runtime content client', () => {
  afterEach(() => {
    delete global.fetch;
  });

  it('fetches a manifest and revision-busted Markdown at runtime', async () => {
    global.fetch = jest.fn((requestUrl) => Promise.resolve(
      requestUrl.includes('manifest.json')
        ? response(JSON.stringify(manifest), requestUrl, 'text/plain; charset=utf-8')
        : response('## Runtime content', requestUrl, 'text/plain; charset=utf-8'),
    ));

    const page = await createContentClient(config).fetchPage('/about');

    expect(page.markdown).toBe('## Runtime content');
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch.mock.calls[0][0]).toContain('/prod/manifest.json?cb=');
    expect(global.fetch.mock.calls[0][1]).toMatchObject({ cache: 'no-store', credentials: 'omit' });
    expect(global.fetch.mock.calls[1][0]).toContain('/prod/pages/about.md?rev=2026-09-06.1');
  });

  it('accepts and fetches a new safe page declared only in the manifest', async () => {
    const dynamicPage = {
      route: '/research_updates',
      slug: 'research-updates',
      title: 'Research Updates',
      menuLabel: 'Updates',
      markdown: 'pages/research-updates.md',
      primaryImage: {
        src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/image.png',
        alt: 'Description',
        position: 'left',
      },
    };
    const dynamicManifest = { ...manifest, pages: [...manifest.pages, dynamicPage] };
    global.fetch = jest.fn((requestUrl) => Promise.resolve(
      requestUrl.includes('manifest.json')
        ? response(JSON.stringify(dynamicManifest), requestUrl, 'text/plain')
        : response('## Latest research', requestUrl, 'text/plain'),
    ));

    const page = await createContentClient(config).fetchPage('/research_updates');

    expect(page).toEqual(expect.objectContaining({
      route: '/research_updates',
      menuLabel: 'Updates',
      markdown: '## Latest research',
    }));
    expect(global.fetch.mock.calls[1][0]).toContain('/prod/pages/research-updates.md?rev=2026-09-06.1');
  });

  it('rejects a branch outside the four application tiers', () => {
    expect(() => createContentClient({ ...config, ref: 'main' })).toThrow(ContentConfigurationError);
  });

  it('rejects route injection and traversal in a manifest', () => {
    expect(() => validateManifest({
      ...manifest,
      pages: [{ ...manifest.pages[0], route: '/submit', markdown: '../submit.md' }],
    })).toThrow(ContentError);
  });

  it('rejects a redirect outside the configured repository branch', async () => {
    global.fetch = jest.fn((requestUrl) => Promise.resolve(
      response(JSON.stringify(manifest), requestUrl.replace('raw.githubusercontent.com', 'example.org'), 'text/plain'),
    ));
    await expect(createContentClient(config).fetchPage('/about')).rejects.toThrow(ContentError);
  });

  it('forwards cancellation to the active runtime request', async () => {
    global.fetch = jest.fn((requestUrl, options) => new Promise((resolve, reject) => {
      options.signal.addEventListener('abort', () => {
        const error = new Error('Aborted');
        error.name = 'AbortError';
        reject(error);
      });
    }));
    const controller = new AbortController();
    const request = createContentClient(config).fetchPage('/about', controller.signal);
    controller.abort();
    await expect(request).rejects.toMatchObject({ name: 'AbortError' });
  });

  it.each([
    '<script>alert(1)</script>',
    '<img src=x onerror=alert(1)>',
    '<iframe src="https://example.org"></iframe>',
    'import Component from "./Component"',
    '# Unexpected page title',
  ])('rejects executable or disallowed Markdown input: %s', (markdown) => {
    expect(() => validateMarkdownText(markdown)).toThrow(ContentError);
  });
});
