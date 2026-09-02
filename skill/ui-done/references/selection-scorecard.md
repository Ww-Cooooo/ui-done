# Selection Scorecard

Use this to choose one primary React-compatible tool for each frontend capability category before changing dependencies, design systems, fonts, icons, motion/scroll/3D/charting, theme, routing, data/state/form ownership, performance, or build tooling. React itself is fixed by this Skill and is not compared against Vue or another UI framework.

## Hard gates

Reject or pause a candidate when any applicable gate fails:

- It has no credible shipped role that supports the user's product, visual direction, interaction, or delivery; an unused import does not count as adoption.
- Its visible role becomes understandable only after inventing a scene name, explanatory label, or generic pause/reset/rotate/view controls that the product itself does not need.
- Its relevant official demos have not been inspected and no recorded `hard demo-review exemption` from `source-library.md` applies.
- It duplicates the existing design system, icon family, animation owner, router, form layer, or chart stack without a migration plan.
- Its license is unclear, incompatible with intended redistribution, closed/paid without approval, or missing required attribution terms.
- Copied source code lacks an official upstream page or repository, identifiable author/project, exact license text, or a planned notice location.
- Offline/portable delivery requires a remote runtime service, CDN, account, or system-installed font that the user did not authorize.
- A new or materially redesigned page has no deliberately selected open-source primary typeface, the exact font license/files cannot be traced to an official source, relevant specimens were not inspected, or normal rendering depends on a browser/operating-system default.
- Keyboard, screen reader, touch, reduced-motion, or essential static fallback cannot be made usable.
- Maintenance/security evidence is inadequate for the role it would occupy.
- It adds hidden install scripts, native binaries, telemetry, or operational burden disproportionate to its benefit.

## Decision table

Show this concise table before consequential installation. Reproduce all ten columns exactly; do not merge or rename them. For substantial work, begin with one proposed-adoption row for the React UI foundation, motion, scrolling, true 3D/WebGL, 2D Canvas, visualization, icons/assets, and performance. The React UI row must select a primary component system; Ant Design is the default for greenfield or ownerless work, and a no-adoption row is invalid. True 3D and 2D Canvas require separate rows and jobs. Visualization selects one owner, preferably AntV and otherwise ECharts when it fits better; use a no-adoption row only for the narrow proven absence of any authentic visualizable object or when another hard gate remains after alternatives and fallbacks.

Theme modes, routing/URL state, request/server state, client state, and forms are conditional React application concerns. Inspect all five, but include a selection row only when the product exposes that concern or ownership is changing. Record “not applicable” in the audit instead of inventing a theme toggle, route, API, global store, or form.

Before scoring a visible owner, name the existing page region or interaction that will host it, the product meaning it adds, the reason for any direct user control, and the smallest honest footprint: structural, behavioral, accent, or infrastructure. A proposal that needs a new showcase section, invented copy, fake data, compensatory label, or extra controls solely to reveal the library has failed product fit even if its technical score is high.

Before the table, add a compact demo note for every serious candidate: exact official demo URL or example name, what was actually observed, intended host and tone adaptation, idea-only versus code/package use, and adopted or rejected status. Keep the required decision table at exactly ten columns; do not add a demo column. If no relevant official demo was viewed, cite the exact hard exemption. An unclear license may pause copying or adoption, but it is not an exemption from safely viewing the official demo.

| 需求 | 候选 | 是否采用 | 视觉收益 | 性能代价 | 无障碍 | 维护状态 | 许可证 | 离线能力 | 结论 |
|---|---|---|---|---|---|---|---|---|---|
| State the real gap | Existing/native or named candidate | Yes / No / Conditional | None / Low / Medium / High, with one reason | Bundle/runtime/GPU/network impact | Keyboard, screen reader, touch, reduced motion, fallback | Evidence and date | SPDX/name plus obligations | Local runtime, `file://`, required steps | One-sentence tradeoff |

Keep cells short. Put source links next to maintenance/license/API claims when research occurred.

## Scoring aid

Use 0–3 only to expose tradeoffs; do not let arithmetic override a hard gate.

| Criterion | Weight | 0 | 3 |
|---|---:|---|---|
| Solves the real need | 3 | Cosmetic or speculative | Directly satisfies a documented requirement |
| Stack fit / non-duplication | 2 | Conflicts or duplicates | Reuses architecture cleanly |
| Visual/UX benefit | 2 | No user-visible gain | Material, demonstrable improvement |
| Accessibility/fallback | 3 | Essential path unusable | Complete keyboard/screen reader/reduced-motion/static path |
| Performance | 2 | Unbounded cost | Budgeted, lazy when appropriate, low-end safe |
| Maintenance/security | 2 | Stale/unclear | Active, documented, suitable security posture |
| License/redistribution | 3 | Unknown/incompatible | Clear and compatible, obligations planned |
| Offline/portability | 3 | Runtime network/account required | Fully local or clearly compatible with delivery |
| Operational simplicity | 2 | Adds user setup and fragile tooling | No extra end-user work, clean developer workflow |

