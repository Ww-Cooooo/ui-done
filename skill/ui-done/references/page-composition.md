# Page Composition and Integrated Experience

Use this guide for a new page or material redesign, or when a review finds fragmented content, poor task-space allocation, or enhancements that are technically present but do not improve the experience. It works without the development conversation or the private projects that exposed these problems. Isolated copy/color repairs do not need a new composition exercise.

`../SKILL.md` owns required capabilities and exemptions. This guide explains how to compose them into a page; it does not make React, the primary UI system, typography, GSAP, or other default categories optional. `visual-qa.md` owns verification scope. The examples below illustrate decisions, not fixed templates, required dimensions, or new features to add to every product.

## Contents

- [Start from a task and its relationships](#start-from-a-task-and-its-relationships)
- [Choose a structure that expresses those relationships](#choose-a-structure-that-expresses-those-relationships)
- [Group without turning everything into a card](#group-without-turning-everything-into-a-card)
- [Repair a rejected layout family](#repair-a-rejected-layout-family)
- [Allocate usable space across modes](#allocate-usable-space-across-modes)
- [Integrate capabilities without token adoption](#integrate-capabilities-without-token-adoption)
- [Worked example: a media review workspace](#worked-example-a-media-review-workspace)
- [Methods learned from primary design sources](#methods-learned-from-primary-design-sources)

## Start from a task and its relationships

A page skeleton is the arrangement of content, navigation, controls, and working space, including how that arrangement changes during use. It is not a loading placeholder or an application framework. Begin with the user's actual content, not a menu of hero, statistics, cards, chart, and form components.

Resolve these questions in the existing design read; no separate document is required:

- What is the user primarily reading, comparing, deciding, or changing? A report, a selected order, a photograph, and a story need different amounts and kinds of space.
- Which information belongs to that same object? Which items must be compared simultaneously, share a time/space coordinate, or remain visible during an action?
- What is the useful sequence? For example, find a record, inspect its evidence, change its status, and continue from the same position. Do not add steps to make the page look substantial.
- Which context may recede? Global navigation and occasional settings need not compete with the work. Do not hide evidence or controls needed at the current step just to obtain a clean screenshot.
- Which real modes change these answers? Audio versus video, reading versus editing, and overview versus close comparison may need different allocations while retaining selection, drafts, and familiar control meanings.

For example: “A reviewer selects a spoken line, sees the matching video frame and time range, writes a note, then continues at that position.” This determines coordination between regions. “A dashboard with five stylish panels” specifies containers but explains none of those relationships.

## Choose a structure that expresses those relationships

Consider structures by what they let the user do. These are alternatives to reason about, not a required set, a layout picker, or six reusable page shells:

| Content relationship | Useful structural direction | What must stay coherent | Common misuse |
|---|---|---|---|
| One object with several tools | A continuous working surface with nearby controls and contextual inspection | Selection, object visibility, and tool feedback | Making player, settings, annotations, and status equally prominent cards |
| Many records, one active record | A list/table with in-place detail or a dedicated detail view when space requires it | Active record, filters, scroll position, and a clear return path | A permanent three-column shell regardless of content or available width |
| A genuine comparison | Aligned rows, shared axes, synchronized views, or a justified before/after treatment | Matching fields, units, time, and object identity | Separate attractive cards that require remembering values or compare unrelated assets |
| Time, geography, or spatial relationships | A timeline, calendar, map, or canvas as the working surface | One coordinate system and a clear connection to selected details | Hiding the relationship inside summary cards and treating the real view as decoration |
| A developing argument or story | Continuous editorial reading, steps, or a persistent visual that changes with the explanation | Reading order, state continuity, and understandable backward navigation | Making each sentence a new block, or pinning the entire page because a demo did so |
| Independent items to browse | Cards, tiles, a catalog, or a real Kanban board | Item identity, comparable metadata, and meaningful grouping | Treating every fact about one item as a separate independent item |

Keep useful consistency within a product: the same action should retain its meaning, and navigation should not move merely to appear novel. The stricter distinctness rules in `SKILL.md` apply when a collection is explicitly meant to demonstrate different designs. They do not require every screen of an ordinary application to invent a new navigation system.

## Group without turning everything into a card

The “sticky notes on a wall” failure occurs when each function gets its own background, title, padding, rounded outline, and similar visual weight. The page may be tidy, but the user cannot tell what matters or which pieces belong together. This describes the rendered composition, not a component name: several large custom `div` panels can reproduce the same problem without using a single `Card`. React componentization and Ant Design use do not require this visual fragmentation; reuse their controls without automatically enclosing each function.

Start with alignment, proximity, typographic hierarchy, common background, and a shared coordinate system. Add a boundary when it communicates independent identity, a distinct action context, a necessary scroll region, or meaningful contrast. A task card on a Kanban board has an independent identity; the playback button, timecode, and volume control for one player usually belong to one control group.

Neither removing every border nor giving each box a different shape fixes a weak hierarchy. A card-based catalog can be excellent, and an unboxed page can still be an undifferentiated wall. Ask whether the main task is perceptibly dominant and related information is read together, not whether the card count is below an arbitrary limit.

Use visual contrast intentionally: one working area can be broad and dense while secondary metadata is compact. Do not enlarge empty space or a decorative heading at the expense of readable task content. Rich illustration, expressive typography, and atmosphere remain valid when they express the actual subject rather than competing with it.

## Repair a rejected layout family

Use this check when the user rejects the page's structure, such as a card wall, permanent left/center/right panels, or a repeated brochure sequence. It is not a new approval ceremony for every UI edit, nor a universal ban on cards or columns.

Translate clear feedback into a visible rejection signature in the existing brief. For example: “Three full-height islands, each with its own heading and enclosure; a permanent opinion form has comparable prominence to the object being reviewed.” If “make it professional” or “reduce AI feel” still permits materially different changes, use [feedback clarification](feedback-clarification.md) before inventing that signature. Carry confirmed requirements into authorized delegation. For an independent trial, pass the real user requirement without supplying the expected solution or the development discussion.

Separate the preservation boundary from the design starting point. Real content, saved work, accurate coordinates, permissions, and required functions survive; an authorized full overhaul may replace layout, proportions, control grouping, visual language, and interaction presentation. Reuse useful data/state logic without letting the previous component tree dictate the screen. A smaller code diff is not a design objective. Conversely, a targeted repair is not permission to rewrite an unrelated product.

Before polishing, compare a simple unstyled outline of the rejected structure with the proposed one. Prose, a small sketch, or an early rendered skeleton is enough; no new document or tooling is required. Identify the dominant task object, the information needed alongside it, the main movement through the page, and where an action changes the working context. Change the relationships responsible for the rejection: for instance, move occasional editing out of a permanently reserved column and attach it to the selected object. Do not merely change three small cards into three larger ones, rename cards as workspaces, alter their widths, square their corners, or remove their shadows.

Check the first rendered composition before spending time on fine styling. Set aside colors, labels, imagery, and animation: can it still be described by the rejected arrangement of masses and enclosed regions? If so, the structural repair has not happened. Compare the relevant ordinary action state too. A clean opening screen that reveals the same fragmented layout when an opinion form opens has not resolved the task. Fix that relationship before further polish; do not require the user to repeat the objection. Passing this structural check is only a floor, not proof that the new direction is attractive or distinctive.

For a full overhaul or repeated rejection of the overall experience, develop a representative working sequence before extending the design across the product: entry or inspection, the central action, its visible outcome, and continuation. Use representative real content and existing behavior; build it inside the authorized candidate, not as a second application or fake-success demo. Include the proposed typography, hierarchy, spatial transitions, and primary motion together. Compare alternative directions only where a material choice is unresolved, and keep technical work outside that choice moving. This is a focused design checkpoint, not a new approval ceremony or a demand to prototype every minor edit.

Research should support a positive design decision, not only explain why effects were rejected. Use relevant whole-experience evidence from the existing research pass to explain the composition or interaction relationship being adopted, adapted, or deliberately replaced. Button and animation-API demos alone do not settle a workspace's spatial design. If that evidence is missing, investigate the actual gap instead of repeating the entire source checklist; do not copy a reference layout or add a new fixed website quota.

Keep function and composition as separate judgments. Shared selection, synchronized timecodes, a passing save flow, and a larger player are valuable, but they do not prove that a card wall became an integrated workspace. Conversely, hiding required evidence or shrinking the actual media to achieve a cleaner silhouette is not success. Preserve readable content and action context while changing the composition.

**Counterexample and repair.** A review tool is criticized for looking like cards stuck on a wall. Giving video, transcript, waveform, and a permanent opinion form separate tall panels preserves that fragmentation even if all timecodes agree. Moving the timeline below a borderless monitoring surface may remove the card wall, but can still fail: a tall bottom track reduces the actual portrait frame while leaving wide empty margins. A transcript-led surface may suit text review but force unnecessary context switching during detailed image inspection. Neither arrangement is the prescribed answer. Compare the actual content size and review sequence at the same viewport, including the editing state. While writing, keep the selected evidence and time range clear; after saving, retain position and a recognizable continuation. Choose the composition from those tradeoffs and the confirmed visual direction, not by reproducing this example's regions.

A persistent inspector can remain appropriate when simultaneous comparison genuinely requires it. Independent records, catalogs, and Kanban items can still use cards. The test is whether the requested structural change is visible and the real task still works, not a numeric limit on boxes. Do not replace the rejected structure with a new all-purpose full-screen stage or a compulsory hidden sidebar.

## Allocate usable space across modes

Judge the displayed object, not just its outer container. A tall video fitted inside a wide, shallow player will remain narrow even when the surrounding panel is huge. With contain-style fitting, displayed width is limited by both container width and container height multiplied by the media aspect ratio. Extra horizontal space alone cannot solve insufficient height; cropping is not a fix when review requires seeing the complete frame.

For a bounded workspace, consider headers, controls, the main object, supporting regions, and the available viewport together. Enlarging one row consumes another row's budget. Choose proportions and minimum usable sizes from representative content and the actual task, not a universal pixel constant or a fixed “two-thirds main” rule. A minimum CSS height proves an allocation exists, not that subtitles, fine detail, labels, or editing controls are usable.

When content or mode changes, reclaim space that no longer serves the task. An audio-only mode may prioritize waveform, transcript, and notes instead of retaining a video-sized panel for a slogan. A portrait-video mode may move or reshape supporting regions to preserve frame detail. Keep primary actions available, preserve state during the change, and make the mode understandable. Do not automatically implement a new mode if the product does not need one.

Resizable panels and contextual disclosure can help, but the initial layout must already work. Do not require the user to discover a splitter before the primary task becomes possible. On a smaller screen, use an explicit focus/detail transition when simultaneous views cease to work; stacking every desktop region is not the only option. Avoid hiding necessary comparison information behind tabs just to fit more regions.

## Integrate capabilities without token adoption

Keep these answers in the existing inclusion plan, not in a second report:

1. **Host:** Which existing product object, content, dataset, state, interaction, or established visual motif owns the enhancement?
2. **Meaning:** What will the user understand, accomplish, notice, or feel because it is present? “More premium” is not specific; “the selected line and its time range remain visibly linked while the reviewer seeks” is.
3. **Control:** Does direct manipulation serve a real task or accessibility need? Do not expose reset, speed, rotate, pause, or view controls merely because a demo has them.
4. **Observable result:** In which ordinary state or action will that contribution be apparent? Define the result in product terms rather than import count, library names, or animation duration.

Choose a footprint that retains that result:

- **Structural:** powers an existing workflow or real data view, such as a chart that exposes a meaningful comparison.
- **Behavioral:** improves a transition, feedback loop, navigation path, or scroll path without adding content.
- **Accent:** gives an existing region a subject-specific visual character without inventing meaning or stealing task space. For example, a restrained material texture may reinforce an established print/publication direction; unexplained particles added to a review player only to host Canvas do not establish the same fit.
- **Infrastructure:** improves loading, rendering, packaging, measurement, or maintenance without needing a visible demonstration. State the actual gain or diagnostic purpose; invisibility alone is not a benefit.

The smallest honest footprint is the smallest one that still delivers the declared result, not a direction to minimize visible ambition. “Restrained” describes a deliberate hierarchy and finish; it does not justify default styling or nearly imperceptible effects when the brief calls for a distinctive experience. If a newly added region only advertises its implementation, remove that region and redesign the integration. Shrinking a meaningless effect into a corner does not cure it. This rejects the proposed role, not the required category: actively find a useful role or permitted compatible owner, use only the existing hard-exemption paths, and surface a genuinely unresolved conflict rather than claiming completion. True 3D separately stops when its suitability gate fails.

**Counterexample: a technically real but questionable chart.** An interval strip may use authentic transcript times and a real chart library while separate DOM controls perform all selection. That is real use, not fabricated data, but it does not by itself explain the library's contribution. Ask what the visual lets the user distinguish at its actual size, whether timing/selection is coherent, and which useful rendering or interaction responsibility the owner carries. A compact strip can be appropriate; making it large to advertise the dependency is not the solution. Compare roles and compatible implementations using the existing selection rules. Preserve truthful interval visualization and click-to-seek behavior rather than deleting the capability to reduce dependencies.

Treat cost evidence precisely. An unusually large output chunk warrants checking imports, splitting, and the assigned responsibility. Uncompressed bytes are not measured download, parse, memory, or interaction delay; lazy loading is not proof of zero cost. Use an existing build report or a focused measurement when cost could change the decision, not a new performance campaign for every small component.

**Counterexample: motion present is not a redesign completed.** A brief selection highlight can be excellent feedback; it may be exactly the right motion for a dense workspace. It cannot fix an unreadable primary object or disjointed editing flow. Conversely, do not dismiss quiet feedback and add a dramatic entrance merely to prove GSAP use. Compose motion around the meaningful relationship: selecting a line may update the frame, playhead, range emphasis, and contextual note target while keeping controls stable. Judge that visible result, not the number or duration of tweens. `motion-scroll-and-3d.md` owns implementation, ownership, and reduced-motion rules.

## Worked example: a media review workspace

**Situation.** A user reviews a rough cut, finds a problem through playback or transcript, optionally marks time and image regions, writes a note, saves it, and continues. The same product supports audio-only media. The waveform must reveal pauses and changes in loudness, while the complete video frame must remain readable enough to review subtitles and visual detail.

**Tempting but incomplete fix.** Make a short waveform much taller inside the existing height-limited grid. The waveform now passes a height check, but the video row shrinks; portrait footage fits into a narrow strip, and fewer transcript lines remain visible. In audio mode the old player area becomes a large prompt. Every requested control exists and local interactions pass, yet the task is still awkward. Merely shrinking the waveform back sacrifices the original requirement rather than resolving the competition.

**A coherent design response.**

- Treat frame, transcript position, waveform cursor/range, and note target as views of the same selected media/time state, not independent decorated panels. Store or derive their coordinates consistently.
- Allocate the video-review view using real portrait and landscape material when both are supported. Reduce redundant chrome, move occasional settings out of the primary area, or change the relationship between player, transcript, and timeline when the available height cannot support the old arrangement. Choose among those options from the product's task; this is not a prescribed three-column layout.
- Give audio review its own useful emphasis: listening controls, sufficiently detailed waveform, readable transcript, and reachable notes. Keep a current spoken line if helpful, but do not reserve a large empty video placeholder or design slogan for it.
- Preserve the product's input semantics. In a player where a click seeks and range selection requires an explicit mode, make that mode visible and keep ordinary seeking predictable. Do not copy a demo's drag behavior and silently change the contract.
- Tie a selected transcript line to the matching time and frame. Keep the active line visible without repeatedly overriding a user who is manually browsing. After saving a note, preserve the relevant position and show the saved note or truthful save status in context; do not manufacture persistence.
- Use concise product copy. “Select a time range, then add a note” explains the next action; a large poetic instruction about listening does not replace the working area. A loading label remains truthful while work is pending and should not disguise a stalled state as ready.

**What would count as improvement.** At the affected viewport and mode, a reviewer can read the actual frame or transcript, identify a meaningful audio interval, reach the associated note action, and continue after saving without losing position. If a size adjustment improves the waveform but makes subtitles unreadable, the result still fails. These are task-based observations, not universal minimum-pixel rules. For the scoped test sequence and candidate-versus-normal-entry distinction, use `visual-qa.md`.

**Limits.** This case does not establish that one library caused slowness, that all workspaces should share this arrangement, or that subtle motion is inadequate. Keep real media safety, input, persistence, and accessibility contracts. It explains a relationship failure, not a reason to rebuild unrelated backend or media-processing code.

## Methods learned from primary design sources

The following sources were reviewed on 2026-09-29. These are bounded design lessons, not a claim of full usability testing or instructions to install the source products' stacks. The explanations here remain usable offline; the links preserve provenance and let an Agent inspect relevant examples when research is needed. They supplement, not replace or expand into another fixed quota beside, the five-source pass in `open-source-ui-sources.md`.

### Linear: quiet structure and stable orientation

[Original design-team explanation](https://linear.app/now/behind-the-latest-design-refresh).

The team describes reducing accumulated visual separators and allowing navigation to recede after the user reaches the working area. Structure remains, but every boundary no longer demands attention. Apply this by grouping related controls and preserving recognizable action locations while reducing unnecessary enclosure. Do not copy its dark palette or infer that all separators, labels, or sidebars are bad; the aim is readable priority, not an empty interface.

### IBM Carbon: hierarchy within a grid

[Grid usage and contrast examples](https://carbondesignsystem.com/elements/2x-grid/usage/) and [spacing guidance](https://carbondesignsystem.com/elements/spacing/overview/).

Carbon contrasts technically aligned content at similar scales with information grouped into a clearer hierarchy. Its improved example still uses containers: removing boxes alone is not the lesson. Apply alignment and spacing to express relationships, then allocate different prominence to different information. Dense product work can be appropriate. Do not import a fixed column count, spacing token set, or Carbon component system merely because its design explanation is useful.

### Frame.io: several views of the selected object

[Official panel overview](https://help.frame.io/en/articles/9101032-panel-overview).

The documented navigation, viewer, and detail panels let people inspect a selected asset while adjusting visible context and density. The transferable mechanism is retained selection and coordinated views, with supporting regions adaptable to the task. This was documentation evidence, not a logged-in product trial. Do not turn its panel arrangement into the default wireframe for every work surface or assume that resizability excuses a poor initial layout.

### The Pudding: structure follows the explanation

[Original guide to story structure](https://pudding.cool/process/how-to-make-dope-shit-part-3/).

The guide distinguishes stacked explanations, a visual that evolves through scrolling, and step-based progression; it does not present one universal template. Apply that choice to what a reader needs to understand: a complex relationship may benefit from seeing the same object change rather than repeatedly reorienting to new charts. Do not force pinned scrolling into ordinary tools, obscure essential information before an animation, or forget reverse navigation and reduced motion.

### Stripe Press: the subject becomes the composition

[The original designer's account of the 2021 project](https://yuinchien.com/p/stripe-press).

The designer describes translating the physical qualities of books into a digital presentation of their spines and covers. The lesson is to let the actual product shape the experience rather than append an unrelated effect to a generic layout. This is a historical design case, not a verified current interaction test. It does not make 3D mandatory: UI Done's spatial suitability and finish-quality gates still apply, and source images/code require their own permission before reuse.
