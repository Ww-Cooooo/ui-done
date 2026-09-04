# UI Done maintenance instructions

These instructions govern development, modification, repair, and review of this repository and the bundled UI Done Skill. They do not weaken the Skill's runtime contract.

## Core principle

- Work with **全面思考，轻量落地**: understand the affected behavior, references, user value, and real risks before editing, then make the smallest complete change that handles them.
- Lightweight maintenance is not thoughtless minimalism. Finish the requested change and preserve relevant design and technical decisions.
- The runtime contract remains intentionally proactive: React is fixed; one primary UI component system is required and Ant Design is the default; every enhancement category is planned inclusion-first; true 3D/WebGL and 2D Canvas are separate; AntV-first visualization is adopted whenever authentic visualizable data exists; curated sources come first; and representative computer, tablet, and phone acceptance remains. Never reinterpret lightweight maintenance as permission to relax those rules.
- Demo-first adoption is a runtime invariant: before a curated or external source is selected or implemented, inspect its official demo gallery and every official demo reasonably relevant to the assigned product role, then record the adaptation or rejection. Not viewing relevant demos requires a narrow evidence-backed hard exemption. Preserve this behavior in the vendor-neutral core rather than a host-only adapter.
- Deliberate open-source typography is a runtime invariant: every new or materially redesigned page must select or explicitly reuse at least one current, widely adopted open-source typeface that fits the page. Preserve exact-license, official-specimen, glyph-coverage, self-hosting, and computed-font checks; browser or operating-system defaults are fallbacks, never the designed primary typography.
- Distinct multi-page work must differ in visible information structure, not only theme tokens, fonts, imagery, labels, or swapped 3D shapes. Preserve the route-structure comparison and the scene-specific subject/camera/material/light/motion quality gate without adding a new framework or heavyweight validation layer.
- Trigger continuity is part of the runtime contract. Preserve explicit and implicit matching, mid-task frontend discovery, authorized delegated-task propagation, and continued governance through research, code mutation, QA, packaging, and handoff.
- Keep the runtime contract vendor-neutral and authoritative in `skill/ui-done/SKILL.md`. Files under `agents/` are optional host adapters only; never make OpenAI, Codex, Anthropic, Claude, Gemini, Cursor, Copilot, or any other vendor syntax the sole route to discovery or execution.

## Keep maintenance lean

- Reuse or consolidate existing instructions, references, scripts, and checks before adding another layer.
- Do not add abstractions, dependencies, configuration, scripts, documents, planning artifacts, or generic infrastructure without a concrete recurring need.
- Ordinary maintenance does not need an eval workspace, baseline matrix, benchmark viewer, multi-Agent exercise, or browser suite. Use them only when the user asks or when a material behavior change cannot be demonstrated with simpler evidence.
- Keep one clear owner for each rule and remove duplication instead of documenting the same decision in several places.

## Verify in proportion to the change

- Markdown, reference, or prompt edits: run the Skill structure validator only when Skill structure changed, then check affected links, wording, and targeted policy invariants. Do not run browser tests for instruction-only edits.
- Script or tooling edits: run the relevant self-test or focused test for the changed behavior.
- Triggering or core workflow changes: check explicit, implicit, mid-task-discovery, authorized delegated-task, and vendor-neutral fallback wording; then broaden evaluation only when simpler evidence is insufficient.
- Demo-workflow changes: check relevant-demo scope, live official evidence, adoption/rejection records, product-tone adaptation, license separation, hard no-view exemptions, selection gating, and QA/handoff continuity.
- Packaging, installation, release, or distribution changes: add the corresponding package/install smoke check and any wider gate that the delivery risk actually requires.
- Stop when sufficient evidence exists. Do not stack checks merely to make the process look rigorous, and report what was checked and what was intentionally not run.
