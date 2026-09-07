# CRDC Population Sciences
[![Coverage Status](https://coveralls.io/repos/github/CBIIT/crdc-popsci-ui/badge.svg)](https://coveralls.io/github/CBIIT/crdc-popsci-ui)

CRDC Population Sciences is a React application designed to provide a user-friendly interface for accessing and managing data using various technologies and tools. This project utilizes React v17, Material-UI v4, React Router DOM, GraphQL, and Apollo.


## Installation

To run the CRDC Population Sciences project locally, follow these steps:

1. Clone the repository
2. Navigate to the project directory
3. Install the dependencies: `npm install --legacy-peer-deps`
4. Start the development server: `npm start`
5. Open your browser and visit `http://localhost:3000` to access the application.

Please see the instructions in [nginx/README.md](./nginx/README.md) for configuring Nginx.

## Runtime page content

Content pages and their About-menu links load from `manifest.json` in the public GitHub repository at browser runtime. The content is not included in the frontend build.

The content repository is [`CBIIT/crdc-popsci-content`](https://github.com/CBIIT/crdc-popsci-content). Protect the `dev`, `qa`, `stage`, and `prod` branches and promote content with pull requests in that order.

To add a page, add its Markdown file and a page entry to `manifest.json`. The menu follows manifest order. `menuLabel` is optional and controls the shorter navigation label; otherwise the page `title` is used. The route must be a safe, unique top-level route, and its slug must match the route with underscores converted to hyphens. For example:

```json
{
  "route": "/research_updates",
  "slug": "research-updates",
  "title": "Research Updates from the PSDC",
  "menuLabel": "Research Updates",
  "markdown": "pages/research-updates.md",
  "primaryImage": {
    "src": "https://raw.githubusercontent.com/CBIIT/crdc-popsci-content/dev/assets/research-updates.png",
    "alt": "Researchers reviewing population science data",
    "position": "left"
  }
}
```

Increment the manifest `revision` whenever a page, image, or manifest entry changes.

Configure these public runtime values for each deployed UI tier:

```text
REACT_APP_REMOTE_CONTENT_ENABLED=true
REACT_APP_CONTENT_GITHUB_RAW_BASE=https://raw.githubusercontent.com
REACT_APP_CONTENT_GITHUB_OWNER=CBIIT
REACT_APP_CONTENT_GITHUB_REPO=crdc-popsci-content
REACT_APP_CONTENT_GITHUB_REF=dev
REACT_APP_CONTENT_MANIFEST_PATH=manifest.json
REACT_APP_CONTENT_POLL_MS=300000
REACT_APP_CONTENT_FALLBACK_ENABLED=true
```

Use `dev`, `qa`, `stage`, or `prod` for `REACT_APP_CONTENT_GITHUB_REF` in the matching application tier. These settings are visible in the browser and must never contain a GitHub token or other secret. Remote content is disabled by default until the separate repository has been published.
