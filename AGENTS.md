# UI Done maintenance instructions

These instructions govern maintenance of this repository and its Skill. They are not a frontend execution workflow.

## What the Skill is

- `skill/ui-done/SKILL.md` is a lightweight design advisor for strong models: perspectives, trade-offs, and common blind spots. It is not a rulebook. Do not reintroduce mandatory stacks, numeric red lines, fixed approval stages, required output lines, or "missing X = failure" wording.
- Keep the entry readable in one screen. Put optional depth in `references/` and deterministic checks in optional `scripts/`; never make them mandatory pre-reads.
- Be careful that advice does not itself become an aesthetic default. Naming a specific look (e.g. dark glass, glow, a particular layout) as "good" tends to make every output converge on it; prefer describing where distinctiveness comes from.
- Write for an executor that has only the published folder and the user's task — no private chats, local paths, or companion Skills as required dependencies.

## Editing

- Inspect affected files and working-tree changes first; preserve unrelated user work.
- Fix conflicting wording at its owner instead of appending another rule layer. Keep `README.md`, `CHANGELOG.md`, `VERSION`, `metadata.version`, `agents/openai.yaml`, and `assets/agents-snippet.md` consistent with `SKILL.md`.
- Do not create planning files, reports, or benchmark environments by default.

## Verifying

- Wording and link edits: check the affected text and that package-relative links resolve.
- Script changes: run `python -X utf8 skill/ui-done/scripts/frontend_preflight.py --self-test` plus the affected behavior.
- Changes to the Skill's design direction: when practical, give a clean-context executor the published package and a representative task (ideally alongside a no-Skill baseline) and look at the rendered result. Report what was and was not verified; a valid Markdown file or passing build is not evidence of design quality.
- Showcase changes: build with `pnpm run check` and check the affected page; do not rerun everything for unrelated edits.
