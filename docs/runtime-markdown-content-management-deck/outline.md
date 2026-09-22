# Runtime Content Management — Client Presentation Outline

**Audience:** Client project managers and stakeholders without a technical background  
**Goal:** Explain why the content-management change is needed, how it works, how content is controlled, and what the client should expect.  
**Length:** 8 slides  
**Style direction after outline approval:** Clean NCI/PSDC professional style with simple diagrams, limited text, and plain language.

## Slide 1: Update Website Content Without Rebuilding the Application

- Today, even a small wording change can require a full application release.
- The proposed approach separates page content from the application itself.
- Approved content can appear on the website without rebuilding or redeploying the UI.
- The existing review and environment controls remain in place.

**Visual idea:** A simple “content change” moving directly to the website, with the slower application-build path faded into the background.

**Layout role and intent:** Executive opening. State the outcome and business value before explaining how it works.

**Required source images:** None.

## Slide 2: Why the Current Process Needs to Change

- About, Access Data, Analyze Data, and Support content is currently packaged inside the frontend release.
- Content editors depend on the development and deployment process for routine updates.
- This adds unnecessary time and coordination for low-risk content changes.
- The custom content format is harder to write, review, and maintain than standard Markdown.

**Visual idea:** A simple “Today” journey with four steps: edit content → rebuild application → deploy application → see the change. Highlight waiting and coordination points.

**Layout role and intent:** Problem framing. Help nontechnical stakeholders understand the current delay without discussing implementation details.

**Required source images:** None.

## Slide 3: The Proposed Approach in Plain Language

- Store public page content in a separate, controlled GitHub repository.
- Use standard Markdown, a familiar plain-text format for headings, paragraphs, links, lists, and tables.
- A small `manifest.json` file acts like a table of contents: it lists each page, title, menu label, image, and content file.
- The website reads the approved content directly when a user opens or revisits a page.
- No new content server, database, or login credential is required.

**Visual idea:** Three large blocks: Content Library → Website → Published Page. Show `manifest.json` as a labeled “table of contents” card rather than code.

**Layout role and intent:** Concept explanation. Introduce the solution using familiar terms and one simple visual flow.

**Required source images:** None.

## Slide 4: Content Follows the Same Four Controlled Tiers

- The content repository has four branches that match the application environments: Development, QA, Stage, and Production.
- A change starts in Development and moves forward in order: `dev → qa → stage → prod`.
- A pull request and required review are needed before content moves to the next tier.
- The same approved change is tested in each matching application environment.
- Direct pushes, skipped tiers, and unreviewed production changes are not allowed.

**Visual idea:** A four-stage approval pathway with gates between Development, QA, Stage, and Production. Use plain labels with the branch names shown smaller underneath.

**Layout role and intent:** Governance process. Reassure the client that faster publishing does not remove review or testing.

**Required source images:** None.

## Slide 5: What Editors and Website Users Experience

- Editors update Markdown and the page list through the normal GitHub review process.
- Adding a valid entry to the manifest can add a new item under the About menu and activate its content page.
- Website users see the approved version for their environment.
- The application checks for updates when users navigate, return to the browser, refresh, or reach the scheduled check interval.
- Content updates do not interrupt the rest of the application.

**Visual idea:** Split view. Left: an editor updates a page and menu entry. Right: a user opens the About menu and sees the approved page.

**Layout role and intent:** User journey. Show the practical experience for both content editors and website visitors.

**Required source images:** None.

## Slide 6: Built-In Safeguards Protect the Application

- Only the approved public organization, repository, and environment branches can be used.
- Content is treated as untrusted until it passes validation in the browser.
- The application accepts text and approved presentation information—not scripts or application code.
- Raw HTML and executable content are blocked, and links, images, paths, file types, and file sizes are checked.
- No GitHub password, token, or other secret is placed in the browser.

**Visual idea:** A shield surrounding a checklist: approved source, valid page, safe text, safe links/images, no credentials.

**Layout role and intent:** Risk and assurance. Explain security controls in client-friendly language without deep implementation detail.

**Required source images:** None.

## Slide 7: If GitHub or New Content Is Temporarily Unavailable

- The application never replaces a working page with incomplete or invalid content.
- If an update check fails, the user can continue viewing the current page.
- On an initial failure, the application can show a reviewed bundled fallback or a clear error with retry.
- A bad content release can be reversed through a reviewed Git revert and promoted through the same tier sequence.
- GitHub history provides an audit trail of the change, author, reviewer, and rollback.

**Visual idea:** A decision path: Update available? → Validate → Show new page. If not, keep current page or show fallback. Include a small rollback arrow to the approved version.

**Layout role and intent:** Continuity and recovery. Set realistic expectations and demonstrate that failure behavior is controlled.

**Required source images:** None.

## Slide 8: Rollout Plan and Measures of Success

- Establish repository ownership, branch protection, review rules, and automated content checks.
- Convert and review the initial pages, then validate them in Development, QA, Stage, and Production.
- Enable the capability gradually, confirm accessibility and security, and retain rollback options during rollout.
- Success means approved content appears without a UI release, while pages remain visually consistent, accessible, secure, and recoverable.
- Client decisions include content ownership, review responsibilities, fallback policy, update frequency, and approval of any additional routes.

**Visual idea:** A three-phase roadmap—Prepare, Validate, Activate—with a final success checklist and a small “Client decisions” callout.

**Layout role and intent:** Executive close. Make the next steps, ownership decisions, and acceptance criteria clear.

**Required source images:** None.
