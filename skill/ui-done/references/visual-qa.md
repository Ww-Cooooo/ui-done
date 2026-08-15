# Visual QA

Visual acceptance is an iterative browser workflow, not a code review checkbox.

## Establish the test target

- Test the intended final mechanism: development server, production preview, hosted URL, checked-in built folder, single HTML, or direct `file://` entry.
- Build first when production transforms assets, routes, CSS, or chunking differently.
- Use `$webapp-testing` when available. Follow its server-helper and reconnaissance instructions; otherwise use available browser automation with equivalent evidence.
- Capture the baseline before a redesign and preserve the user's current state/diffs.

## Minimum viewport matrix

Use exact sizes appropriate to the product, including at least:

| Class | Suggested viewport | Purpose |
|---|---:|---|
| Desktop | 1440×900 | Full composition and wide navigation |
| Common laptop | 1366×768 or 1280×800 | Fold, fixed UI, short-height stress |
| Tablet | 768×1024 | Breakpoint and touch layout |
| Phone | 390×844 | Primary mobile experience |
| Narrow sanity check | 320×568 | Overflow and text resilience when supported |

Test portrait and landscape when orientation materially changes the product.

## Pages and states

Cover the home/entry page plus representative distinct routes. Exercise applicable states rather than only the happy path:

- Navigation, deep links, browser back/forward, search/filter, dialogs/drawers/menus, forms, and destructive confirmation.
- Empty, loading, success, validation error, request error/timeout, offline, disabled, and permission-limited states.
- Long Chinese/English text, unbroken paths/IDs, large numbers, missing optional fields, many/few items, and realistic data.
- Hover, focus, pressed, selected, expanded, drag/touch, and keyboard-only operation.
- Normal motion, reduced motion, and advanced-visual fallback.

Do not manufacture irrelevant states, but do not skip states the implementation exposes.

## Visual and computed-style checks

- Inspect full-page and focused screenshots, not just DOM structure.
- Check hierarchy, alignment, spacing rhythm, color/contrast, radius/elevation consistency, icon alignment, image quality, and the intended signature element.
- Look for library-proof content: sections, cards, labels, controls, scenes, or datasets that exist only to show a dependency was used. Remove them or shrink the capability into an existing region as a context-aligned accent.
- For every visible enhancement, identify its existing host and product meaning. If either answer is vague, treat the placement as arbitrary even when the colors and spacing match.
- Temporarily disregard scene names and explanatory labels. If the effect becomes incomprehensible without a label invented for it, the label is compensating for weak integration rather than describing product content.
- Inspect controls as product features. Reject repeated generic pause, reset, rotate, speed, or view toolbars across unrelated pages unless each control has a page-specific task or accessibility rationale.
- On phone layouts, check whether decorative controls enter the reading order, cover meaningful imagery, or become more prominent than the content they supposedly support.
- Enumerate visible text and inspect computed `font-size`, `line-height`, `font-family`, overflow, and truncation. Treat 11px as a floor reserved for short low-priority metadata; keep labels/card copy around 13px+, controls around 14px+, and continuous body copy around 15–16px+ unless the product has a justified accessible scale.
- Verify the intended fonts truly loaded with computed styles and `document.fonts`; detect fallback or missing glyphs.
- Check headings and real long content at each viewport. Prefer wrapping/reflow over silent clipping.
- Detect horizontal overflow by comparing document/element scroll widths with viewport/client widths.
- Confirm sticky/fixed headers, rails, bottom navigation, cookie bars, and CTA bars do not cover the first or final content.
- Ensure touch targets are approximately 44×44 CSS px or larger and visible focus is not clipped.

## Runtime checks

- Capture console errors/warnings, uncaught page errors, failed responses, CSP violations, and hydration/render errors.
- Inspect runtime requests. For offline/portable artifacts, fail any required remote font, script, style, image, model, data, or telemetry request.
- Reload and navigate directly to supported routes. For `file://`, open the actual entry without a server and test relative paths.
- Confirm images/media reserve dimensions, font loading does not cause damaging layout shift, and heavy features load lazily when appropriate.
- Exercise reduced-motion emulation and verify automatic motion, smooth scrolling, parallax, loops, and scroll pinning collapse safely.
- For Canvas/WebGL/3D, exercise unsupported/initialization/resource/context-loss fallback and confirm equivalent semantic controls remain.
- Use Lighthouse or an equivalent performance/accessibility check when performance risk, public launch, or user requirements justify it. Record the tested build and environment; do not invent scores.

## Iteration loop

1. Render and wait for the real settled state.
2. Capture screenshots, computed evidence, console/network output, and interaction results.
3. Classify issues by user impact, not cosmetic convenience.
4. Run the removal test on every newly added visible region: if removing it changes no product meaning and only hides a library, treat it as filler.
5. Run the control test: if the user has no reason to manipulate an effect, remove its library-shaped controls and handle ambient motion through bounded behavior, system preferences, visibility, and context-appropriate accessibility mechanisms.
6. Fix the shared token/layout/component cause when several screens exhibit the same defect. Shared lifecycle code is useful; repeated public UI can still be the defect.
7. Rebuild if needed and rerun every affected viewport/state plus a nearby regression case.
8. Repeat until no material issue remains or an explicit limitation is documented.

Never accept the first render simply because it loads.

## Acceptance record

Report a compact matrix containing:

- Build/entry mechanism and browser engine/version actually used.
- Viewports, routes, states, and interaction paths tested.
- Screenshot locations when artifacts are retained.
- Host, meaning, and control decisions for visible motion, scroll, Canvas, 3D, and visualization layers.
- Font loading, external requests, console/page errors, overflow, focus/touch, reduced-motion, and fallback results.
- Performance/accessibility tool results only when actually run.
- Fixes made after screenshot review and the checks rerun.
- Untested browsers/devices and remaining limitations.

Static checks such as `scripts/frontend_preflight.py` are useful triage, but browser evidence is authoritative for computed layout, font loading, interaction, and network behavior.
