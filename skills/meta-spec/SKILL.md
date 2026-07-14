---
name: meta-spec
description: Project bootstrap. Walks through language check → Fresh / In-Progress classification → discussion → init → commit.
---

1. User invokes meta-spec.
2. If no language preference on record → ask user (English / 中文). Persist choice.
3. Detect Fresh or In-Progress; confirm with user.
   - Fresh: no manifest / no source files / no git.
   - In-Progress: manifest + ≥ 1 framework + ≥ 1 module.
   - Edge (only design notes / monorepo / non-code): ask user.
   - Fallback when undecidable: In-Progress (over-walk safe).

**If Fresh:**

1. Discuss what to build.
2. After user states idea → discuss tech stack + API. Skip design-system unless user asks. Ask user if they want to search for similar projects for reference; search only if user agrees.
3. Discuss relevant Skills + MCPs.
4. Show `continue discussion or type init to initialize`. Wait for `init`.
5. Initialize `AGENTS.md` (from `references/AGENTS-template.md`) + `design-system.md` (if UI, from `references/design-system-template.md`).
6. `mkdir -p docs`.
7. `git init` + commit `chore: init <project name> v0 with <stack>`.

**If In-Progress:**

1. Full understanding on what the project does; discuss with user to align.
2. Confirm with user the current version (`vX`).
3. From the aligned understanding, discuss tech stack + API + design-system.
4. Discuss relevant Skills + MCPs.
5. Show `continue discussion or type init to initialize`. Wait for `init`.
6. Initialize `AGENTS.md` (from `references/AGENTS-template.md`, populated from scan + discussion) + `design-system.md` (if UI, from `references/design-system-template.md`).
7. `mkdir -p docs`.
8. Write `docs/vX/version.md`. Format decided at write-time.
9. `git init` if needed, then `commit vX <brief description based on archive>`.
