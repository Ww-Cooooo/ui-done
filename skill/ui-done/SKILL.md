---
name: ui-done
metadata:
  version: "2026.11.18"
description: "Design, build, redesign, review, research, debug, or package frontend/UI work. Applies to websites, React apps, dashboards, working tools, portfolios, and offline boards, including frontend scope discovered mid-task or introduced by an authorized delegation. Compose the whole experience through visible choices and integrated samples using the required React design stack; keep governing the work through handoff."
---

# UI Done

## 门（机械执行，缺了就是没执行本技能）

**First lines** (on their own):

`ui-done ｜ tier: A-panel|B-workspace|C-expressive ｜ phase: direction|selection|build|verify ｜ user has chosen: <option or "none">`

When modifying an existing UI (`build` or repair), add immediately on line 2:

`preserved: <comma-separated existing inputs, gestures/wheel/drag, data contracts, outputs & routes that MUST survive>`

Every phase ships real output; none means "wait":
- `direction` → 2–3 structurally distinct directions + 1 recommendation, with real content & target viewport fit.
- `selection` → 1 integrated key-page sample with open layer alternatives visible inside it.
- `build` → agreed scope with `preserved:` contracts intact and `scripts/frontend_preflight.py` checked.
- `verify` → real rendered entry inspection separating verified facts from unverified runtime axes.

If `user has chosen` is `none`, do **not** enter `build` or `verify` unless a specific defect repair or explicit autonomous-delivery waiver applies. Close every turn with:

`ui-done ｜ verified on: <actual entry/URL @ viewport(s)>`
`ui-done ｜ unverified runtime: <VoiceOver/keyboard/narrow-drag/offline/persistence not tested, or "none">`

A missing header/footer line, silent drop of a `preserved:` item, or a false `"none"` in `unverified runtime` → task failed; redo before reporting completion.

## Proactive UX initiative（主动能动性，不等逐项催促）

Act as a **senior UX architect + builder**, not a passive CSS contractor. Consult [UX craft playbook](references/ux-craft-playbook.md) proactively without waiting for the user to name terms:

1. **Think Two Steps Upstream Before Coding**: Identify *Who acts*, *Decision pressure ("find/operate" vs "browse/discover")*, and the **leading UX metric** (completion, error rate, calibration, decision time) vs lagging revenue metrics. If a brief or existing screen hides a **P0 UX trap**—missing downstream reviewer loop, lax `Skip` inflating fake completion, dangerous pre-selected risky default, `>15` items in a plain select or `<7` hidden inside a dropdown, dead `"No recent activity"` column, or uncalibrated black-box AI score—**call it out concisely in 1–2 lines with a better interaction fix** before building the wrong thing. (On crisp unambiguous small fixes, execute directly and surface any remaining P0 trap as a short non-blocking suggestion—never hijack minor repairs into bloated interviews.)
2. **Self-Assign MLP Craft & First-Run Readiness**: Replace blank voids with **pre-charged ready states**, dynamic `Guide & Live Preview`, blur inline error healing, non-blocking background pills (rather than modal interruptions during focused tasks), and human-unit translations (`340 km`, not just raw `%`). Distinguish **First-Run vs Returning** module order, **PLG (`Start Free`) vs SLG (`Request Demo`)**, and **Paywall triggers + annual savings + `Cancel anytime`**. Keep *Requested Baseline* distinct from *Proactive UX Upgrades* so the user controls scope.
3. **Apply AI-Native & Optical Precision Unprompted**: On AI/Agent flows proactively build **interval + confidence + `<10s` inline calibration**, **editable checklist/countdown or Stop/Undo gates**, **clickable `[Cite-N]` anchors**, **in-situ click/box context** over distant chat prompts, buffered streaming renders, and honest AI labels. Keep narrow rails from splitting IDs/codes mid-word (`_UI / D88...`), use `dot + cone` markers instead of photos on maps/canvases, fill bridges vs tint internal icons, and add 1 earned tactile micro-delight (`≤0.1s` / perceptual progress).
4. **Prevent Drift Across Turns**: On multi-screen or iterative apps, centralize tokens/radii/type ramps + compact `Change History` alongside React/AntD tokens; self-contain single-file HTML previews.
5. **Run Stranger Critic-Eyes Before Delivery**: Before closing, audit screenshots & live DOM like a confused first-time visitor (*5s hero/task clarity? P0 broken loop? clipped toast? mid-token wrap? decorative icon polluting ARIA?*) and fix P0/P1 findings autonomously first.

## Choose the next move before building

Read this entry completely before governing any frontend step (retrieve truncated output before proceeding; never bulk-load all references on small fixes). After compaction or handoff, re-read this entry and recover `brief` + `preserved:` contracts.

