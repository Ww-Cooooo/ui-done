# Visual QA

Visual acceptance verifies real user behavior and visible results. Select the checks that can reveal a failure caused by this change; the sections below are a conditional catalog, not a mandatory full run for every edit.

## Select the scope before testing

| Change | Minimum sufficient evidence |
|---|---|
| Instructions, README, or non-rendered text | Check affected facts, links, and decision scenarios. No unrelated browser run. |
| Visible copy, colors, or local layout | Inspect the affected rendered state and size, including task areas that share its space; cover other consumers when shared tokens or components changed. |
| Motion, scrolling, or state | Exercise the actual action, meaningful visible motion phases, relevant preference/lifecycle changes, and the corresponding known regression. Preserve user state during live preference changes. |
| A new page or material redesign | Check representative desktop sizes, opening and ordinary action states, the main sequence, relevant fallbacks, and affected distinctness. Add tablet/phone only if declared targets. |
| Dependencies, bundles, or delivery entry | Build the affected artifact once; exercise the real entry and check resources that must and must not load. Add offline or installation checks when that delivery contract applies. |

After a passing check, reuse its evidence while its code, artifact, and relevant conditions remain unchanged. Expand or rerun only for a new change, failure, or unresolved concrete doubt. Historical results keep their original scope and date; they are not a new run.

## Local layout changes include their spatial consequences

“Scoped verification” means following the effect of the change, not stopping at the edited component. A row-height change in a bounded workspace changes the space left for its siblings; an inspector changes the width of the object beside it; longer text can push an action below the visible area. These are direct consequences, not unrelated regression work. Unchanged routes and independent media/backend operations do not need retesting merely because this relationship exists.

For the affected viewport and state, identify the changed area and the core task areas that share its grid, flex allocation, scroll container, or overlay space. Perform the task through that state and inspect the displayed content, not just nonzero bounding boxes. When the layout supports different content modes and the change reaches them, inspect the affected modes rather than assuming one represents the others. Read `page-composition.md` when the repair requires reallocating those relationships, not for every isolated token correction.

| Change under review | Nearby result that belongs in scope | A false pass |
|---|---|---|
| Increase waveform/timeline height | The actual video frame, readable transcript, playback controls, and note action still support reviewing the same segment | Waveform exceeds a height threshold while the portrait video becomes too small to read |
| Open or widen an inspector | The selected object, comparison evidence, and primary action remain usable; closure restores a coherent view | Inspector text fits but covers the object the user must inspect |
| Switch video to audio-only mode | Space serves listening, waveform/transcript reading, and notes rather than a large unused player placeholder | The video element disappears but its large decorative replacement still crowds the task |
| Add scroll/reveal or selection motion | The user can track the affected relationship and retain position/input through completion and reduced motion | Animation code runs, but content overlaps, remains hidden, or the whole page restarts after an ordinary action |

For example, after enlarging a review timeline, use representative media to read a real subtitle/detail, locate a spoken line, select the intended interval, reach the related note action, and continue from that context. Check only the supported steps affected by the change; do not invent an editing workflow. If the frame is unreadable, revise the allocation rather than accepting a larger empty player box or undoing the requested waveform improvement. No universal pixel threshold can establish that task success.

A screenshot is useful evidence only when interpreted against the task. A capture that contains every component can still show an unusable result. Retain useful geometry/interaction assertions, but state what they prove: technical rendering, local behavior, and whole-task usability are distinct claims. An `ok: true` result from a height/seek check does not certify layout quality, motion quality, or the entry the user is actually opening.

