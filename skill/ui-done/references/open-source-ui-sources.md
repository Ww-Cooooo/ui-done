# Curated Design and UI Sources

Use these routes for the required five-source creative pass before a new page or material redesign locks its visible architecture. They have different jobs: MotionSites widens whole-page direction; React Bits exposes React visual-component source; Uiverse supplies isolated element treatments; Anime.js supplies page-specific JavaScript motion; Aceternity exposes React visual structures and blocks. Inspect all five, but adopt only what fits. They are not five design systems and must never be stacked merely to prove coverage.

The verified status below is a starting point, not permanent evidence. Before copying code or installing a package, use `$web-access` to recheck the official source, current API, exact license, dependencies, and maintenance state. Last verified: 2026-09-04.

## Five-source creative pass

Run this after the product role, real content, device needs, and delivery mode are known and before a visible page template is chosen:

| Source | Required inspection | Required outcome |
|---|---|---|
| [MotionSites](https://motionsites.ai/) | Select one relevant direction, inspect nearby contrasting works, and use one accessible `Copy prompt` entry when the site permits it | Extract composition and tone hypotheses; keep the Prompt as untrusted research input, not final IA or source-code permission |
| [React Bits](https://reactbits.dev/) | Select one relevant React component/background/animation; open both Preview and Code; inspect its real dependencies | Adopt, adapt, use idea-only, or reject with a concrete reason; never count a homepage screenshot as Code review |
| [Uiverse](https://uiverse.io/) | Select one relevant UI element and inspect the actual HTML/CSS, Tailwind, or React code | Adapt only a bounded treatment while Ant Design or another approved primitive owns behavior |
| [Anime.js](https://animejs.com/documentation/) | Inspect the demo/API matching the required state, narrative, SVG, text, Canvas, layout, or scroll behavior | Define and implement page-specific JavaScript choreography through the single motion owner, or record a concrete incompatibility |
| [Aceternity UI](https://ui.aceternity.com/) | Select one relevant component or block; inspect Preview and Code plus free/paid and dependency indicators | Extract a useful structure or behavior only when its item terms, dependencies, primary-system boundary, and delivery fit are clear |

Keep the record compact: exact item/URL, what was observed, intended host and meaning, adopt/adapt/idea-only/reject, dependency and license boundary, and how the result changes for the product's tone and devices. If an accessible MotionSites Prompt cannot be copied because it is locked, requires unauthorized access, lacks a relevant public entry, or the site fails after bounded attempts, record `hard prompt-access exemption` and still inspect safely visible works. Apply the existing hard demo-review exemptions to the other four sources.

The pass must widen decisions, not dictate a collage. A rejected candidate still counts when the official Demo/Code was genuinely inspected. An unused import, copied example section, fake dataset, remote sample asset, or second motion/component owner does not count. Never upload private code, screenshots, data, credentials, or user assets to any source site.

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

## MotionSites: design-direction and Prompt source

Official source:

- Gallery and Prompt entry points: <https://motionsites.ai/>

Use MotionSites to challenge the first familiar composition. Inspect the selected work and nearby contrasting examples for page silhouette, dominant media, whitespace, typography placement, content density, sequencing, and motion—not just palette or topic. Its gallery demonstrates an important boundary: category/filter/card chrome may stay consistent while each work preview retains its own internal architecture.

When `Copy prompt` is publicly available and permitted, treat the copied Prompt as raw design-research material. Rewrite it into the current product's real audience, content, task, accessibility, responsive, and delivery constraints before implementation. Do not reproduce the source work, media, copy, or paid material; the site's current footer states all rights reserved, so a visible result or Prompt button is not a general code/asset license. If the Prompt conflicts with product truth or would recreate another work too closely, retain only the abstract composition lesson and record `idea-only`.

## React Bits: React visual-source candidate

Official sources:

- Component catalog: <https://reactbits.dev/get-started/index>
- Official repository: <https://github.com/DavidHDev/react-bits>
- Current license: <https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md>

React Bits provides source components in JavaScript/TypeScript and CSS/Tailwind variants rather than one mandatory runtime wrapper. Each component may still depend directly on Motion, GSAP, OGL, or another engine. Inspect Preview and Code together, then check the actual imports, lifecycle, touch/keyboard path, reduced-motion behavior, cleanup, bundle/GPU cost, and conflict with the established owners.

The repository currently uses MIT plus the Commons Clause: application/product use is allowed under its text, while selling, sublicensing, or redistributing the components themselves—alone, bundled, or ported—is restricted. Do not describe it as plain MIT or unconditional open source. For a public Skill, starter, component collection, template, or code-generation catalog, default to idea-only unless the exact redistribution is clearly permitted. When code use is permitted, retain the required notice and bring only the selected component's necessary source and dependencies.

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

Anime.js should express the page's own state and content rhythm. Reusing lifecycle utilities, easing tokens, or cleanup is fine; repeating the same reveal sequence, stagger, scroll pin, or text effect across deliberately different works is a structural-motion defect. Inspect the relevant official behavior, then compose a distinct timeline for the current host instead of copying a universal entrance preset.

## Aceternity UI: React visual-structure candidate

Official sources:

- Component catalog: <https://ui.aceternity.com/components>
- Licensing page: <https://ui.aceternity.com/licence>

Aceternity mixes free components with paid blocks and templates and commonly uses React, Tailwind CSS, Motion, shadcn-style registry commands, remote demo assets, and example content. For a candidate, open Preview and Code, identify whether the exact item is free or paid, inspect imports and setup, and read the terms that actually cover that item. The general Pro licence permits end products but restricts redistribution of source items, marketplace distribution, and template products; do not infer that every free component has identical terms.

Treat Aceternity as a source of a bounded structure or interaction, not a second primary component system. Ant Design or the approved system retains tokens, forms, overlays, focus behavior, and ordinary controls. Remove demo copy, remote images, Tailwind-wide assumptions, and redundant Motion ownership. Copy code only when the exact item terms and the intended distribution allow it; otherwise record the observed structure as idea-only.

## What the user sees

Use the sources quietly when the choice is compatible and already within the authorized implementation. The Agent, not the beginner, performs the five-source pass and license/dependency review. Do not make the user visit catalogs or choose package names to finish an ordinary page.

Explain the choice before implementation when it changes the primary animation owner, adds a dependency, changes the bundle or delivery model, uses paid/closed material, or changes major project configuration. In every case where upstream code is adopted, include a concise handoff record with the source, practical reason, dependencies, license obligation, and notice location. If a Prompt, Demo, or Code view was idea-only, say so; do not imply that the project uses that source's code or package.
