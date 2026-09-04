# Technology Scouting

Research connects the task to the best available React ecosystem. Begin with the user's curated source library; the goal is fit and leverage, not the smallest or largest dependency count.

## Scan proactively, then keep the search focused

For every substantial new interface or redesign, scan every enhancement field even when the user did not name a library. React is fixed by this Skill, and one primary React UI component system is mandatory. Research selects React-compatible owners rather than comparing UI frameworks. Check `source-library.md` first and prefer a compatible curated source that passes the hard gates. Begin with an inclusion plan containing one owner and one real shipped job for every default enhancement row in the Skill's eight-row matrix. Give true 3D/WebGL a separate evaluation row: apply its suitability gate before proposing an owner, job, or demo candidate. Inspect theme, routing, request/server state, client state, and forms only when those conditional product concerns exist or ownership is changing—do not invent them for coverage. The agent should know what the curated catalog and React ecosystem can already do before choosing custom code.

The scan is inclusion-first for every default field: look for the quietest useful role it can play in the actual product, then apply the hard gates. For 3D, actively test product suitability instead; if any gate fails, record the specific reason and stop rather than forcing a decorative WebGL role. Do not use either path as a pretext to keep the dependency list small.

Coverage does not authorize new product content. Before researching a visible owner, name the existing region, state, interaction, real dataset, or visual motif it will serve; state the product meaning it adds and whether direct user control has a real task or accessibility rationale; then choose the smallest honest footprint. If a candidate only becomes visible after adding a showcase card, invented copy, fake data, compensatory scene label, or extra controls, reject that placement and look for a quieter integration.

After naming that real role and before final selection, open each serious candidate's official demo or example gallery. Inspect the live rendered result and every official demo reasonably relevant to the role; skip unrelated gallery entries rather than browsing the entire ecosystem. Demo review is required research, not optional inspiration. A 3D suitability-gate failure may occur before any serious candidate exists; in that case no 3D demo review is required and no WebGL route is selected. Follow `source-library.md` for the compact record, adaptation rules, and narrow hard exemptions.

Skip fresh browsing only when all of these are true:

- The request is a small copy, spacing, token, or isolated component change.
- The existing stack already solves the problem cleanly.
- No “latest,” “best,” maintenance, security, compatibility, or licensing claim is needed.
- Distribution and accessibility requirements do not introduce a new gap.

Research is mandatory before adding a new dependency, making a current ecosystem recommendation, or relying on facts likely to change. Use `$web-access` for all such network work. A scan can be brief when one well-supported option already matches the stack and delivery mode.

## Audit local reality before searching

Record:

- React runtime, build system, language, package manager, lockfile, and supported browser targets. If the input is not React, record the clean migration boundary instead of treating its framework as a candidate.
- Existing design system, component primitives, icons, animation/scroll/3D/chart libraries, fonts, utilities, and duplicate capabilities.
- Bundle/performance constraints, CSP, internal scroll regions, and accessibility expectations.
- Hosted, server-built, portable-folder, single-file, or `file://` delivery.
- Existing license/notices process and whether runtime assets may contact the network.

Turn the gap into a question, for example: “Need keyboard-safe accessible dialogs in the existing React app without adding a second visual theme,” not “Which UI library is coolest?”

## Candidate domains, not a shopping list