Record the total only when comparing several close candidates. A high score cannot cure an incompatible license or broken delivery contract.

## Selection rules by category

- Framework: React is required. For greenfield substantial work, use a sound React runtime and one required React UI component system. Keep a sound existing React runtime; for non-React inputs define a clean migration boundary and do not create a mixed-framework result.
- Design system: default to Ant Design when no approved React system exists. Keep another established system only when it already owns the product or Ant Design fails a documented hard gate. Never layer two primary component systems.
- Source priority: after naming the real need, check `source-library.md` before unlisted packages or native-only work. Prefer a compatible curated source that passes the gates; otherwise record `curated-catalog gap` and the fallback.
- Theme modes: use Ant Design tokens/`ConfigProvider` as the default component-theme owner, synchronized with semantic CSS and platform color-scheme behavior. Add a manual switch only when the product requires it.
- Routing/URL state: keep the current React router when it fits. Use one router for real navigation and shareable URL state; do not add routing to a true single-surface artifact.
- Requests/server state: keep server data out of generic client stores. Use native requests for simple isolated flows, a query/cache owner for shared server state, or RTK Query when Redux Toolkit already owns the application.
- Client state: start with local React state/reducer/context. Add one global owner only for genuinely shared client state; do not duplicate URL, server, or form state.
- Forms: use Ant Design Form and Ant Design controls by default while preserving native semantics. Add React Hook Form or TanStack Form only when validation, composition, dynamic fields, or rendering scale justifies a separate owner.
- Icons: when Ant Design owns the UI, start with `@ant-design/icons` for ordinary interface symbols. Use one family and consistent stroke/fill rules; use official brand assets for brands and separately verify domain-specific assets.
- Animation: prefer Anime.js from the curated catalog when it fits; otherwise select one justified motion library. Let it own presence, layout, coordinated state, and signature transitions on existing product surfaces; keep CSS for isolated micro-states that do not compete with it. Do not expose library controls unless the user has a real manipulation task or an accessibility mechanism requires them.
- Scrolling: use Lenis through `lenis/react` as the default dedicated smooth-scroll owner and Anime.js `onScroll` as the choreography owner. Keep Lenis on computer, tablet, and phone when real-device-class checks pass; a native-only/no-adoption result requires an observed hard constraint, not convenience. Preserve forms, tables, Ant Design overlays, nested panels, anchors, keyboard paths, touch behavior, and reduced-motion mode.
- 3D: use Three.js through React Three Fiber as the default real 3D/WebGL route; add `@react-three/drei` only for helpers the scene uses. Give it one bounded, purposeful role aligned with an existing product object, relationship, dataset, or motif. Scale DPR/assets/effects for phone and tablet before omitting it, provide a static fallback, and keep pause/reset/rotate/view UI opt-in rather than part of a generic scene wrapper.
- 2D Canvas: select a separate owner and shipped role; prefer Pts for creative/programmed drawing or Fabric.js for editable objects. A Three.js/R3F scene cannot satisfy this row. Shrink the Canvas footprint or change its host before claiming it cannot fit.
- Visualization: inspect real quantitative, relational, temporal, hierarchical, geographic, and flow content before scoring omission. Prefer AntV G2 or Ant Design Charts and adapt its visual grammar to the product; select ECharts instead when it fits better. Use one primary owner, not both for generic variety. A no-adoption result must state the inspected surfaces and prove that no authentic visualizable object exists and creating one would fabricate data or meaning.
- Performance: select the framework-native path plus focused tooling that can prove a user-visible or delivery gain; do not add overlapping optimizers for the same bottleneck.
- Fonts: every new or materially redesigned page must select or explicitly reuse at least one current, widely adopted open-source primary family after inspecting official specimens with representative page text. Score subject/tone fit, language and symbol coverage, required weights, file size, layout metrics, maintenance/adoption evidence, exact license, self-hosting, and provenance—not beauty or popularity alone. Generic and operating-system fonts are failure fallbacks, not candidates. Record the choice compactly; do not force a full ten-column installation table when an already verified local open-source family cleanly fits.

## After selection

1. State the selected owner and shipped job for every capability category, plus the attempted smaller role, alternatives, evidence, and hard-gate reason for any omission.
2. Attach the official-demo record for every selected or seriously considered source: exact demo, observed capability, adopted or rejected decision, planned adaptation, and idea-only versus code use; otherwise attach the hard demo-review exemption.
3. Confirm package or copied-component name, official source, author/project, exact license, and compatible current usage from official evidence.
4. Install with the existing package manager and update the lockfile.
5. Re-run build, license/offline checks, browser QA, and bundle/performance checks proportional to impact.
6. Remove superseded dependencies/assets only after proving they are unused and preserving user work.
