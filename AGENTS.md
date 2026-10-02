# UI Done maintenance instructions

These instructions govern this repository and Skill maintenance. They are not an extra frontend execution workflow.

## Scope and implementation

- Work with **全面思考和架构；精炼实现；精准验证；果断执行**. Remove unnecessary engineering and process, not the agreed design, motion, typography, truthful data, or distinctness requirements.
- `skill/ui-done/SKILL.md` owns the vendor-neutral runtime contract; host adapters mirror it. Keep each rule in its existing owner instead of duplicating it here or in new checklists.
- Inspect the affected files, callers/entry and working-tree changes before editing; preserve unrelated user work. Expand inspection only for a concrete dependency, failure or unresolved question. Reuse useful existing parts; add architecture, dependencies or tooling only for a demonstrated task need.
- Do not create planning files, reports, benchmark environments, multi-Agent exercises or evidence packages by default. Use them when the task actually needs them. For continuity, retain a short current-state note and retrieve relevant history rather than repeatedly rereading everything.

## Write a self-contained public Skill

- Write for an executor with only the published folder and its user's task, not this chat, private reports or an unavailable companion Skill. Keep essential requirements and explicit reading conditions in `SKILL.md`; put conditional methods and examples in the relevant reference and link it where needed.
- Preserve actionable requirements, conditions, exceptions and observable outcomes. Do not replace specific positions, proportions, motion targets or rejected layouts with slogans such as "preserve intent" or "make it distinctive." Keep decisive user words and selected reference artifacts in the task handoff; retain a concrete counterexample when needed to prevent misreading.
- Make public examples independent of private paths, services, media and personal data. For external references, retain the primary source, concrete observation, application and limits without copying whole articles. Repair conflicting wording at its owner rather than appending another rule layer.

## Verify and finish

- Instruction/README edits: check affected facts, local links and changed decision scenarios; validate Skill structure only when it changes. Do not build or browser-test an application for instruction-only edits.
- Frontend changes: use the scope-selection table in `skill/ui-done/references/visual-qa.md`. Script/tooling changes: check the affected behavior. Packaging/install changes: exercise the affected artifact, entry and resources, not merely the source.
- Trigger/core-workflow changes: check the affected explicit, implicit, mid-task, delegated and vendor-neutral routes. These checks do not require a full benchmark by default.
- Reuse passing evidence while relevant code/artifacts/conditions remain unchanged. Rerun or expand only for a new change, failure or unresolved concrete doubt. Distinguish instructions changed, behavior checked, user acceptance and entry actually updated; neither valid Markdown nor a passing build proves design quality or universal Agent compliance.
