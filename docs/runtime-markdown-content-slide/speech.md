## Slide 1: Publish Content Without Rebuilding the UI

The key idea is that content publishing is separated from application deployment. At the top, content moves through the same four controlled tiers as the application: dev, QA, stage, and production. Every promotion requires a pull request and validation, so prompts, page copy, and test content can be reviewed in the correct environment before reaching users.

The runtime path is shown across the center. The deployed React application fetches `manifest.json` and the referenced Markdown directly from the public GitHub content repository. Before rendering anything, the browser validates the repository, branch, route, file path, URL, response size, and Markdown structure. Raw HTML is disabled and the browser sends no credentials.

Navigation, focus, refresh, and polling allow the application to discover an approved change without rebuilding or redeploying the UI. If GitHub is temporarily unavailable, the current page remains visible or the application uses its bundled fallback. The result is faster content publishing with the same reviewed branch-promotion controls.
