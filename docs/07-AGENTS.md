# 07 — AGENTS.md (the agent's system prompt)

[← 06-commit](06-commit.md) · [Back to README →](../README.md)

## What it is

`AGENTS.md` is a file at the root of your project that the AI agent reads when it starts a session. It tells the agent how to behave on this specific project.

The agent's built-in system prompt is generic — it doesn't know this specific workflow loop, doesn't know that your project is a calendar app, and doesn't know that you use Postgres + Hono or prefer Tailwind over shadcn. `AGENTS.md` fills in all of that so the agent never has to re-discover the project at the start of every session.

## When it's created

Once, during bootstrap. When you run `meta-spec` for the first time on a project, it generates `AGENTS.md` from the template and your discussion. After that it lives in your project root and is committed alongside everything else.

## What it contains

A typical `AGENTS.md` covers:

- **Project Framework** — the languages, frameworks, and tools in use (e.g. Next.js 15 + Hono 4 + PostgreSQL + Drizzle).
- **Design System reference** — pointer to `design-system.md` if the project has UI.
- **Preferred Skills + MCPs** — the skills the agent should reach for, and any external integrations already approved.
- **Workflow loop** — the per-Z loop the agent follows, and where to find docs.

The body of `AGENTS.md` is editable by you. Treat it as a living document, not a one-shot setup. Update it as the project changes (new framework adopted, new MCP approved, etc.).

## Why it exists

Without `AGENTS.md`, every new session starts from zero. The agent has to re-discover the project, ask the same questions, and make the same mistakes. With it, the agent always boots with full project context — the workflow it should follow, the stack it should write against, and the design system it should respect.

## What it does NOT do

- It does not contain the per-Z plan, spec, debug, or version documents (those live in `docs/vX.Y/vX.Y.Z/`).
- It does not replace `design-system.md` — that file is referenced from `AGENTS.md` but lives separately.
- It does not auto-update itself. You edit it as the project evolves.

[← 06-commit](06-commit.md) · [Back to README →](../README.md)