# 00 — meta-spec (bootstrap)

`meta-spec` is the one-time skill you invoke when a project is first being adopted into this workflow. After it finishes, you never invoke it again for that project — day-to-day work goes through the per-Z loop.

[Next: 01-todo →](01-todo.md)

## What it does

1. Asks your language preference (English / 中文) and persists it. All docs outputs (except code files) will follow user's language preference.
2. Detects whether the project is **Fresh** or **In-Progress** and confirms with you.
3. Walks you through either the Fresh or In-Progress flow below.
4. Lands at a first git commit with `AGENTS.md`, `design-system.md`, and `docs/` ready.

## How classification works

The agent reads your project root and looks at:

| Signal | What counts |
|---|---|
| `manifest` | `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `Gemfile`, `pom.xml`, etc. |
| `source files` | any `.ts`, `.py`, `.go`, `.rs`, `.java`, `.jsx`, `.vue`, etc. |
| `git` | a `.git` directory |

Decision:

- **Fresh**: no manifest, no source files, no git.
- **In-Progress**: has manifest + ≥ 1 framework + ≥ 1 module. (Does NOT require git; bootstrap will `git init` if missing.)
- **Edge** (only design notes / monorepo / non-code): agent asks you.
- **Fallback when undecidable**: In-Progress (over-walking is safe).

## Fresh flow

1. Discuss what to build.
2. Discuss tech stack + API. Skip design-system unless you ask. The agent will offer to search for similar projects; if yes, subagent will be dispatch to search first. The search results will be record in docs/research/.
3. Discuss relevant Agent Skills + Agent MCPs for Agents when doing project. The agent will offer to search for relevant Skills and MCPs in marketplace.
4. The agent shows `continue discussion or type init to initialize`. Wait for `init`.
5. Initialize `AGENTS.md` (from the template) + `design-system.md` (if UI).
6. `git init` + commit `chore: init <project name> v0 with <stack>`.

## In-Progress flow

Same shape, but with these differences:

1. The agent gains a full understanding of what the project already does, then discusses with you to align.
2. You and the agent agree on the current version (`vX`).
3. From that alignment, you discuss tech stack + API + design-system.
4. Discuss relevant Agent Skills + Agent MCPs for Agents when doing project. The agent will offer to search for relevant Skills and MCPs in marketplace.
5. The agent shows `continue discussion or type init to initialize`. Wait for `init`.
6. Initialize `AGENTS.md` (populated from scan + discussion) + `design-system.md` (if UI).
7. Write `docs/vX/version.md`. The format is decided at write time — whatever helps the agent on the first `todo-m` call.
8. `git init` if needed, then `commit vX <brief description based on archive>`.

## Outputs after bootstrap

- `AGENTS.md` — system prompt for the agent.
- `design-system.md` — if UI; format is optional, write it however fits.
- `docs/` — empty, ready for the per-Z loop.
- `docs/vX/version.md` — In-Progress only; records what vX is about.
- One git commit.

After this, day-to-day work starts the per-Z loop.

[Next: 01-todo →](01-todo.md)