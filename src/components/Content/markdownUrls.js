// eslint-disable-next-line no-control-regex
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/;
const UNSAFE_SCHEME = /^(?:javascript|data|blob|file|vbscript):/i;

const decodedPrefix = (value) => {
  let decoded = value;
  for (let index = 0; index < 2; index += 1) {
    try {
      const next = decodeURIComponent(decoded);
      if (next === decoded) break;
      decoded = next;
    } catch (error) {
      return '';
    }
  }
  // eslint-disable-next-line no-control-regex
  return decoded.replace(/[\u0000-\u0020\u007f]+/g, '').toLowerCase();
};

export const safeLinkUrl = (href) => {
  if (typeof href !== 'string' || !href || href.length > 2048 || CONTROL_CHARACTERS.test(href)) return null;
  const value = href.trim();
  const prefix = decodedPrefix(value);
  if (!prefix || UNSAFE_SCHEME.test(prefix) || value.startsWith('//') || value.includes('\\')) return null;
  if (value.startsWith('/')) return value;
  if (prefix.startsWith('mailto:')) {
    return /^mailto:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? value : null;
  }
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password) return null;
    return url.toString();
  } catch (error) {
    return null;
  }
};

export const safeImageUrl = (src) => {
  const safe = safeLinkUrl(src);
  if (!safe || safe.startsWith('/') || safe.startsWith('mailto:')) return null;
  try {
    const url = new URL(safe);
    const segments = url.pathname.split('/').filter(Boolean);
    const approvedRepository = ['crdc-popsci-content', 'datacommons-assets'].includes(segments[1]);
    return url.origin === 'https://raw.githubusercontent.com'
      && segments[0] === 'CBIIT' && approvedRepository ? url.toString() : null;
  } catch (error) {
    return null;
  }
};
