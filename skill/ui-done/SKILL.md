---
name: ui-done
metadata:
  version: "2026.11.19"
description: "Design, redesign, build, or review user interfaces, web apps, creative tools, dashboards, landing pages, and visual prototypes. Offers high-leverage UX judgment, spatial composition guidance, and optional self-check tools while leaving execution architecture and visual craft up to your own reasoning."
---

# UI Done

Think like a **senior product architect, visual director, and builder**, not a checklist clerk. This guide offers high-leverage design perspectives, common UX blind spots, and optional checks—**not rigid mandates, fixed workflows, or prescribed tech stacks.** Adapt every suggestion freely to the task, domain, and fidelity level at hand.

---

## 1. Frame the Surface Before Picking Aesthetics

- **Match visual temperament to the job:**
  - *Operational consoles & tools* tend to work best when urgent status, filters, and primary actions remain calm, scannable, and predictable rather than buried under feed noise or flashy flare.
  - *Creative & spatial workbenches* (media, audio, canvas, node, 3D, CAD) come alive when the canvas or signal holds visual primacy and surrounding controls subordinate into precision instruments—using direct spatial causality (shared playheads, optical reticles, contextual anchors, tethered inspectors) rather than equal-weight boxed card walls.
  - *Landing pages & showcases* usually succeed when a first-time visitor grasps the category, concrete value, credible proof, and next action within seconds instead of deciphering abstract gradients or vague AI buzzwords.
  - *Compact sidebars & IDE panels* require protecting primary workflow visibility without squeezing targets or forcing awkward horizontal scroll across narrow widths.
- **Let the problem dictate your pace and stack:** When goals and boundaries are clear, shipping a cohesive working implementation directly is often better than forcing multi-step wireframe reviews. When two incompatible structural metaphors carry high rework risk, showing 2–3 genuinely distinct architectural concepts first saves everyone time. Choose whatever frontend stack fits the host codebase and scope—there is no single mandatory framework or library.

## 2. Break Away From Wireframe & Template Gravity

- **Tear down before restyling when a layout is rejected:** If feedback says a UI feels plain, boxed-in, or too close to an older draft, shifting panel positions or flipping light/dark colors rarely helps. Step back, drop the old box skeleton, and rethink the spatial relationship between the core object, controls, and annotations.
- **Avoid lazy specimen shortcuts:** On creative concepts or prototypes, avoid representing rich media, scenes, or telemetry with bare gradient circles, grey slab placeholders, plain text labels masquerading as studio icons, dead `"No recent activity"` panels, or opaque internal strings like `"Mode A"` / `"Submit"`. Credible domain imagery, meaningful sample data, and cohesive icons let everyone judge the real experience fairly.
- **Use visual restraint deliberately, not defensively:** Clean hierarchy, top-lit dark surfaces, and breathing room help operational tools stay legible—but never let restraint turn creative tools into timid, flat grey wireframes when atmospheric lighting, glass depth, or optical precision serves the craft.

## 3. Catch Common Product & UX Blind Spots

- **Look two steps upstream:** Ask *who acts*, *whether they are finding/executing vs browsing/discovering*, and *what closes the downstream loop* (for instance, streamlining form input doesn't fix a broken reviewer handoff or missing reassign flow).
- **Guard against silent functional regression on live codebases:** When redesigning or editing an existing app, make sure existing data contracts, routes, keyboard shortcuts, undo safety, and persistence continue working cleanly beneath the new presentation.
- **Mind messy real-world capacity early:** A spacious desktop showcase with 3 short items can break once 20 dense comments collide at one timestamp, long localized labels wrap mid-token, or a companion panel narrows.

## 4. Self-Critique Before Wrapping Up

- **View it with stranger eyes:** Whenever your environment allows rendering the page or app, look at the actual rendered view (and key interactive/narrow states) like a first-time user who knows nothing about your code.
- **Be honest about reality:** Distinguish what you actually rendered and exercised from static code review or unverified edge paths, and never disguise simulated signals or skipped verification as live completeness.
- **Keep user-facing chat explanations scannable:** When summarizing design choices, comparing concepts, or reporting UI audit findings in chat, favor compact Markdown tables, `## / ###` hierarchy, `` `monospace pills` ``, `**bold anchors**`, and restrained semantic icons (`🎨`, `✅`, `⚠️`, `🔧`) over dense prose walls (avoiding raw `<span style>` HTML tags that break chat renderers, and keeping chat emojis out of production UI copy unless the product calls for them).

---

## Optional Toolbox (Strictly Non-Mandatory)

Nothing below is required; reach for them only when they sharpen the task:

- **Deeper UX blind-spot prompts:** Browse [ux-craft-playbook.md](references/ux-craft-playbook.md) if you want quick reminders on onboarding/first-run gaps, AI-native calibration/reversibility patterns, empty/error microcopy, or density tradeoffs.
- **Quick static sanity scan:** If you built a standalone HTML preview or web bundle and want an extra pair of eyes for broken local paths, exposed secrets, sub-11px tiny text, missing icon-button `aria-label`s, or stray placeholder words, you can optionally run:
  `python -X utf8 <skill-dir>/scripts/frontend_preflight.py <target>` (with `--offline` for single-file targets or `--panel-max-width 420` for narrow panels).
