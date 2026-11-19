# UX Craft Playbook (Optional Perspectives & Blind-Spot Memo)

Browse this only when it adds clarity—treat every note as an experienced lens to think with, never as a rigid rulebook or mandatory checklist.

---

## 1. Upstream Product & Flow Questions

- **Closing the full loop:** Before polishing UI controls, ask what happens right after the user finishes on this screen. Speeding up data entry or generation fails in practice if downstream review, reassignment, approval, or export still breaks down outside the app.
- **Leading UX clarity over surface buzz:** Ask what a first-time visitor or busy operator actually needs in the first 5 seconds (*what is this, what changed, what deserves action next?*) rather than decorating an unclear state with extra metrics or slogans.
- **First-run vs returning posture:** Someone arriving with an empty workspace benefits from a low-friction starting example or clear guided preview—not a cold `"No recent activity"` box; returning power users usually benefit more from immediate task resumption and stable control placement.

## 2. Interaction Friction & Prevention Traps

- **High-consequence choices & muscle memory:** Ask whether pre-selecting a risky option, hiding `<7` everyday options inside nested menus, dumping `>15` items in an unsearchable select, or letting an unverified `"Skip"` mark setup complete could cause silent errors or fake progress.
- **Action phrasing & recovery:** Labels like `"Save"` / `"Confirm"` work better when they reflect what actually happens next (distinct from copying, drafting, or publishing). Inline error hints right where input blurred help people recover faster than vague top banners or developer error codes.
- **Units & urgency:** Raw percentages (like `14% remaining`) often force mental math compared to concrete action units (`~35 km left` or `26 min until SLA`), though technical diagnostics can benefit from pairing both.
- **Interruption weight:** Non-blocking status pills or contextual popovers work well while users are mid-focus; reserve heavy modals or full-screen dialogs for choices that genuinely deserve stopping the workflow.

## 3. AI-Native & Spatial Inspection Patterns

- **Calibrated uncertainty over black-box precision:** On AI estimates or scores, showing a confidence interval alongside a quick in-place calibration control (or explaining what evidence supports a tag via clickable anchors) builds far more trust than a single unverified number.
- **Reversibility & batch safety:** For multi-step AI actions, consider letting people inspect/edit the planned items or retain clear Stop/Undo control rather than running silently with zero exit hatch.
- **In-situ context beats distant prompting:** When reviewing media, canvases, logs, or designs, anchoring notes directly to coordinates, frames, timecodes, or highlighted selections cuts translation guesswork compared to typing long descriptions in a disconnected sidebar box.

## 4. Stress-Testing Against Messy Reality

- **When content scales uncomfortably:** Ask what happens when labels are unexpectedly long (`_UI / D8849201` wrapping awkwardly), 15 items cluster at the same coordinate, an image loads portrait instead of landscape, or a companion panel shrinks down.
- **Accessibility without sacrificing visual craft:** Visual icons and expressive controls feel much cleaner when interactive triggers stay keyboard-reachable, icon-only controls carry clear accessible labels, and purely decorative artwork stays out of screen-reader noise.
