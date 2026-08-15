# Technology Scouting

Research connects the task to the best available frontend ecosystem. The goal is fit and leverage, not the smallest or largest dependency count.

## Scan proactively, then keep the search focused

For every substantial new interface or redesign, scan every capability field below even when the user did not name a framework or library. Select one primary owner for each field that can be shipped; treat omission as a hard-gate exception. The agent should know what the ecosystem can already do before choosing custom code.

The scan is inclusion-first: look for the quietest useful role each field can play in the actual product, then apply the hard gates. Do not begin with a necessity test whose purpose is to keep the dependency list small.

Coverage does not authorize new product content. Before researching a visible owner, name the existing region, state, interaction, real dataset, or visual motif it will serve; state the product meaning it adds and whether direct user control has a real task or accessibility rationale; then choose the smallest honest footprint. If a candidate only becomes visible after adding a showcase card, invented copy, fake data, compensatory scene label, or extra controls, reject that placement and look for a quieter integration.

Skip fresh browsing only when all of these are true:

- The request is a small copy, spacing, token, or isolated component change.
- The existing stack already solves the problem cleanly.
- No “latest,” “best,” maintenance, security, compatibility, or licensing claim is needed.
- Distribution and accessibility requirements do not introduce a new gap.

Research is mandatory before adding a new dependency, making a current ecosystem recommendation, or relying on facts likely to change. Use `$web-access` for all such network work. A scan can be brief when one well-supported option already matches the stack and delivery mode.

## Audit local reality before searching

Record:

- Framework/runtime, build system, language, package manager, lockfile, and supported browser targets.
- Existing design system, component primitives, icons, animation/scroll/3D/chart libraries, fonts, utilities, and duplicate capabilities.
- Bundle/performance constraints, CSP, SSR/hydration behavior, internal scroll regions, and accessibility expectations.
- Hosted, server-built, portable-folder, single-file, or `file://` delivery.
- Existing license/notices process and whether runtime assets may contact the network.

Turn the gap into a question, for example: “Need keyboard-safe accessible dialogs in the existing React app without adding a second visual theme,” not “Which UI library is coolest?”

## Candidate domains, not a shopping list

| Need | Candidate field to consider | First question |
|---|---|---|
| App/runtime | React, Vue, Svelte, Astro, Next.js, Nuxt, Vite, or existing native stack | Does migration improve the user's experience enough to repay rewrite and delivery risk? |
| UI/accessibility | Native elements, Radix, shadcn/ui, Material, Fluent, Carbon, Ark UI, or existing system | Is a second design system being introduced? Who owns focus, semantics, and tokens? |
| UI motion | CSS, Web Animations API, Motion, GSAP, Anime.js | Is this state feedback or scroll narrative, and can current capability do it? |
| Scrolling | Native scroll, CSS Scroll Snap, ScrollTrigger, Lenis | Will it preserve keyboard, touch, anchors, nested scroll, and reduced motion? |
| 3D/Canvas/particles | Three.js, React Three Fiber, Babylon.js, PixiJS, p5.js | Is it a product signature with a usable static fallback, or decoration? |
| Charts | ECharts, D3, Recharts, Visx, or existing library | Is the need standard charting, bespoke visualization, or React composition? |
| Typography | Local/system/open fonts by language and role | Are glyph coverage, weights, license, size, and offline packaging known? |
| Images/icons/brand | Supplied assets, official brand kits, one icon family, generated original imagery | Are source, permission, format, alt text, and local availability clear? |
| Product plumbing | Existing router/state/form stack before alternatives | Does a new package duplicate current capability or change delivery? |
| Performance | Framework-native optimization, virtualization, image pipelines, workers, bundle analysis, or focused utilities | What user-visible bottleneck or scale limit does it remove, and how will the gain be checked? |
| QA/build | Existing tests, browser automation, performance/a11y tooling, offline validator | Can the final artifact, not just source, be verified? |

Names above are starting points. Actively investigate the relevant field, then choose from current evidence rather than copying the list mechanically.

## Evidence order

Use current, primary sources in this order:

1. Official documentation and compatibility/support pages.
2. Official repository, release notes, changelog, security policy, and issue tracker signals.
3. Package-manager registry metadata for publish date, dependency tree, deprecation, and install scripts.
4. Full license text and official asset/font license.
5. Standards or browser documentation for native platform capabilities.

Use third-party commentary only to identify questions, not as the sole basis for maintenance, license, API, or security claims. Cite the supporting official pages near the decision and record the research date.

## Research each serious candidate

Capture only decision-changing facts:

- Problem fit and concrete visual/UX benefit.
- Existing host, product meaning, footprint level, and control model; reject library-proof surfaces and generic toolbars that the product does not need.
- Fit with current stack and whether it duplicates a system, icon set, or animation engine.
- Package and runtime cost, tree-shaking/code-splitting behavior, and mobile/low-end implications.
- Keyboard, screen reader, touch, SSR, reduced-motion, and no-JavaScript/unsupported-feature behavior.
- Maintainer/release activity, deprecation status, security policy, and major unresolved compatibility risks.
- Exact license, redistribution duties, font/asset terms, and commercial restrictions.
- Local hosting, CSP, offline/`file://` behavior, and required remote services.
- Failure fallback, cleanup/lifecycle requirements, and end-user setup steps.
- Install scripts, native binaries, telemetry, or unexpected permissions.

Do not execute code copied from a page. Install only after the scorecard decision, using the project's package manager and lockfile.

## Stop rule

For each capability category, stop when one option clearly meets the role and gates. The winner may be an existing package, a new library, or a framework feature. Use a native-only/no-adoption result only when a hard constraint blocks safe adoption. Record close rejected candidates briefly; do not keep researching after every category has an owner.