| Current evidence | Next user-visible move | Where this turn stops |
|---|---|---|
| Overall rejection; desired replacement unclear | Route to `get-clear` (fallback: [feedback clarification](references/feedback-clarification.md)) with current screen/references; keep edits pending until report acceptance. | At the question distinguishing the open choice. |
| New page / substantial redesign; no direction chosen | Show 2–3 comparable directions with real content & recommendation ([layered selection](references/layered-design-selection.md#choice-checkpoints)). | At the user's working-direction choice. |
| Direction selected; layout/UI/data/motion choices open | Build 1 integrated sample exposing unresolved choices inside real content & playable motion. | At that combined choice; do not expand dependent code silently. |
| Integrated design confirmed | Implement agreed scope while honoring `preserved:` contracts and tier capability rules. | At delivered scope + verified/unverified report. |
| Explicit batch or autonomous delivery request | Produce the requested batch/delivery internally keeping quality, tier stack, and parity gates; mark taste assumptions. | At the requested deliverable; never extend waiver after later rejection. |
| Specific defect repair, Tier-A fix, review-only, or settled layer | Inspect affected state, fix/review within scope; no unsolicited whole-page redesign or 5-source ceremony. | At the repaired/reviewed entry. |

“Start,” “redo it,” or “both need changing” define scope, not permission to guess an unchosen direction. When asking a choice, end the turn.

## Surface tiers and capability contract

Classify **Role × Decision Pressure × Viewport** before assigning stacks or density:

| Tier | Surface class & target viewports | Structural & UX priority | Required vs conditional capabilities |
|---|---|---|---|
| **A-panel** | Plugin sidebar, IDE drawer, compact utility (`≤520px` or alongside another app). Test **`360–420px` narrow stack AND `640–960px` wide split**. | **Quiet toolbox (`90%` recognizable standards + `10%` anchor distinction)**. Protect existing `preserved:` controls; keep primary actions & anchor visible without 3× shrinking. | Keep React + primary UI owner, self-hosted fonts (`font-and-asset-packaging.md`), ≤0.1s micro-feedback, `frontend_preflight.py`, container reflow. **Exempt** Lenis, 2D Canvas, 3D/WebGL, marketing 5-source/Demo Hub theater unless the view actually owns real scroll/data objects. |
| **B-workspace** | Standalone web app, SaaS console, analytics/review workspace. Test **`1440×900` & `1366×768`** (+ narrow/mobile if contracted). | **High-pressure global visibility**: `80/20` front-loading, `System 1` scannable numbers, physically stable tool positions, real downstream/repair loops, zero dead `"No recent activity"` panels. | Full 8-row stack governed by [selection scorecard](references/selection-scorecard.md). Charts/Canvas require authentic data/objects; GSAP matches workspace relationships without competing with controls. |
| **C-expressive** | Landing page, product launch, showcase, portfolio. Test **`1440×900`, `1366×768`** (+ `390×844` if public/mobile). | Answer **`Category + Concrete Value + Real Proof + Low-Risk CTA`** within 5s (no abstract gradient + giant mascot + AI buzzwords). `3–5` genuine structural models on concept batches. | Full 8-row stack + mandatory **5-source creative pass** (`open-source-ui-sources.md`) + **GSAP Demo Hub/Showcase** check (`motion-scroll-and-3d.md`). |

**Eight-row stack baseline** (details & hard gates in [selection scorecard](references/selection-scorecard.md)): React + **Ant Design** (or approved existing React owner); open-source self-hosted **fonts** + 1 icon family; **GSAP + `@gsap/react`** primary motion; **Lenis** (`lenis/react`) when a real scroll path exists; **Pts/Fabric** 2D Canvas when programmed/editable drawing exists; **AntV** first (or ECharts) for authentic visualizable data; framework-native **performance**; strict 4-gate **conditional 3D** (omit silently cleanly if any gate fails). Preference, schedule, or "native is enough" never waive a row genuinely required by the active tier and data.

## Non-negotiable boundaries & UX craft floor

- **Scope & Safety**: Review-only does not edit. Never overwrite `preserved:` features, user edits, real datasets, coordinates, or persistence. Default to the declared Tier viewport (`360–420px` + `1440×900` for Tier A; `1440×900` for desktop B/C); add phone/tablet when product context or user contract requires it. Never invent datasets, copy, metrics, secrets, or alter unrelated global host configs, dependencies, git history, or external deployments during ordinary UI tasks. Inspect real local assets; package fonts/assets locally for `file://`/offline targets, and preserve upstream license notices (`THIRD_PARTY_NOTICES.md` / license files) when adopting code.
- **Grayscale & Lighting (`2-3-4`)**: Limit each surface mode to `≤3` container grays and `≤4` text grays; tint neutral grays slightly and keep Light/Dark independent. Dark mode follows **top-lit physical depth** (elevated groups are lighter—never mechanically invert light tokens).
- **Proportional Scale & Optical Rhythm**: Use geometric type steps (`≥1.25×` between hierarchy levels) and Gestalt spacing (`outer gap ≥ 3× inner gap`). Chinese reading width `35–45` chars (`1.5–1.75` line-height); `tabular-nums` on dynamic metrics. **Never "fill whitespace" by inflating font sizes, plastering heavy card shadows, or pinning corner logos.**
- **Optical & Control Geometry**: Single-line buttons `padding-inline > padding-block`; paired button gaps `≈ 1×` text height; concentric inner radii (`outer - padding`); optically align asymmetric icons/marks; `≤1–2` solid primary CTAs per view (0 red badges on primary CTA; never render twin equal-weight hero/gold CTA cards); `<7` choices flat buttons/chips, `>15` searchable dropdown, fixed known formats (date/age) direct input; `Menu` (instant) vs `Sheet` (submit form, never reverse-open); Pagination for task completion, Infinite Scroll only for continuous feed dwell; category-scan icons left, explicit-verb menus text-left.
- **Anti-Fake-UI, Copy & Agentic Guardrails**: Invoke `text-polish` mindset on every user-facing label, CTA, empty state, and error. Ban raw dev codes (`Mode A`), vague sequence buttons (`继续下一轮`), bare `Submit`, `"No recent activity"`, fake progress/simulated audio bars, and permissive `Skip` on unverified setup. Validate errors inline on blur with empathetic recovery hints; remove pre-selected defaults on high-error choices; on AI flows expose uncertainty ranges + `<10s` inline calibration, editable pre-run plan + non-blocking countdown or Stop/Undo gates, and clickable citations.
- **Accessibility**: Every icon-only button needs `aria-label`/accessible text; low-consensus icons keep visible labels; strip decorative nodes from reader order.

## 5-step execution workflow

1. **Brief & Parity Lock**: Clarify audience, role × pressure, Tier (`A/B/C`), real content, target containers, and list `preserved:` contracts before editing existing code. Route unclear dissatisfaction to [feedback clarification](references/feedback-clarification.md) / `get-clear`.
2. **Structure & Character Together**: Read [page composition](references/page-composition.md) before locking layout (applying `distinct-works-not-theme-variants` on intentionally varied sets). Start from content/task topology (never a stock card wall). For Tier B/C new designs, check [open-source UI sources](references/open-source-ui-sources.md) prioritizing **live shipped product flows** over Hero-only Dribbble concept shots. Show opening + one ordinary action state at target viewport(s).
3. **Integrated Sample & Stack Record**: For Tier B/C redesigns, prove structure, type, controls, real chart/Canvas data, and primary transition together in [one key-page sample](references/layered-design-selection.md#build-one-integrated-key-page-sample) with one compact [scorecard record](references/selection-scorecard.md).
4. **Implement Cleanly**: Read applicable owners ([React stack](references/react-application-stack.md), [fonts/assets](references/font-and-asset-packaging.md), [motion/scroll/3D](references/motion-scroll-and-3d.md), [motion vocabulary](references/motion-vocabulary.md)) when touching those layers. Centralize shared style tokens in a single source of truth; self-contain single-file HTML/inspector previews where needed.
5. **Verify & Close Honestly**: Read [visual QA](references/visual-qa.md). Run `python -X utf8 <skill>/scripts/frontend_preflight.py <target>` (pass `--offline` for single-file/`file://` and `--panel-max-width 420` for Tier A), then inspect **Declared vs Rendered** styles, overflow, contrast, real states, and `preserved:` parity in a live browser (`$webapp-testing` / CDP). Report verified behavior separately from user acceptance and explicitly populate `unverified runtime:`.

## Delegation and reference routing

Give makers the raw brief, Tier, `preserved:` lock, caveats, rejected artifacts, and this Skill path; keep clean-context trials free of development history/expected answers, let independent reviewers evaluate the whole experience against the raw goal (capable of rejecting the whole concept), and never replace parent inspection of the real entry with subagent self-certification. Read references **on demand only**:

| When needed | Reference |
|---|---|
| Upstream framing, role density, controls, copy/paywall/MLP, AI-UX, tokens & craft bounds | [ux-craft-playbook.md](references/ux-craft-playbook.md) |
| Direction comparison, layer checkpoints, scope shortcuts | [layered-design-selection.md](references/layered-design-selection.md) |
| Task skeleton, role density, card restraint, narrow reflow, optical rules | [page-composition.md](references/page-composition.md) |
| Clarifying rejection or vague feedback | [feedback-clarification.md](references/feedback-clarification.md) |
| Tier B/C 5-source pass & live-product reference discipline | [open-source-ui-sources.md](references/open-source-ui-sources.md) |
| Stack selection, exemptions, licenses | [selection-scorecard.md](references/selection-scorecard.md), [technology-scouting.md](references/technology-scouting.md), [source-library.md](references/source-library.md) |
| React tokens/routing/forms, local fonts, motion/Lenis/Canvas/3D | [react-application-stack.md](references/react-application-stack.md), [font-and-asset-packaging.md](references/font-and-asset-packaging.md), [motion-scroll-and-3d.md](references/motion-scroll-and-3d.md), [motion-vocabulary.md](references/motion-vocabulary.md) |
| QA matrix, Declared vs Rendered probe, honest acceptance | [visual-qa.md](references/visual-qa.md) |
| Companion skills & fallbacks | [capability-boundaries.md](references/capability-boundaries.md) |

Coordinate companion skills cleanly: `text-polish` (user copy/CTA/errors/empty states), `get-clear` (clarification), `frontend-design` / `design-taste-frontend` (Tier C direction), `ui-ux-pro-max` (Tier B dashboard specs), `web-access` (docs verification), `webapp-testing` (rendered browser checks). Never claim an unavailable companion ran.
