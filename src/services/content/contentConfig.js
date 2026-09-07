import env from '../../utils/env';

export const ALLOWED_CONTENT_BRANCHES = Object.freeze(['dev', 'qa', 'stage', 'prod']);
export const DEFAULT_CONTENT_CONFIG = Object.freeze({
  enabled: false,
  rawBase: 'https://raw.githubusercontent.com',
  owner: 'CBIIT',
  repository: 'crdc-popsci-content',
  ref: 'prod',
  manifestPath: 'manifest.json',
  pollMs: 300000,
  fallbackEnabled: true,
  timeoutMs: 8000,
});

const injectedValue = (value, fallback) => (
  typeof value === 'string' && value && !value.startsWith('${') ? value : fallback
);

const positiveInteger = (value, fallback) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
};

const runtimeBoolean = (value, fallback) => {
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return fallback;
};

export const getContentConfig = () => ({
  enabled: runtimeBoolean(env.REACT_APP_REMOTE_CONTENT_ENABLED, DEFAULT_CONTENT_CONFIG.enabled),
  rawBase: injectedValue(env.REACT_APP_CONTENT_GITHUB_RAW_BASE, DEFAULT_CONTENT_CONFIG.rawBase),
  owner: injectedValue(env.REACT_APP_CONTENT_GITHUB_OWNER, DEFAULT_CONTENT_CONFIG.owner),
  repository: injectedValue(env.REACT_APP_CONTENT_GITHUB_REPO, DEFAULT_CONTENT_CONFIG.repository),
  ref: injectedValue(env.REACT_APP_CONTENT_GITHUB_REF, DEFAULT_CONTENT_CONFIG.ref),
  manifestPath: injectedValue(env.REACT_APP_CONTENT_MANIFEST_PATH, DEFAULT_CONTENT_CONFIG.manifestPath),
  pollMs: positiveInteger(env.REACT_APP_CONTENT_POLL_MS, DEFAULT_CONTENT_CONFIG.pollMs),
  fallbackEnabled: runtimeBoolean(
    env.REACT_APP_CONTENT_FALLBACK_ENABLED,
    DEFAULT_CONTENT_CONFIG.fallbackEnabled,
  ),
  timeoutMs: DEFAULT_CONTENT_CONFIG.timeoutMs,
});

export default getContentConfig;
