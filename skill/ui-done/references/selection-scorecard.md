# Selection Scorecard

Use this to choose one primary tool for each frontend capability category before changing dependencies, design systems, fonts, icons, motion/scroll/3D/charting, performance, or build tooling.

## Hard gates

Reject or pause a candidate when any applicable gate fails:

- It has no credible shipped role that supports the user's product, visual direction, interaction, or delivery; an unused import does not count as adoption.
- Its visible role becomes understandable only after inventing a scene name, explanatory label, or generic pause/reset/rotate/view controls that the product itself does not need.
- It duplicates the existing design system, icon family, animation owner, router, form layer, or chart stack without a migration plan.
- Its license is unclear, incompatible with intended redistribution, closed/paid without approval, or missing required attribution terms.
- Copied source code lacks an official upstream page or repository, identifiable author/project, exact license text, or a planned notice location.
- Offline/portable delivery requires a remote runtime service, CDN, account, or system-installed font that the user did not authorize.
- Keyboard, screen reader, touch, reduced-motion, or essential static fallback cannot be made usable.
- Maintenance/security evidence is inadequate for the role it would occupy.
- It adds hidden install scripts, native binaries, telemetry, or operational burden disproportionate to its benefit.

## Decision table

Show this concise table before consequential installation. Reproduce all ten columns exactly; do not merge or rename them. For substantial work, include one selected row for UI foundation, motion, scrolling, 3D/Canvas, data visualization when data exists, icons/assets, and performance. Use a no-adoption row only when a hard gate blocks that category.

Before scoring a visible owner, name the existing page region or interaction that will host it, the product meaning it adds, the reason for any direct user control, and the smallest honest footprint: structural, behavioral, accent, or infrastructure. A proposal that needs a new showcase section, invented copy, fake data, compensatory label, or extra controls solely to reveal the library has failed product fit even if its technical score is high.

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

- Framework: for greenfield substantial work, choose a modern framework and UI/component layer by default. In an existing product, keep the framework when sound and add compatible layers; migrate only with a clear boundary and sustained benefit.
- Design system: use one primary system. Extend tokens before layering a second visual language.
- Icons: use one family and consistent stroke/fill rules; use official brand assets for brands.
- Animation: select one motion library for substantial work. Let it own presence, layout, coordinated state, and signature transitions on existing product surfaces; keep CSS for isolated micro-states that do not compete with it. Do not expose library controls unless the user has a real manipulation task or an accessibility mechanism requires them.
- Smooth scrolling: select one maintained scrolling layer and tune its strength to the interface. Preserve native behavior inside forms, tables, nested panels, keyboard paths, reduced-motion mode, and any region where enhancement would harm control.
- 3D: select Three.js or one comparable engine and give it one bounded, purposeful role aligned with an existing product object, relationship, dataset, or motif. Budget it, provide a static fallback, and keep pause/reset/rotate/view UI opt-in rather than part of a generic scene wrapper.
- Charts: when quantitative or relational data exists, select one charting system. Use lower-level tools when bespoke interaction or visual grammar justifies them.
- Performance: select the framework-native path plus focused tooling that can prove a user-visible or delivery gain; do not add overlapping optimizers for the same bottleneck.
- Fonts: score glyph coverage, required weights, file size, layout metrics, redistribution, self-hosting, and provenance, not beauty alone.

## After selection

1. State the selected owner for every capability category and the hard-gate reason for any omission.
2. Confirm package or copied-component name, official source, author/project, exact license, and compatible current usage from official evidence.
3. Install with the existing package manager and update the lockfile.
4. Re-run build, license/offline checks, browser QA, and bundle/performance checks proportional to impact.
5. Remove superseded dependencies/assets only after proving they are unused and preserving user work.
