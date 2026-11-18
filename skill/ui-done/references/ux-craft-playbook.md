# UX Craft Playbook (Proactive Principles & Actionable Bounds)

Load this compact field manual during `direction`, `selection`, copy/empty/error crafting, AI/Agent flows, landing/paywall design, or pre-delivery self-critique. Every pattern carries an **applicable boundary**—never force a consumer conversion rule onto a high-pressure operator tool, or heavy ceremonies onto a Tier A defect fix.

---

## 1. Upstream Diagnosis & Proactive Reframing (Think Two Steps Above the UI)

Before tweaking CSS or generating layouts, check whether the task itself hides an upstream flaw:

- **Trace Business -> Product -> UX (`P18`):** Clarify *Who acts*, *Core task verb* ("find/operate" vs "browse/discover"), and the **leading UX metric** (task completion, misclick/error rate, decision time, inline calibration rate) separately from lagging commercial metrics (revenue, renewal, LTV—which are confounded by pricing, traffic, promos, and channels). Never fake UX causal claims or mix mandatory compliance actions with optional feature usage.
- **Solve Behavioral Bottlenecks Over Literal Complaints (`P11`, `P18`):** When feedback says "the page looks messy" or an audit shows low adoption, inspect drop-off points, error states, and downstream consumption first. Simplifying form input (`96s -> 34s`) fails if downstream reviewers still export spreadsheets because the manager review/reassign loop (`派回待办`) is missing. Never fix surface styling while an upstream **P0** broken loop or dead-end island persists.
- **Triage & Converge (`P17`, `P18`):** Filter candidate concepts through **Desirability x Feasibility x Viability**; sequence work as **P0** (broken flow, false completion, invisible control) -> **P1** (hierarchy, clarity, spacing) -> **P2** (micro-motion polish). Remember AI gets 70–80% drafted fast—the winning 30% lives in problem framing, edge cases, and precision polish.
- **Scope Rule (`Avoid Over-Nudging`):** On an unambiguous small repair (e.g., fix button alignment or clip bug), apply fixes directly and add at most 1–2 concise non-blocking lines if a real P0 trap remains. On new pages or substantial redesigns, proactively surface structural flaws before locking directions.

## 2. Density, Scannability & Stage Ordering (Role x Pressure)

| Pattern | Operational rule | Boundary / counter-case |
|---|---|---|
| **High-pressure "Find / Work"** | Keep live telemetry, status, filters, and primary tools globally visible and physically stationary; strip feed/promo distractions. | Never bury urgent operational actions inside nested menus or magazine whitespace. |
| **Low-pressure "Browse / Editorial"** | Twin-column visual cards maximize breadth & CTR; generous editorial cards build story pacing; keep utility search separate from curated magazines. | Never drop an operator checkout or tax filing task into a cluttered dual-column recommendation feed. |
| **80/20 & `System 1 -> System 2`** | Front-load the 20% highest-frequency, immediate-horizon (`now -> hourly -> future`), decision-changing signals as **`Title -> Scannable Metric/Visual -> Brief Interpretation`**. | Audit/compliance views requiring exhaustive field inspection must remain expandable or visible in an audit tab—not hidden silently. |
| **Human-Unit Translation** | Convert raw percentages/telemetry into immediate decision units (e.g., remaining range `340 km` rather than only `%`) and pair with concise supportive tips. | Scientific/engineering diagnostics may require raw units alongside derived summaries. |
| **Lifecycle Reordering** | Split first-visit/uninstalled (`capability preview + social proof`) from active/returning (`What's New + resume active work`). | Single-session anonymous tools without user history do not need fake returning tabs. |
| **First-Run vs Power Users** | Give novices non-blocking inline hints or **pre-charged ready examples** (explicitly labeled); keep power users' frequent controls physically fixed, hiding rare settings via progressive disclosure. | Once onboarding is dismissed, never block repeat users with recurring coachmarks or huge banners. |