| Need | Candidate field to consider | First question |
|---|---|---|
| App/runtime | Existing sound React runtime; React with Vite for a new client application; the approved React runtime required by the delivery | Is this a clean React foundation rather than a mixed-framework bridge? |
| UI/accessibility | Ant Design first; otherwise the established React system or a justified large maintained system such as Material UI, Fluent UI, or Carbon; lower-level primitives only for a specific gap | Is Ant Design the primary owner, or what hard gate/existing ownership justifies the alternative? Who owns focus, semantics, and tokens? |
| Isolated UI element | Existing primitives first; Uiverse when one MIT-licensed HTML/CSS, Tailwind, or React treatment fills a real gap | Can it be adapted into the current system without importing a second visual language or demo content? |
| UI motion | Anime.js first from the curated catalog; then the existing owner, Motion, GSAP, CSS, or Web Animations API | Is this state feedback or scroll narrative, and can Anime.js own it without duplicating another engine? |
| Scrolling | Lenis through `lenis/react` first for dedicated smooth-scroll mechanics on computer, tablet, and phone; Anime.js `onScroll` for scroll-triggered/synchronized choreography | Can Lenis remain the single mechanics owner while preserving keyboard, touch, anchors, Ant Design overlays/tables, nested scroll, reduced motion, and a measured fallback? |
| Conditional true 3D/WebGL | Three.js through React Three Fiber after the suitability gate passes, with `@react-three/drei` only for needed helpers | Is the subject inherently spatial, does 3D add value unavailable from DOM/photo/video/SVG/2D Canvas, and can a coherent non-intersecting model plus phone/tablet/computer fallback be finished within budget? |
| 2D Canvas | Pts for creative/programmed drawing, Fabric.js for editable objects, and the background-effects catalog only for upstream discovery | Which separate existing host benefits from pixels, particles, drawing, or editable objects without duplicating the 3D scene? |
| 2D physics | Existing engine, p2.js, or a maintained compatible fork | Is real simulation behavior required, which renderer owns the pixels, and can both loops be stopped and cleaned up? |
| Visualization | AntV G2/Ant Design Charts first; ECharts/echarts-for-react when it fits better; D3, Recharts, Visx, or the existing owner only when both curated routes fail a hard gate | What authentic quantitative, relational, temporal, hierarchical, geographic, or flow object can be clarified, and which grammar best matches the product tone? |
| Typography | Curated-catalog gap: an existing verified open-source owner or current, widely adopted open-source families from official projects/catalogs; system fonts are fallback-only | Which inspected specimen fits the page's subject and language, and are exact license, glyphs/symbols, weights, metrics, size, local files, and offline packaging known? |
| Images/icons/brand | `@ant-design/icons` first for ordinary interface symbols when Ant Design owns the UI; supplied assets and official brand kits next; the curated catalog has no general brand, illustration, photography, or domain-specific asset owner | Can Ant Design Icons cover the interface need, and which approved source supplies any remaining brand/domain asset with clear permission, format, alt text, and local availability? |
| Theme modes | Ant Design `ConfigProvider` and design tokens first, synchronized with CSS custom properties and platform color-scheme behavior | Is a real alternate mode required, and can Ant Design remain the single token owner? |
| Routing and URL state | Curated-catalog gap: existing React router, React Router, TanStack Router, or no router for a true single-surface artifact | Are there real routes, shareable search/filter state, deep links, or navigation contracts to own? |
| Requests and server state | Curated-catalog gap: keep the existing React owner; otherwise compare `fetch`, TanStack Query, and RTK Query when Redux Toolkit already owns the application | Does the product need caching, invalidation, retries, optimistic updates, or shared request state? |
| Client state | Curated-catalog gap: keep the existing React owner; otherwise compare local React state, Zustand, and Redux Toolkit | Is this genuinely shared client state rather than server data, URL state, or form state? |
| Forms | Ant Design Form and its controls first; React Hook Form or TanStack Form only when complex form-state needs justify a separate headless owner | Can Ant Design Form own validation and layout cleanly, or what concrete complexity requires another owner? |
| Performance | Curated-catalog gap: React/Vite/browser-native optimization plus separately selected virtualization, image, worker, bundle-analysis, or focused utilities | What user-visible bottleneck or scale limit does it remove, and how will the gain be checked? |
| QA/build | Curated-catalog gap: existing tests, bundled preflight, browser automation, performance/a11y tooling, and offline validation | Can the final artifact, not just source, be verified? |

