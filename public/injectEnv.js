// TODO: Need to have some rules for trailing "/". Will introduce it soon.

window.injectedEnv = {

  REACT_APP_APPLICATION_VERSION: 'YYYY_MM_DD/HH:MM',

  // Services API End Points:
  // REACT_APP_BACKEND_API: 'http://localhost:8080/v1/graphql/',
  REACT_APP_BACKEND_API: 'https://populationsciences.datacommons.cancer.gov/v1/graphql/',


  REACT_APP_BACKEND_PUBLIC_API: 'http://localhost:3000/v1/public-graphql/',
  REACT_APP_FILE_SERVICE_API: 'http://localhost:3000/api/files/',
  REACT_APP_AUTH_SERVICE_API: 'http://localhost:3000/api/auth/',
  REACT_APP_USER_SERVICE_API: 'http://localhost:3000/api/users/',
  REACT_APP_INTEROP_SERVICE_URL: 'https://populationsciences-dev.datacommons.cancer.gov/api/interoperation/',
  // Runtime Markdown content. Use the branch matching this application tier.
  REACT_APP_REMOTE_CONTENT_ENABLED: true,
  REACT_APP_CONTENT_GITHUB_RAW_BASE: 'https://raw.githubusercontent.com',
  REACT_APP_CONTENT_GITHUB_OWNER: 'CBIIT',
  REACT_APP_CONTENT_GITHUB_REPO: 'crdc-popsci-content',
  REACT_APP_CONTENT_GITHUB_REF: 'dev',
  REACT_APP_CONTENT_MANIFEST_PATH: 'manifest.json',
  REACT_APP_CONTENT_POLL_MS: '300000',
  REACT_APP_CONTENT_FALLBACK_ENABLED: true,
  // IDP Auth url
  REACT_APP_NIH_AUTH_URL: 'https://stsstg.nih.gov/auth/oauth/v2/authorize',
  // Client IDs for IDP
  REACT_APP_GOOGLE_CLIENT_ID: 'Sample Id',
  REACT_APP_NIH_CLIENT_ID: 'Sample Id',

  // Access control settings
  REACT_APP_AUTH: true,
  PUBLIC_ACCESS: 'Metadata Only',
  NODE_LEVEL_ACCESS: true,
  NODE_LABEL: 'Study Arm(s)',

  // No Longer Used.
  REACT_APP_BACKEND_GETUSERINFO_API: 'https://k9dc.essential-dev.com/fence/login/',
  REACT_APP_LOGIN_URL: 'https://nci-crdc-staging.datacommons.io/user/oauth2/authorize?client_id=82pslYFJqA7auRvKYfTOK67jzQAMb8f6C33tlmZz&response_type=code&redirect_uri=https%3A%2F%2Fk9dc.essential-dev.com%2F&scope=openid%20user',
  REACT_APP_USER_LOGOUT_URL: 'https://k9dc.essential-dev.com/fence/logout',
};
