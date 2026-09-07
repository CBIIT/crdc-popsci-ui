# Runtime Markdown Content Management — Slide Outline

## Slide 1: Publish Content Without Rebuilding the UI

- The deployed React browser fetches `manifest.json` and Markdown directly from the public GitHub content repository at runtime.
- Content follows the controlled promotion path `dev → qa → stage → prod`, with required pull requests and validation in each matching application tier.
- A manifest revision provides cache busting; navigation, focus, refresh, and polling discover approved changes without rebuilding or redeploying `crdc-popsci-ui`.
- Safe rendering uses `react-markdown` with raw HTML disabled, strict route/path/URL validation, and no browser credentials.
- The optional bundled fallback preserves basic page availability when GitHub content cannot be reached.

**Visual idea:** A clean left-to-right architecture flow. The upper lane shows the four GitHub branches and PR promotion. The lower lane shows the deployed React UI fetching the manifest and Markdown from GitHub, validating it, and rendering the four content pages. A small shield emphasizes safe rendering, and a subtle fallback card appears beneath the runtime path.

**Layout role and intent:** Executive architecture summary. Communicate the operating model, security boundary, and principal benefit in one glance.

**Required source images:** None. The architecture visual will be generated as part of the slide artwork.