For a redesign, keep three judgments distinct in the existing handoff: **functional correctness** (the task and data work), **design quality** (the composition, visual identity, and dynamic sequence meet the brief), and **user acceptance** (the user's actual response, or not yet obtained). Do not substitute any one for the others. Use the [representative sequence](page-composition.md#repair-a-rejected-layout-family) and [motion method](motion-scroll-and-3d.md#design-a-sequence-not-a-tween-quota) instead of an additional test suite. For a public showcase, a technically functioning candidate with an unresolved design rejection is not an accepted flagship demonstration; do not promote it as one merely because tests passed. This distinction does not add deployment authority or make every routine fix require user approval.

For reference-led work, apply the [concrete-reference contract](open-source-ui-sources.md#preserve-concrete-reference-evidence) to the actual rendered sample: compare the selected artifact with each decisive retained trait, name the candidate state where it appears, and identify absent or intentionally altered traits with their reason. Do not accept "hierarchy improved," a list of visited sites, or a library/functional pass as evidence that the reference survived. Repair a missing agreed trait or surface its concrete conflict before expanding the dependent design. After a repeated subjective rejection, label the new direction as a candidate until the relevant user response is obtained; do not make the user repeat an already explicit defect to stop expansion. A visual-only or Skill trial verifies the requested visual/motion sample, not an unsolicited complete business workflow.

## Judge the concept, not only its corrections

For a material redesign or Skill trial, judge the original goal against the actual opening and ordinary action state: composition, type, proportions, content density, material/color finish, and main interaction as one experience. Removal of a rejected pattern is a floor, not the positive design objective. A beautiful asset, faithful local trait, synchronized data, or a passing save does not rescue an ordinary or inappropriate whole concept. If it remains weak, say which overall decision fails and revise that decision before expanding the candidate; do not keep the concept because its checklist passed.

An independent reviewer receives the actual brief, selected references/caveats and rejected artifacts, not only a parent's adaptation table or a request for three small issues. It may reject the entire direction even when local corrections work. Keep review proportional: this does not mandate another Agent, aesthetic score, full-product regression, or a new approval round. A static/local review reports that scope; it cannot certify dynamic feel or absence of overall design problems. The orchestrator checks the relevant rendered result personally. Agreement is additional judgment, not independent proof of user acceptance.

For new pages and substantial redesigns, inspect the design candidates and the refined selected draft before the implementation stage, following `../SKILL.md`. Use representative content and a storyboard or labeled previsualization of the primary transition where relevant. Keep draft comparison and design confirmation separate from subsequent browser and functional acceptance; do not build the application merely to obtain screenshots for the first design choice. If the user already rejected the overall result, do not relabel a local pass as resolution. Proceed to implementation only for a confirmed design scope, then verify the complete agreed result rather than treating the draft as a substitute for runtime capabilities.

## Establish the test target

- Test the intended final mechanism: development server, production preview, hosted URL, checked-in built folder, single HTML, or direct `file://` entry.
- Build first when production transforms assets, routes, CSS, or chunking differently.
- Use `$webapp-testing` when available. Follow its server-helper and reconnaissance instructions; otherwise use available browser automation with equivalent evidence.
- Preserve the user's state/diffs. Capture a pre-change baseline when needed to reproduce a defect or compare a redesign, not as a prerequisite for every correction.
- If an isolated candidate, temporary port, alternate folder, or preview build was tested, identify it separately from the user's normal entry. Trace the normal entry to its served artifact/process when the task includes delivery or the user reports seeing no change. A newer source file or a passing temporary preview does not prove that a long-running service switched versions. Do not restart, replace, publish, or bypass a host restriction without the necessary authorization; report the unswitched entry and continue independent work.

## Minimum viewport matrix

For new pages and material layout redesigns, desktop is the default. Check a representative full desktop composition and a smaller supported desktop when its allocation changes materially. Add tablet/phone only when the user or an existing explicit product contract requires them. Suggested sizes below are examples, not three mandatory classes. Scoped repairs select affected sizes/states using the table above:

| Class | Suggested viewport | Purpose |
|---|---:|---|
| Computer (default) | 1440×900; 1366×768 where relevant | Full composition, readable working state, fold, and fixed UI |
| Tablet (only when required) | 768×1024 | Supported breakpoint and touch layout |
| Phone (only when required) | 390×844 | Supported mobile task and navigation |

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

## Check changed control feedback

For a button/control motion change, exercise the [states it actually exposes](motion-scroll-and-3d.md#buttons-and-control-feedback) in its real toolbar, form or page context. This is a scoped interaction check, not a new whole-page benchmark:

- Enter/leave rapidly, press/release and cancel the pointer gesture; check that the hit target, label and neighboring controls stay usable and no visual press sticks.
- Use keyboard focus and activation with the primary primitive's semantics. Check that focus remains visible through decoration and that one activation causes only the intended action.
- For asynchronous actions, test the real pending, success and failure paths safely; repeated input must respect the product's duplicate-submission policy. A mocked delay is not a persistence check. Do not mutate real user data to prove an animation.
- Reverse/close or select again before completion where supported. Confirm obsolete tweens or late responses cannot restore the old target/state. Test teardown and live reduced-motion changes when the altered ownership reaches those paths.
- Watch normal-speed feedback and meaningful intermediate states; inspect long labels and the settled result. Smooth frames alone do not prove the control feels responsive, and stills alone cannot establish motion feel.

Report a reproducible finding with the action/state, visible or semantic failure, and responsible file/location when known. Keep a design judgment distinct from a measured defect. Reuse unchanged lifecycle/fallback evidence rather than replaying all checks for an isolated color/easing edit.

## Visual and computed-style checks

- Inspect full-page and focused screenshots, not just DOM structure. For an affected single-page composition, use the content relationships in `page-composition.md`: identify the primary task/reading surface, check that its actual content is usable, and judge its visible grouping as well as state synchronization. When a layout family was rejected, apply that reference's structural repair check to the opening view and the relevant action state. A working flow inside the same rejected arrangement is a functional pass, not a composition pass. Do not accept a fragmented layout merely because every card is attractive, or reject legitimate independent-item cards merely because they are cards.
- For a multi-page set that claims different styles or subjects, compare a contact sheet and a compact visible-architecture signature for every route: opening composition, dominant content topology, media rhythm, module order, primary interaction or reading progression, motion grammar, ending, and transformations for any declared additional devices. Reject a result when most routes preserve the same hero split, media count, numbered-card rhythm, advanced-visual position, chart/form position, and ending while only the skin changes.
- For a full visual overhaul, use prior screenshots only to identify defects, preserve contracts, and prove rollback. Reject a redesign review that treats the old page as the default layout seed and merely rearranges or recolors its composed sections without an explicit preservation reason.
- Build a pairwise topology table for intentionally distinct routes. Record each page's detail carrier, overlay type, scroll model, primary interaction locus, and primary motion trigger/completion. Reject any pair that shares the same skeleton + carrier + scroll + primary-motion combination without a content-derived reason; repeated Drawer/Modal/long-page/reveal patterns are not excused by different themes.
- When the delivery contract says every layout must be wholly different, run the stricter zero-visible-reuse pass. Reduce each route on the declared targets to only the page edge, largest masses, main axis, navigation locus, detail carrier, controls, media ratio, and scroll direction. Do not share a visible header, return location, rail, card array, bottom dock, progress treatment, entrance arrangement, or generic mobile stack (when supported) across any pair. Shared Ant Design primitives are valid; a shared visible composition made from them is not. If two routes still fit one wireframe, stop and redesign before checking color, typography, imagery, or motion polish.
- For a gallery or portfolio index, test the collection shell separately from the works. Compare preview interiors without gallery labels: reject repeated image panes, badges, copy rails, or aspect-ratio grammar. Each preview must also represent the current work's actual dominant composition and interaction, not an independently polished alternative that disappears when opened. Neutral metadata belongs outside the preview whenever possible.
- Run a silhouette pass on intentionally distinct works: view the contact sheet with text/labels hidden and enough blur or downscaling to remove decorative detail. Each work should retain a content-derived dominant mass, whitespace pattern, media relationship, and interaction locus that distinguishes it from the others. Do not pass this test by adding random clipping, arbitrary shapes, or different colors; the difference must follow content, task, or reading behavior.
- For a multi-page set that claims broad product coverage, compare the route matrix as well as the contact sheet. Record each route's product model, user, core task verb, information architecture, mutable state or browsing goal, data source, and transformations for any declared additional devices. Reject a set whose supposed variety is still mostly brochure, campaign, poster, or dashboard-shaped decoration with renamed sections.
- Check hierarchy, alignment, spacing rhythm, color/contrast, radius/elevation consistency, icon alignment, image quality, and the intended signature element.
- Open or trigger affected Drawers, Modals, menus, popovers, expanded rows, inline inspectors, bottom sheets, and post-action notices. Measure the rendered foreground/background pair in the actual open state, including effective opacity. Inheriting correct page tokens is not proof that a portal, disabled control, selected tab, secondary label, or chart axis is readable; inspect Canvas/chart labels in their renderer rather than substituting a nearby DOM color measurement.
- Look for library-proof content: sections, cards, labels, controls, scenes, or datasets that exist only to show a dependency was used. Check the role's declared observable contribution using `page-composition.md`. Remove filler regions and redesign invalid integrations; shrinking an arbitrary effect is not acceptance. A small genuine visualization or quiet task-specific motion can still be appropriate.
- For every visible enhancement, identify its existing host and product meaning. If either answer is vague, treat the placement as arbitrary even when the colors and spacing match.
- Temporarily disregard scene names and explanatory labels. If the effect becomes incomprehensible without a label invented for it, the label is compensating for weak integration rather than describing product content.
- Inspect controls as product features. Reject repeated generic pause, reset, rotate, speed, or view toolbars across unrelated pages unless each control has a page-specific task or accessibility rationale.
- For demo-derived work, compare the useful behavior with its reference and judge its actual product role. Use the reference-to-product translation in `open-source-ui-sources.md`, not just a list of visited pages: what relationship or action changed here, and can the user benefit from it? A working effect with unrelated comparison objects, inaccessible controls, or filler content fails adoption. Keep the user's task available during motion; a routine selection or save must not replay unrelated entrances or erase working context.
- For every new page or material redesign, verify the separate GSAP record names the official React guidance and one relevant Demo Hub/Showcase example, observed behavior, shipped product-aligned job, selected plugins, page-specific adaptation, current Standard License result, and reduced-motion/static completion. Fail a mere homepage name, package import, or universal reveal. When GSAP is absent, require the exact hard-rejection evidence and the smaller role or fallback attempted.
- Also verify the five-source creative-pass record names the exact MotionSites direction/Prompt state, React Bits Preview/Code item, Uiverse Code item, Anime.js behavior/API, and Aceternity Preview/Code item, with an honest adopt/adapt/idea-only/reject result. Anime.js may be idea-only or rejected when GSAP owns motion; fail duplicate motion ownership, homepage-only records, missing Code views, implied use without adoption, or ignored license/dependency conflicts.
- Reject leftover sample copy, fabricated demo data, generic demo controls, gallery framing, or attribution/license omissions. When example code or assets were copied, verify the recorded upstream, modifications, license obligations, and notice location.
- On phone layouts, check whether decorative controls enter the reading order, cover meaningful imagery, or become more prominent than the content they supposedly support.
- Enumerate visible text and inspect computed `font-size`, `line-height`, `font-family`, overflow, and truncation. Treat 11px as a floor reserved for short low-priority metadata; keep labels/card copy around 13px+, controls around 14px+, and continuous body copy around 15–16px+ unless the product has a justified accessible scale.
- Verify actual open-source font use with the [font-loading checks](font-and-asset-packaging.md#load-without-layout-surprises), using representative text, scripts, and weights from the affected page states. Treat normal-operation fallback to a browser/operating-system default, an unlicensed face, or tofu/missing glyphs as an acceptance failure.
- Check headings and real long content at each viewport. Prefer wrapping/reflow over silent clipping.
- Detect horizontal overflow by comparing document/element scroll widths with viewport/client widths.
- Confirm sticky/fixed headers, rails, bottom navigation, cookie bars, and CTA bars do not cover the first or final content.
- Ensure touch targets are approximately 44×44 CSS px or larger and visible focus is not clipped.

## Runtime checks

- Capture console errors/warnings, uncaught page errors, failed responses, CSP violations, and hydration/render errors.
- Inspect runtime requests. For offline/portable artifacts, fail any required remote font, script, style, image, model, data, or telemetry request.
- Reload and navigate directly to supported routes. For `file://`, open the actual entry without a server and test relative paths.
- Confirm images/media reserve dimensions, font loading does not cause damaging layout shift, and heavy features load lazily when appropriate.
- Exercise each affected primary motion sequence at meaningful intermediate and completed states. For a new or changed reduced-motion path, check initial reduced motion and a live preference change after an action; automatic motion, smoothing, parallax, loops, and pinning must collapse safely without clearing task state. A local easing/color change does not require rerunning unchanged preference handling.
- For GSAP, check the affected timeline/ScrollTrigger ownership. Exercise navigation, remount, or a layout-range change when the product has that path and the changed code affects its lifecycle or geometry; do not invent routes or extra device targets to complete a test list. Fail duplicate timelines/triggers/listeners, stale selectors, invisible-but-focusable content, blocked input, or incomplete static completion. Reuse relevant passing lifecycle evidence when ownership is unchanged.
- For Lenis, first verify the path decision: a no-adoption record must identify the surfaces/states checked for real document or nested scrolling, including relevant long content, resizing and zoom. Do not accept a wide empty screen as proof of no path. When a path exists, check wheel/keyboard scrolling and the interactions it actually contains: anchors, restoration, text selection, nested scrolling, or Ant Design overlays/table scrolling as applicable. Check teardown/remount when its ownership changes. If ScrollTrigger integration changes, check the bridge and refresh; confirm no competing smoothing owner. Include touch only on declared supported targets, not as an extra desktop requirement.
- For work surfaces, check usable allocation and state continuity across the declared desktop sizes. When phone/tablet support is explicitly required, also verify task transformation rather than mere stacking: primary actions, current state, validation feedback, and a path back to context must remain available without horizontal document scrolling.
- For the separate 2D Canvas owner, verify resize, pixel ratio, redraw cost, teardown/remount, resource failure, and its static/DOM fallback within the selected scope. For an affected chart/Canvas in a hidden region, test revealing it after its code has loaded, then reopening it; an intentionally deferred renderer need not initialize while hidden. Where layout can change after scrolling, exercise that sequence and compare drawing bounds with the host and nearby task content. Fresh page loads at each viewport do not prove these transitions. Use the [container lifecycle guidance](motion-scroll-and-3d.md#runtime-lifecycle) to fix the cause.
- Confirm the recorded 3D suitability decision for every substantial surface. When the gate failed, verify the surface does not mount a WebGL canvas, run an initialization probe, or request a 3D chunk. The required 2D Canvas layer remains independent.
- When WebGL/3D was adopted, exercise unsupported/initialization/resource/context-loss fallback and confirm equivalent semantic controls remain.
- For adopted R3F/Three.js, inspect rendering cost on the declared targets; include phone/tablet only when supported: device-pixel ratio, model/texture loading, draw calls or an equivalent profiler signal, hidden/offscreen pause, resize, and the actual static/DOM fallback.
- For every prominent adopted 3D scene, temporarily remove its label and judge the rendered subject, camera framing, depth, material response, lighting hierarchy, and motion. A generic primitive cluster, global auto-rotation, or color-only scene variant fails visual acceptance unless the page's content makes that exact treatment meaningful.
- Capture several animation phases and inspect the complete loop from more than one useful camera view. Fail accidental mesh interpenetration, self-intersection, z-fighting, coplanar flicker, near/far-plane clipping, or animated collisions. Allow deliberate joints, contact patches, and nested shells only when their structural intent is visually clear.
- Reject finished models that look like unrelated stock boxes, cylinders, spheres, or toruses pushed together. Primitive construction is acceptable for helpers, blocking, procedural systems, or an explicitly justified low-poly/technical language; the delivered subject still needs a coherent silhouette, believable joints, intentional scale/detail hierarchy, legible materials and lighting, and subject-specific motion.
- When authentic visualizable data exists, confirm one AntV-first or justified ECharts owner is actually rendered, uses real data, matches the interface tokens and tone, and remains readable and usable on the declared device targets. If visualization is absent, verify the recorded hard exemption names the inspected data/content surfaces and proves that creating a chart would fabricate data or meaning.
- Use Lighthouse or an equivalent performance/accessibility check when performance risk, public launch, or user requirements justify it. Record the tested build and environment; do not invent scores.

## Iteration loop

1. Render and wait for the real settled state.
2. Capture screenshots, computed evidence, console/network output, and interaction results.
3. Classify issues by user impact, not cosmetic convenience.
4. Run the removal test on every newly added visible region: if removing it changes no product meaning and only hides a library, treat it as filler.
5. Run the control test: if the user has no reason to manipulate an effect, remove its library-shaped controls and handle ambient motion through bounded behavior, system preferences, visibility, and context-appropriate accessibility mechanisms.
6. Fix the shared token/layout/component cause when several screens exhibit the same defect. Shared lifecycle code is useful; a shared composed preview/page component may itself be the defect.
7. For multi-page work, compare routes and preview interiors side by side after each major pass; fix repeated section order, overlay coordinates, signature placement, and motion grammar before polishing individual colors or effects.
8. For each primary motion under test, observe the normal-speed sequence as well as two or more meaningful visible phases. Check continuity of the subject, coherent emphasis and control states, completion, and interruption where affected. An invisible element's coordinates compared with its final position do not prove visible travel; separate fades or smooth wheel scrolling do not prove a coherent transition. A GSAP import, RAF, CSS keyframe, or shared reveal selector alone does not pass. In reduced-motion mode, preserve the user's content and state in a stable completion. If only code or still images were inspected, report dynamic feel as unverified.
9. Compare product behavior as well as composition: confirm that work routes use different task-appropriate structures and each completes its declared loop, while expressive routes are not padded with fake controls or data.
10. Rebuild only when the tested artifact changed; rerun the affected cases and any nearby regression tied to the changed shared behavior.
11. Stop when relevant checks resolve the scoped risks. If a subjective rejection remains and different interpretations would change the revision, use [feedback clarification](feedback-clarification.md) rather than rerunning functional checks or guessing another visual treatment. Document remaining limitations and pending user acceptance without calling them a pass; do not repeat checks merely to seek certainty.

Never accept the first render simply because it loads.

## Acceptance record

Use the handoff in `../SKILL.md` as the single acceptance summary. Identify the actual build/entry, browser, sizes, actions, observed results, and untested scope. Reference existing selection, provenance, exemption, and design-variety decisions instead of duplicating them here. Link screenshots only when useful artifacts were retained; do not create a full evidence package by default.

Separate implementation, scoped verification, and normal-entry adoption when they differ. For example: “The candidate now preserves readable video and waveform at the checked viewport; the selection/save flow passed there. The normal entry still serves the prior build and has not been switched.” Use that wording only for actions actually observed; if only code or static checks were reviewed, say so. Do not call the whole experience accepted while a known core-task defect remains, even if the particular script passed.

For Skill repairs, distinguish **instructions changed**, **an executor followed the changed decision**, and **the user's resulting design problem resolved**. A clean diff or a successful cold-context scenario establishes only its actual scope; it does not establish universal compliance across models/hosts or aesthetic acceptance. Do not turn a text requirement into a claim of a host-enforced gate. Report host enforcement only when the actual adapter prevents the affected continuation/delivery and that behavior was tested; absent that mechanism, the rule is an Agent instruction.

Static checks such as `scripts/frontend_preflight.py` are useful triage, but browser evidence is authoritative for computed layout, font loading, interaction, and network behavior.
