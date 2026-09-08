# UI Done maintenance instructions

These instructions govern development, modification, repair, and review of this repository and the bundled UI Done Skill.

## Core principle

- Work with **全面思考和架构；精炼实现；精准验证；果断执行**: understand the affected behavior and real risks, then make the smallest complete change that delivers the requested result.
- The vendor-neutral runtime contract has one authoritative home: `skill/ui-done/SKILL.md`. This file governs repository maintenance instead of duplicating that contract. Lightweight maintenance never weakens the user's confirmed design, motion, typography, authentic-data, or distinctness requirements. Host adapters mirror the contract; they do not own it.

## Keep maintenance lean

- Inspect the working-tree state and the actual impact of the change. Preserve unrelated user work and repair the relevant cause before considering a wider refactor.
- Reuse or consolidate existing instructions, references, scripts, and checks before adding another layer. Do not add abstractions, dependencies, configuration, or documents without a concrete benefit to this project.
- Tool-call counts do not require three planning files, an evidence package, or an evaluation environment. When cross-session work needs continuity, prefer a short current-state section in an existing note; retrieve historical details only for relevant questions. Preserve retained history rather than repeatedly rereading or rewriting it.
- Ordinary maintenance does not require a benchmark matrix, multi-Agent exercise, or full browser suite. Use broader methods only when requested or when simpler evidence cannot resolve a material risk.
- Keep one clear owner for each rule and decision. Reference it instead of maintaining duplicate instructions or acceptance records.

## Verify in proportion to the change

- Markdown, reference, or prompt edits: check affected facts, links, wording, and decision scenarios. Run the Skill structure validator when Skill structure changes; do not run browser tests for instruction-only edits.
- Frontend repairs: follow the scope-selection table in `skill/ui-done/references/visual-qa.md`. Test the changed user behavior and relevant known failure cases, adding representative consumers when a shared layer changes.
- Script or tooling edits: run the focused check for the changed behavior. Build the affected delivery artifact when needed, then test that artifact rather than claiming source-only success.
- Triggering or core workflow changes: preserve explicit, implicit, mid-task-discovery, authorized delegation, and vendor-neutral fallback behavior. Check representative decision scenarios before considering a larger evaluation.
- Packaging, installation, or distribution changes: add the corresponding entry/install/resource check and any wider check justified by the actual delivery risk.
- Stop when relevant evidence is sufficient. Expand or rerun only after a new change, failure, or unresolved concrete doubt; state what was checked and what was not.
