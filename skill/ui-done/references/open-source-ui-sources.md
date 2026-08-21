# Open-Source UI Sources

Use these routes when a real interface gap matches them. They are not a sequence and do not need to appear together: Uiverse is a source of isolated interface elements, while Anime.js is a candidate animation owner.

The verified status below is a starting point, not permanent evidence. Before copying code or installing a package, use `$web-access` to recheck the official source, current API, exact license, dependencies, and maintenance state. Last verified: 2026-08-21.

## Shared intake contract

Before adoption:

1. Name the existing host, product meaning, and smallest honest footprint for the element or animation.
2. Confirm the target stack, delivery mode, public-source/redistribution plan, and existing component and motion owners.
3. Retrieve only from the official site, official repository, or official package registry. Do not use mirrors or copied snippets as licensing evidence.
4. Record the upstream name, component or package name, author when shown, source URL, exact license, retrieval date, and material dependencies.
5. Copy or install only what the selected role needs. Do not import demo copy, fake data, unrelated controls, remote media, fonts, analytics, or page-wide styles.
6. Adapt the result to the product's semantic markup, tokens, content, responsive behavior, and accessibility requirements. A preview is evidence of appearance, not production readiness.
7. Put required copyright and license text in `THIRD_PARTY_NOTICES.md`, a `licenses/` directory, or the project's existing notice mechanism. Do not place legal boilerplate in the user-facing README or interface unless the license explicitly requires visible attribution.

If current license or provenance cannot be established, do not copy or install the candidate.

## Uiverse: isolated interface-element source

Official sources:

- Catalog: <https://uiverse.io/>
- Submission and quality guidance: <https://uiverse.io/guidelines>
- Official component archive: <https://github.com/uiverse-io/galaxy>
- MIT license: <https://github.com/uiverse-io/galaxy/blob/main/LICENSE>

Consider Uiverse when an existing interface needs one bounded element—such as a button, input, checkbox, toggle, loader, tooltip, or small card treatment—and the current component system does not already solve it well. It is a source for a gap, not a second design system and not a reason to restyle the whole page.

Do not browse Uiverse for copy, spacing, or token-only edits. Reject a candidate when its value is only novelty, when it conflicts with the established visual language, when it requires invented content, or when a current primitive can be extended more coherently.

For behavior-rich primitives—such as dialogs, menus, comboboxes, tabs, popovers, tooltips, disclosures, or data grids—keep or first establish an accessible or headless primitive as the behavior owner. A Uiverse treatment may style that proven structure, but it must not replace keyboard handling, focus management, state semantics, or announcements with demonstration markup or CSS alone.

For a selected element:

- Inspect the actual HTML/CSS, Tailwind, or React variant rather than reproducing the preview by sight.
- Preserve or improve the native semantic element. Verify accessible name, keyboard activation, visible focus, contrast, touch target, disabled state, and error or loading meaning where applicable.
- Scope class names and CSS variables to the component. Remove global selectors and confirm that pseudo-elements, absolute layers, and transforms do not block input or overflow on small screens.
- Treat automatic or looping CSS motion as motion work: honor reduced motion, stop unnecessary offscreen work, and keep essential state understandable without animation.
- Replace demonstration text, colors, dimensions, and effects with the product's real content and tokens. Keep the source treatment only where it still fits after that adaptation.
- Capture the exact notice shown by the selected upstream page or archive at retrieval time. The MIT grant requires retaining its copyright and permission notice in copies or substantial portions.

A small compatible element may be selected and adapted without interrupting an already authorized implementation. Report its source, modifications, and notice location in the handoff.

## Anime.js: animation-engine candidate

Official sources:

- Documentation: <https://animejs.com/documentation/>
- Official repository: <https://github.com/juliangarnier/anime>
- MIT license: <https://github.com/juliangarnier/anime/blob/master/LICENSE.md>

Consider Anime.js when the project has no suitable primary motion owner and needs precise JavaScript timelines, staggering, SVG drawing or morphing, motion paths, animated object values, draggable behavior, or coordinated DOM/Canvas work. It can fit framework projects or vanilla JavaScript, but stack compatibility alone is not a reason to add it.

Do not add Anime.js when CSS covers an isolated micro-state, when Motion or GSAP already owns the required behavior cleanly, or when it would become a second controller for the same properties, timeline, or scroll region. If the user explicitly requests replacing an existing engine, treat it as a migration: score the current and proposed owners, define the migration boundary, and remove overlap only after the replacement is verified. Treat selecting or replacing the primary motion engine as a consequential choice and use the selection scorecard.

When selected:

- Install the current compatible `animejs` package with the project's package manager and lockfile. Prefer local, modular imports over a remote CDN when the delivery must be reproducible, portable, or offline.
- Follow the current official API rather than remembered examples from an older major version. Import only the functions the implementation uses.
- Bound component work to a local root and lifecycle. When the current API supports it, use a scope for root selection, media-query state, and batch cleanup; revert or cancel animations and observers on teardown.
- Make `prefers-reduced-motion` an implementation path, not a one-time check. Preserve content and state with zero-duration, reduced, or static behavior as appropriate.
- Pause or reduce continuous work when hidden or offscreen. Prefer `transform` and `opacity`, avoid unnecessary layout animation, and keep continuous values outside framework render loops.
- Do not expose play, pause, reset, speed, or timeline controls unless the product task or an accessibility requirement gives the user a reason to operate them.
- Verify normal, reduced-motion, small-screen, keyboard/touch, unmount/remount, and failure/static-fallback behavior in a real browser.
- Retain the Anime.js MIT copyright and permission notice in the distributed project's notice mechanism.

## What the user sees

Use the source quietly when the choice is small, compatible, permissively licensed, and already within the authorized implementation. Do not make a beginner visit a catalog or read a license to finish an ordinary page.

Explain the choice before implementation when it changes the primary animation owner, bundle or delivery model, or major project configuration. In every case where upstream code is adopted, include a concise handoff record with the source, practical reason, dependencies, license obligation, and notice location. If no upstream code is copied or installed, do not imply that the project uses it.
