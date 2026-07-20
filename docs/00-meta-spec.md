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

1. Discuss tech stack + API — **the agent MUST come with concrete options, not open-ended questions** (e.g., "Next.js vs SvelteKit vs Remix for web framework", "PostgreSQL vs SQLite vs MongoDB for DB"). You pick one (or override with your own). Skip design-system unless you ask. **Do not discuss app features or what to build — that belongs to `plan-m`.** If you mentioned an ambiguous concept (e.g., "swimming app" — tracking? lessons? social?), the agent clarifies the concept first; it never asks about features.
2. The agent shows `continue discussion or type init to initialize`. Wait for `init`.
3. Initialize `AGENTS.md` (from `skills/meta-spec/references/AGENTS-template.md`) + `design-system.md` (if UI, from `skills/meta-spec/references/design-system-template.md`). Initialize project framework from step 1 discussion.
4. `mkdir -p docs/v0` (if not already exists).
5. `git init` + commit `chore: init <project name> v0 with <stack>`.
6. The agent asks: do you want it to autonomously research all features of the `<concept>` you mentioned? If yes, the agent dispatches a subagent; results are recorded in `docs/research/`. This is autonomous research — the agent decides what to look up, NOT an interactive Q&A about features.

## In-Progress flow

1. The agent reads the project to classify tech architecture (stack + API). **Do not discuss feature scope or what the project does — that belongs to `plan-m`.**
2. You and the agent agree on the current version (`vX.Y`).
3. From that reading, discuss tech stack + API — **present concrete options, comparing against the existing project's stack** (e.g., "you're on Next.js 14 — keep it, or migrate to Next.js 15 / SvelteKit?"). Skip design-system unless you ask.
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
- `docs/research/` — created when the user accepts the autonomous feature research offer in Fresh flow step 6.
- Git history with one bootstrap commit.
- The workflow is ready to enter `todo-m`.

## Reference

- `skills/meta-spec/SKILL.md` — the bootstrap skill's full mechanic.
- `skills/meta-spec/references/AGENTS-template.md` — `AGENTS.md` template to copy.
- `skills/meta-spec/references/design-system-template.md` — `design-system.md` template to copy.
- `docs/01-todo.md` — the next step after bootstrap.