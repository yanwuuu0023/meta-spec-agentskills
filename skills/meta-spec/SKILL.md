---
name: meta-spec
description: Project bootstrap. Walks through language check → Fresh / In-Progress classification → tech-only discussion → init → commit → optional autonomous research.
---

1. User invokes meta-spec.
2. If no language preference on record → ask user (English / 中文). Persist choice. All docs outputs (except code files) will follow user's language preference.
3. Detect Fresh or In-Progress; confirm with user.
   - Fresh: no manifest / no source files / no git.
   - In-Progress: manifest + ≥ 1 framework + ≥ 1 module.
   - Edge (only design notes / monorepo / non-code): ask user.
   - Fallback when undecidable: In-Progress (over-walk safe).

**If Fresh:**

1. Discuss tech stack + API in detail — **ask the user separately about each layer** (frontend framework, backend framework, database, ORM, auth, deployment, etc.). For each layer, mention a few common options as a starting point (e.g., "frontend: React / Vue / Svelte / Angular"), but **let the user pick or override** — never decide for them. Skip design-system unless you ask. **Do not discuss app features or what to build — that belongs to `plan-m`.** If the user mentioned an ambiguous concept (e.g., "swimming app" — tracking? lessons? social?), clarify the concept first; never ask about features.
2. Show `continue discussion or type init to initialize`. Wait for `init`.
3. Initialize `AGENTS.md` (from `references/AGENTS-template.md`) + `design-system.md` (if UI, from `references/design-system-template.md`). Initialize project framework from step 1 discussion.
4. `mkdir -p docs/v0` (if not already exists).
5. `git init` + commit `chore: init <project name> v0 with <stack>`.
6. Ask: do you want me to autonomously research all features of the `<concept>` the user mentioned? If yes, dispatch a subagent; results recorded in `docs/research/`. This is autonomous research — the agent decides what to look up, NOT an interactive Q&A about features.

**If In-Progress:**

1. Read the project to classify tech architecture (stack + API). **Do not discuss feature scope or what the project does — that belongs to `plan-m`.**
2. Confirm with user the current version (`vX.Y`).
3. From reading, discuss tech stack + API in detail — **ask the user separately about each layer** (frontend framework, backend framework, database, etc.), comparing against the existing project's stack (e.g., "you're on Next.js 14 — keep it, or migrate to Next.js 15 / SvelteKit?"). **Let the user decide** — never decide for them. Skip design-system unless you ask.
4. Show `continue discussion or type init to initialize`. Wait for `init`.
5. Initialize `AGENTS.md` (from `references/AGENTS-template.md`, populated from scan + discussion) + `design-system.md` (if UI, from `references/design-system-template.md`).
6. `mkdir -p docs/vX.Y` (if not already exists).
7. Write `docs/vX.Y/overview.md`. Format decided at write-time — project context that helps the agent on the first `todo-m` call. Not the same as per-Z `version.md` (which `commit-m` writes).
8. `git init` if needed, then `commit vX.Y <brief description based on archive>`.