## 3. Controls, Overlays, Symbols & Optical Precision

- **Overlays & Lists:**
  - Instant-apply choice -> `Menu` anchored to trigger context; multi-field deferred submit -> `Sheet` with title + submit (`Menu` can open `Sheet`; `Sheet` must not downgrade back to `Menu`).
  - Durable IA object conversion -> `<` detail route + primary CTA; non-IA curated collection -> `X`-closed fullscreen overlay; single promotional focus -> centered compact modal with subdued button contrast; foreground-busy background live task -> non-blocking compact bottom pill.
  - `<7` choices or comparisons -> flat chips/segmented/radios (never bury in dropdown); `>15` choices -> searchable + grouped select; known fixed formats (dates/birthdays/ages) -> direct text input; multi-attribute SKUs -> flat swatches graying out-of-stock inline.
  - **Pagination** (URL/page anchors) for task completion & re-finding; **Infinite scroll** only for continuous feed dwell + real-time recommendation streams.
  - Toolbar search scopes current view filter; Tab search owns an isolated discovery space; auto-focus keyboard only when direct search is the sole primary entry.
- **Visual Ratios, Optical Compensation & Identifier Guard:**
  - **`2-3-4` Grayscale & Top-Lit Dark Mode:** Per mode max `3` surface grays, `4` text hierarchy grays; use subtle warm/cool tinted grays (avoid flat `#808080`); dim neutral telemetry labels below headlines/primary CTAs; elevate dark surfaces lighter from top down—never mechanically invert light mode.
  - **Geometric Scale & Spacing:** Font sizes step `>= 1.25x`; group margins obey `outer >= 3x inner`; Chinese prose line length `35-45 chars` (`1.5-1.75` line-height); dynamic numbers/timers/prices require `font-variant-numeric: tabular-nums` or monospaced digits; nested rounded boxes follow `innerRadius = outerRadius - padding`.
  - **Button & Card Geometry:** Single-line buttons `padding-inline > padding-block`; paired action gaps `~1x` text height; **no twin high-priority hero/gold cards** (`<= 1-2` solid primary CTAs, zero red dots on primary CTA); opt for **`90%` standard idiomatic patterns + `10%` focused signature detail**.
  - **Narrow-Rail Typography Protection:** Lock compact nav rail widths cleanly (single-line nav labels) and **never let user IDs, codes, or alphanumeric tokens split mid-word** across lines (`_UI / D8849201` -> break cleanly before delimiter or truncate with crisp tooltip/title when appropriate).
  - **Icons, Fills & Spatial Markers:** Broad category-scan lists place icons **left**; explicit verb action menus keep text **left-aligned** (icons omitted or subtle right); mixed control panels use **solid color fill** for external/system connection bridges vs **foreground icon tint** for internal levels; follow native OS idioms (distinct Share vs Reply icons); label low-consensus icons explicitly; choose semantic rendering hierarchy (`monochrome / hierarchical / palette / multicolor`) cleanly; on maps/spatial canvases mark focus with high-contrast **geometric dot + directional cone**, never noisy photo avatars.

## 4. Human Microcopy, MLP Healing & Conversion Architecture

- **Zero-Guilt Validation & Copy Swaps:**
  - Validate forms on blur/input inline beside the exact field with empathetic human recovery (`"Almost there—add @ domain"` instead of raw system rejection or `"Invalid Mode A"`). Keep `text-polish` discipline active on every label, CTA, and empty state.
  - Strip dense prompt specs or developer payloads out of primary inputs into expandable/downloadable sheets; replace dead `"No recent activity"` panels with dynamic **`Guide & Live Preview`** assistance or collapse empty shells.
  - **MLP Delight Over Cruelty:** Surface single-step actions right at the contextual trigger moment instead of burying settings; greet returning/interrupted users with seamless continuation rather than "streak failed / broken" guilt.