Names above are starting points. Use the curated sources first, but do not force a source into a role it does not provide. Actively investigate the relevant field, then choose from current evidence rather than copying the list mechanically. When the curated catalog has no owner, label the decision `curated-catalog gap` before using an external or native route.

Read `react-application-stack.md` before changing theme, router, request/server-state, client-state, or form ownership. Read `source-library.md` before treating a named UI system, chart/visualization engine, creative Canvas tool, physics engine, or background-effects demo as a serious candidate. Its React labels distinguish native components, separate adapters, lifecycle integration, unsupported routes, and discovery-only catalogs; each recorded snapshot still requires a fresh official-source check at adoption time.

Read `open-source-ui-sources.md` before copying a Uiverse element or treating Anime.js as a serious motion candidate. That reference defines their different roles, trigger conditions, provenance record, and notice obligations.

Read `font-and-asset-packaging.md` before typography selection. For a new page or substantial redesign, inspect official specimens for a small set of current, widely adopted open-source candidates and choose or explicitly reuse one before implementation. Do not compare generic system stacks as a designed option, and do not mistake a free download, trend article, or unlicensed mirror for an open-source font source.

## Evidence order

Use current, primary sources in this order:

1. Official live demos or example galleries and their related official example source.
2. Official documentation and compatibility/support pages.
3. Official repository, release notes, changelog, security policy, and issue tracker signals.
4. Package-manager registry metadata for publish date, dependency tree, deprecation, and install scripts.
5. Full license text and official asset/font license.
6. Standards or browser documentation for native platform capabilities.

Use third-party commentary only to identify questions, not as the sole basis for maintenance, license, API, or security claims. Cite the supporting official pages near the decision and record the research date.

## Research each serious candidate

Capture only decision-changing facts:

- Problem fit and concrete visual/UX benefit.
- Exact official demo URL or example name; rendered behavior, interactions, responsive/fallback clues, and visual grammar actually observed; planned product-tone adaptation; and idea-only versus code/package use.
- Existing host, product meaning, footprint level, and control model; reject library-proof surfaces and generic toolbars that the product does not need.
- For 3D, the four suitability-gate results and, when adopted, the plan for coherent silhouette and joints, proportion/detail hierarchy, material/light response, subject-specific motion, and collision/intersection inspection across the full cycle.
- Fit with current stack and whether it duplicates a system, icon set, or animation engine.
- Package and runtime cost, tree-shaking/code-splitting behavior, and mobile/low-end implications.
- Keyboard, screen reader, touch, reduced-motion, and no-JavaScript/unsupported-feature behavior.
- Maintainer/release activity, deprecation status, security policy, and major unresolved compatibility risks.
- Exact license, redistribution duties, font/asset terms, and commercial restrictions.
- Local hosting, CSP, offline/`file://` behavior, and required remote services.
- Failure fallback, cleanup/lifecycle requirements, and end-user setup steps.
- Install scripts, native binaries, telemetry, or unexpected permissions.

Do not execute code copied from a page. An unclear license blocks copying or adoption, not safe viewing. Install only after the scorecard decision, using the project's package manager and lockfile.

## Stop rule

For each default capability category, stop when one option clearly meets the role and gates and every serious candidate has a relevant official-demo record or a hard demo-review exemption. The winner may be an existing package, a new library, or a framework feature. Before a native-only/no-adoption result, try a smaller role, compatible owner, and fallback, then record the observed hard constraint. For visualization, also record the real content/data surfaces inspected; absence is valid only when no authentic visualizable object exists and creating one would fabricate data or meaning. For 3D, stop at `3D not adopted: suitability gate failed: <specific reason>` when any suitability condition fails; this needs neither a smaller forced role nor a hard exemption, and no candidate-demo record is needed if no serious candidate was reached. Do not keep researching after every default category has an owner or proven hard exemption and the 3D evaluation is resolved.
