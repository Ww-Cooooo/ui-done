# Visual QA

Visual acceptance verifies real user behavior and visible results. Select the checks that can reveal a failure caused by this change; the sections below are a conditional catalog, not a mandatory full run for every edit.

## Select the scope before testing

| Change | Minimum sufficient evidence |
|---|---|
| Instructions, README, or non-rendered text | Check affected facts, links, and decision scenarios. No unrelated browser run. |
| Visible copy, colors, or local layout | Inspect the affected rendered state and size; cover other consumers when shared tokens or components changed. |
| Motion, scrolling, or state | Exercise the actual action, meaningful visible motion phases, relevant preference/lifecycle changes, and the corresponding known regression. Preserve user state during live preference changes. |
| A new page or material responsive redesign | Check computer, tablet, and phone, the declared user loop, relevant fallback states, and the affected design-variety contract. |
| Dependencies, bundles, or delivery entry | Build the affected artifact once; exercise the real entry and check resources that must and must not load. Add offline or installation checks when that delivery contract applies. |

After a passing check, reuse its evidence while its code, artifact, and relevant conditions remain unchanged. Expand or rerun only for a new change, failure, or unresolved concrete doubt. Historical results keep their original scope and date; they are not a new run.

## Establish the test target

- Test the intended final mechanism: development server, production preview, hosted URL, checked-in built folder, single HTML, or direct `file://` entry.
- Build first when production transforms assets, routes, CSS, or chunking differently.
- Use `$webapp-testing` when available. Follow its server-helper and reconnaissance instructions; otherwise use available browser automation with equivalent evidence.
- Preserve the user's state/diffs. Capture a pre-change baseline when needed to reproduce a defect or compare a redesign, not as a prerequisite for every correction.

## Minimum viewport matrix

For new pages and material layout redesigns, use one representative size for each ordinary device class. Scoped repairs select the affected sizes using the table above:

| Class | Suggested viewport | Purpose |
|---|---:|---|
| Computer | 1440×900 or 1366×768 | Full composition, navigation, fold, and fixed UI |
| Tablet | 768×1024 | Breakpoint and touch layout |
| Phone | 390×844 | Primary mobile experience |

Add an extra-wide desktop, extra-narrow phone, landscape orientation, TV, kiosk, embedded panel, or another special target only when the user or explicit delivery contract names it. Do not expand the default matrix speculatively.

## Pages and states

Within the selected scope, cover the affected entry and representative consumers of shared behavior. Exercise applicable states rather than only the happy path:

- Navigation, deep links, browser back/forward, search/filter, dialogs/drawers/menus, forms, and destructive confirmation.
- On each work route under test, perform the declared loop without relying on the design notes. Can the user identify the task, read its evidence, find the action, and understand the result? For mutable tasks, check the same record and derived summary; for read-only tasks, check comparison, selection, and navigation without fabricated success. Sample domain relationships exposed by that loop (for example date/weekday/time position or asset/version identity), not just whether a button changes text.
- Empty, loading, success, validation error, request error/timeout, offline, disabled, and permission-limited states.
- Long Chinese/English text, unbroken paths/IDs, large numbers, missing optional fields, many/few items, and realistic data.
- Hover, focus, pressed, selected, expanded, drag/touch, and keyboard-only operation.
- Normal motion, reduced motion, and advanced-visual fallback.

Do not manufacture irrelevant states, but do not skip exposed states affected by the change.

## Visual and computed-style checks