- **Landing, Paywall & Growth Structure (`Tier B/C` Onboarding & Upgrade Flows):**
  - **Hero Clarity in <=5s:** For unfamiliar tools/products, lead with **`Product Category + Concrete Outcome + Real Quantified Proof + Zero-Risk Next Step`** (e.g., `Learn More` / `Start Free`). Reject giant mascots, abstract gradients, empty buzzwords (`digital alchemy`), grey `Submit` buttons, and forced heavy video loops where crisp photography/real UI performs stronger.
  - **Narrative Rhythm & Dual Growth Split:** Progress as `Value Claim -> Three Core Capabilities -> Integration/Context -> Agent Workflows -> Credible Logo Proof`; clearly distinguish **PLG self-serve free CTA** from **SLG `Request a demo`**; prevent child promos/popups from breaking out into dead-end isolation.
  - **Paywalls:** Echo the exact triggered limit/reason at top, pin the matching plan benefit first, show annual discount + exact dollars saved directly beside monthly pricing, and state **`Cancel anytime`** below the main CTA.

## 5. AI-Native & Anti-Fake-UI Safeguards

- **Anti-Fake Completion & Muscle-Memory Traps:** Never ship lax `Skip` paths that mark unverified configurations "done", or fake full-height audio waveforms / mocked static percentages posing as live telemetry. Remove default pre-selections on high-error choices and keep primary confirm disabled until deliberately selected and validated (enforce minimum observation period or input quality check before scoring/verdict).
- **Uncertainty & Calibration (`<10s`):** Never fabricate false precision on uncertain AI estimates; render **`Interval + Confidence`** and provide an **in-place calibration control (`<10s` slider/toggle)** that visibly recalculates the output.
- **Pre-Run Alignment & Safety Gates:** Gate complex multi-step AI edits/actions by complexity & reversibility—use an **editable checklist + non-blocking countdown** for medium batches, explicit **Stop & Confirm** before irreversible writes, **Accept / Reject / Correct / Undo** + clickable **`[Cite-N]` source anchors** for verifiable conclusions, and structured work status (e.g., `In review`) on Agent queues.
- **In-Situ Spatial UX & Generative Streaming:** When users inspect or critique media/diagrams/UI, pair **direct click/marquee context selection** and **accumulated in-canvas callouts/arrows** with voice/text rather than blind distant prompting. On streamed generative UIs, **buffer descriptions until render-ready** to prevent half-baked layout flicker, provide non-blocking progressive upscaling notices, deduplicate drill-down breadcrumbs, and disclose AI participation cleanly where trust/regulation applies.

## 6. Accessibility Parity, Live Tokens & Honest Verification

- **Complete Screen-Reader Loop:** Interactive controls, custom triggers, tabs, and disclosures expose `aria-label`/accessible text, role, position, and dynamic state (`aria-selected`, `aria-expanded`, `aria-current`); mark decorative SVGs/icons `aria-hidden="true"`. Keep visual focus rings crisp at all breakpoints.
- **Perceptual Polish (Without Bloat):** Deliver `<=0.1s` tactile press/anchor continuity, earn **1 signature micro-interaction** on primary actions when helpful, and use perceptual progress motion (e.g. subtle reverse-drift stripes) instead of freezing spinners when waiting is genuinely unavoidable.
- **Portable Single-Source Spec (`Multi-View / Repeated Builds`):** Maintain one concise token source (surfaces, type ramp, radii, spacing scale, `Change History`) in-repo alongside React/AntD tokens so future iterations inherit exact rules without style drift, and embed inline CSS/SVG assets on single-file HTML previews to prevent relative-path breakage.
- **Honest Runtime Reporting:** Never check off Keyboard/Focus Order, VoiceOver/ARIA announcements, Live Narrow Resize, Reduced-Motion Toggle, Offline/Timeout fallback, or Reload Persistence from a static build or single screenshot—list untested runtime axes in `unverified runtime:`.
