# 00 — meta-spec (bootstrap)

## What it does

1. Asks your language preference (English / 中文) and persists it. All docs outputs (except code files) will follow user's language preference.
2. Detects whether the project is **Fresh** or **In-Progress** and confirms with you.
3. Walks you through either the Fresh or In-Progress flow below.
4. Lands at a first git commit with `AGENTS.md`, `design-system.md`, and `docs/` ready.

## How classification works

- **Fresh**: no manifest / no source files / no git.
- **In-Progress**: manifest + ≥ 1 framework + ≥ 1 module.
- **Edge** (only design notes / monorepo / non-code): the agent asks you.
- **Fallback when undecidable**: In-Progress (over-walk safe).

## Fresh flow

1. Discuss what to build.
2. Discuss tech stack + API. Skip design-system unless you ask.
3. The agent shows `continue discussion or type init to initialize`. Wait for `init`.
4. Initialize `AGENTS.md` (from `skills/meta-spec/references/AGENTS-template.md`) + `design-system.md` (if UI, from `skills/meta-spec/references/design-system-template.md`). Initialize project framework from step 2 discussion.
5. `mkdir -p docs/v0` (if not already exists).
6. `git init` + commit `chore: init <project name> v0 with <stack>`. The agent will offer to research similar apps' features; If yes, subagent will be created and dispatched to research first. The search results will be recorded in docs/research/.

## In-Progress flow

1. The agent gains a full understanding of what the project already does, then discusses with you to align.
2. You and the agent agree on the current version (`vX.Y`).
3. From that alignment, you discuss tech stack + API + design-system.
4. The agent shows `continue discussion or type init to initialize`. Wait for `init`.
5. Initialize `AGENTS.md` (from `skills/meta-spec/references/AGENTS-template.md`, populated from scan + discussion) + `design-system.md` (if UI, from `skills/meta-spec/references/design-system-template.md`).
6. `mkdir -p docs/vX.Y` (if not already exists).
7. Write `docs/vX.Y/overview.md` — major-version context doc. Format decided at write-time. Read by `plan-m` / `spec-m` for project context. Not the same as per-Z `version.md` (which `commit-m` writes).
8. `git init` if needed, then `commit vX.Y <brief description based on archive>`.

## Outputs after bootstrap

Once bootstrap lands, the project has:

- `AGENTS.md` at root — the agent's per-Z workflow owner.
- `design-system.md` at root — only for UI projects.
- `docs/vX.Y/overview.md` — major-version context, read by `plan-m` / `spec-m`.
- `docs/vX.Y/` — `todo.md` written next by `todo-m`. Per-Z `version.md` lives at `docs/vX.Y/vX.Y.Z/version.md`, written in `commit-m`.
- `docs/research/` — populated by the subagent after the bootstrap commit, if the user accepted the research offer in Fresh flow step 6.
- Git history with one bootstrap commit.
- The workflow is ready to enter `todo-m`.

## Reference

- `skills/meta-spec/SKILL.md` — the bootstrap skill's full mechanic.
- `skills/meta-spec/references/AGENTS-template.md` — `AGENTS.md` template to copy.
- `skills/meta-spec/references/design-system-template.md` — `design-system.md` template to copy.
- `docs/01-todo.md` — the next step after bootstrap.