- Inspect full-page and focused screenshots, not just DOM structure.
- For a multi-page set that claims different styles or subjects, compare a contact sheet and a compact visible-architecture signature for every route: opening composition, dominant content topology, media rhythm, module order, primary interaction or reading progression, motion grammar, ending, and phone transformation. Reject a result when most routes preserve the same hero split, media count, numbered-card rhythm, advanced-visual position, chart/form position, and ending while only the skin changes.
- For a full visual overhaul, use prior screenshots only to identify defects, preserve contracts, and prove rollback. Reject a redesign review that treats the old page as the default layout seed and merely rearranges or recolors its composed sections without an explicit preservation reason.
- Build a pairwise topology table for intentionally distinct routes. Record each page's detail carrier, overlay type, scroll model, primary interaction locus, and primary motion trigger/completion. Reject any pair that shares the same skeleton + carrier + scroll + primary-motion combination without a content-derived reason; repeated Drawer/Modal/long-page/reveal patterns are not excused by different themes.
- When the delivery contract says every layout must be wholly different, run the stricter zero-visible-reuse pass. Reduce every desktop and phone route to only the page edge, largest masses, main axis, navigation locus, detail carrier, controls, media ratio, and scroll direction. Do not share a visible header, return location, rail, card array, bottom dock, progress treatment, entrance arrangement, or generic phone stack across any pair. Shared Ant Design primitives are valid; a shared visible composition made from them is not. If two routes still fit one wireframe, stop and redesign before checking color, typography, imagery, or motion polish.
- For a gallery or portfolio index, test the collection shell separately from the works. Compare preview interiors without gallery labels: reject repeated image panes, badges, copy rails, or aspect-ratio grammar. Each preview must also represent the current work's actual dominant composition and interaction, not an independently polished alternative that disappears when opened. Neutral metadata belongs outside the preview whenever possible.
- Run a silhouette pass on intentionally distinct works: view the contact sheet with text/labels hidden and enough blur or downscaling to remove decorative detail. Each work should retain a content-derived dominant mass, whitespace pattern, media relationship, and interaction locus that distinguishes it from the others. Do not pass this test by adding random clipping, arbitrary shapes, or different colors; the difference must follow content, task, or reading behavior.
- For a multi-page set that claims broad product coverage, compare the route matrix as well as the contact sheet. Record each route's product model, user, core task verb, information architecture, mutable state or browsing goal, data source, and phone transformation. Reject a set whose supposed variety is still mostly brochure, campaign, poster, or dashboard-shaped decoration with renamed sections.
- Check hierarchy, alignment, spacing rhythm, color/contrast, radius/elevation consistency, icon alignment, image quality, and the intended signature element.
- Open or trigger affected Drawers, Modals, menus, popovers, expanded rows, inline inspectors, bottom sheets, and post-action notices. Measure the rendered foreground/background pair in the actual open state; inheriting correct page tokens is not proof that a portal, overlay, disabled control, selected tab, or secondary label is readable.
- Look for library-proof content: sections, cards, labels, controls, scenes, or datasets that exist only to show a dependency was used. Remove them or shrink the capability into an existing region as a context-aligned accent.
- For every visible enhancement, identify its existing host and product meaning. If either answer is vague, treat the placement as arbitrary even when the colors and spacing match.
- Temporarily disregard scene names and explanatory labels. If the effect becomes incomprehensible without a label invented for it, the label is compensating for weak integration rather than describing product content.
- Inspect controls as product features. Reject repeated generic pause, reset, rotate, speed, or view toolbars across unrelated pages unless each control has a page-specific task or accessibility rationale.
- For demo-derived work, compare the useful behavior with its reference and judge its actual product role. A working effect with unrelated comparison objects, inaccessible controls, or filler content fails adoption. Keep the user's task available during motion; a routine selection or save must not replay unrelated entrances or erase working context.
- For every new page or material redesign, verify the separate GSAP record names the official React guidance and one relevant Demo Hub/Showcase example, observed behavior, shipped product-aligned job, selected plugins, page-specific adaptation, current Standard License result, and reduced-motion/static completion. Fail a mere homepage name, package import, or universal reveal. When GSAP is absent, require the exact hard-rejection evidence and the smaller role or fallback attempted.
- Also verify the five-source creative-pass record names the exact MotionSites direction/Prompt state, React Bits Preview/Code item, Uiverse Code item, Anime.js behavior/API, and Aceternity Preview/Code item, with an honest adopt/adapt/idea-only/reject result. Anime.js may be idea-only or rejected when GSAP owns motion; fail duplicate motion ownership, homepage-only records, missing Code views, implied use without adoption, or ignored license/dependency conflicts.
- Reject leftover sample copy, fabricated demo data, generic demo controls, gallery framing, or attribution/license omissions. When example code or assets were copied, verify the recorded upstream, modifications, license obligations, and notice location.
- On phone layouts, check whether decorative controls enter the reading order, cover meaningful imagery, or become more prominent than the content they supposedly support.
- Enumerate visible text and inspect computed `font-size`, `line-height`, `font-family`, overflow, and truncation. Treat 11px as a floor reserved for short low-priority metadata; keep labels/card copy around 13px+, controls around 14px+, and continuous body copy around 15–16px+ unless the product has a justified accessible scale.
- Verify the deliberately selected open-source fonts truly loaded with computed styles and `document.fonts`; test representative Chinese, English, numerals, code, punctuation, math, and special symbols that the page uses. Treat normal-operation fallback to a browser/operating-system default, an unlicensed face, or tofu/missing glyphs as an acceptance failure.
- Check headings and real long content at each viewport. Prefer wrapping/reflow over silent clipping.
- Detect horizontal overflow by comparing document/element scroll widths with viewport/client widths.
- Confirm sticky/fixed headers, rails, bottom navigation, cookie bars, and CTA bars do not cover the first or final content.
- Ensure touch targets are approximately 44×44 CSS px or larger and visible focus is not clipped.

## Runtime checks

- Capture console errors/warnings, uncaught page errors, failed responses, CSP violations, and hydration/render errors.
- Inspect runtime requests. For offline/portable artifacts, fail any required remote font, script, style, image, model, data, or telemetry request.
- Reload and navigate directly to supported routes. For `file://`, open the actual entry without a server and test relative paths.
- Confirm images/media reserve dimensions, font loading does not cause damaging layout shift, and heavy features load lazily when appropriate.
- When motion or its shared lifecycle changes, test both initial reduced motion and a preference change after a real user action. Automatic motion, smooth scrolling, parallax, loops, and pinning must collapse safely without clearing task order, inputs, filters, or selection.
- When GSAP is selected, exercise every primary timeline and ScrollTrigger at two or more meaningful phases, then navigate away, return, remount, change the responsive range, and change reduced-motion preference. Fail duplicate timelines/triggers/listeners, stale selectors, hydration errors, invisible-but-focusable content, blocked input, or incomplete static completion.
- When Lenis is selected, verify wheel, touch, keyboard, anchor links, browser back/forward and restoration, text selection, nested scroll areas, and Ant Design Modal/Drawer/Table behavior on computer, tablet, and phone. Confirm teardown/remount does not duplicate the scroll owner or animation frame. When ScrollTrigger is present, verify the Lenis bridge and refresh behavior and confirm ScrollSmoother or another smooth-scroll mechanics owner is absent.
- For work surfaces, verify responsive task transformation rather than mere stacking: simultaneous desktop context may collapse into an explicit mobile focus, but primary actions, current state, validation feedback, and a path back to the list must remain available without horizontal document scrolling.
- For the separate 2D Canvas owner, verify resize, pixel ratio, redraw cost, teardown/remount, resource failure, and its static/DOM fallback on computer, tablet, and phone.
- Confirm the recorded 3D suitability decision for every substantial surface. When the gate failed, verify the surface does not mount a WebGL canvas, run an initialization probe, or request a 3D chunk. The required 2D Canvas layer remains independent.
- When WebGL/3D was adopted, exercise unsupported/initialization/resource/context-loss fallback and confirm equivalent semantic controls remain.
- For adopted R3F/Three.js, inspect phone/tablet rendering cost as well as desktop: device-pixel ratio, model/texture loading, draw calls or an equivalent profiler signal, hidden/offscreen pause, resize, and the actual static/DOM fallback.
- For every prominent adopted 3D scene, temporarily remove its label and judge the rendered subject, camera framing, depth, material response, lighting hierarchy, and motion. A generic primitive cluster, global auto-rotation, or color-only scene variant fails visual acceptance unless the page's content makes that exact treatment meaningful.
- Capture several animation phases and inspect the complete loop from more than one useful camera view. Fail accidental mesh interpenetration, self-intersection, z-fighting, coplanar flicker, near/far-plane clipping, or animated collisions. Allow deliberate joints, contact patches, and nested shells only when their structural intent is visually clear.
- Reject finished models that look like unrelated stock boxes, cylinders, spheres, or toruses pushed together. Primitive construction is acceptable for helpers, blocking, procedural systems, or an explicitly justified low-poly/technical language; the delivered subject still needs a coherent silhouette, believable joints, intentional scale/detail hierarchy, legible materials and lighting, and subject-specific motion.
- When authentic visualizable data exists, confirm one AntV-first or justified ECharts owner is actually rendered, uses real data, matches the interface tokens and tone, and remains readable and usable at all three device classes. If visualization is absent, verify the recorded hard exemption names the inspected data/content surfaces and proves that creating a chart would fabricate data or meaning.
- Use Lighthouse or an equivalent performance/accessibility check when performance risk, public launch, or user requirements justify it. Record the tested build and environment; do not invent scores.

## Iteration loop

1. Render and wait for the real settled state.
2. Capture screenshots, computed evidence, console/network output, and interaction results.
3. Classify issues by user impact, not cosmetic convenience.
4. Run the removal test on every newly added visible region: if removing it changes no product meaning and only hides a library, treat it as filler.
5. Run the control test: if the user has no reason to manipulate an effect, remove its library-shaped controls and handle ambient motion through bounded behavior, system preferences, visibility, and context-appropriate accessibility mechanisms.
6. Fix the shared token/layout/component cause when several screens exhibit the same defect. Shared lifecycle code is useful; a shared composed preview/page component may itself be the defect.
7. For multi-page work, compare routes and preview interiors side by side after each major pass; fix repeated section order, overlay coordinates, signature placement, and motion grammar before polishing individual colors or effects.
8. For each primary motion under test, sample two or more meaningful visible phases and verify a real visual/state change. An invisible element's coordinates compared with its final position do not prove visible travel. A GSAP import, RAF, CSS keyframe, or shared reveal selector alone does not pass. In reduced-motion mode, preserve the user's content and state in a stable completion.
9. Compare product behavior as well as composition: confirm that work routes use different task-appropriate structures and each completes its declared loop, while expressive routes are not padded with fake controls or data.
10. Rebuild only when the tested artifact changed; rerun the affected cases and any nearby regression tied to the changed shared behavior.
11. Stop when relevant checks pass and no material doubt remains. Document a remaining limitation without calling it a pass.

Never accept the first render simply because it loads.

## Acceptance record

Use the handoff in `../SKILL.md` as the single acceptance summary. Identify the actual build/entry, browser, sizes, actions, observed results, and untested scope. Reference existing selection, provenance, exemption, and design-variety decisions instead of duplicating them here. Link screenshots only when useful artifacts were retained; do not create a full evidence package by default.

Static checks such as `scripts/frontend_preflight.py` are useful triage, but browser evidence is authoritative for computed layout, font loading, interaction, and network behavior.
