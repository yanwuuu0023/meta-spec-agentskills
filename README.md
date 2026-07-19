# meta-spec-agentskills

If you've ever finished a project with an AI agent and realized you don't actually know what your code does — this is for you.

## Why your code became a mess

You give the agent a few prompts. It writes a lot of code at once. You test it. Something's wrong. You ask for a fix. The fix breaks something else. You ask for another fix. Two weeks later you have a pile of patches, you're afraid to touch anything, and you couldn't tell anyone what your project actually does.

That happens because the agent and you never wrote anything down. There was no plan, no record of what was decided, no list of what's done and what isn't. Everything lives in chat history that nobody can find again.

## What this gives you

A workflow that forces three things to be written down at every step:

- **What you agreed to build** — a plan, signed off before any code is written.
- **What the code is supposed to do** — a spec, treated as the contract.
- **What was decided during testing** — appended to the relevant doc's `## Updated` section.

When you're done, you have a folder of documents that explain exactly what your project is, why each piece exists, and what trade-offs you accepted along the way.

## How it works in practice

You adopt a fixed set of files in your project:

```
<project_root>/
├── AGENTS.md                              ← the rules your AI agent reads when it starts
├── design-system.md                       ← UI tokens (if your project has a UI)
└── docs/
    └── v1.0/                              ← one folder per major version
        ├── todo.md                        ← the checklist of small pieces to ship
        └── v1.0.0/                        ← one folder per small piece
            ├── plan.md                    ← what was agreed
            ├── spec.md                    ← the implementation contract
            └── version.md                 ← what actually shipped
```

You break your project into small pieces (called "Zs"). If `v1.0` is "ship the calendar feature", then `v1.0.0` might be "show the week view", `v1.0.1` might be "drag-and-drop events", and so on.

Note: in standard semver (npm, cargo, pip), `v1.0` and `v1.0.0` refer to the same release. Here, `v1.0` is the minor-version container that groups all `v1.0.x` sub-versions; `v1.0.0` is the first sub-version inside it. Think of it like mobile OS releases: "iOS 17" is one product release in customers' minds, but `17.0.1`, `17.0.2` are separate shipped commits.

For each small piece, you do the same five things in order:

```
todo-m → plan-m → spec-m → code-m → commit-m → plan-m (loop)
```

Each step writes one document. When you're done, you have one git commit per piece, one document per step, and an honest record of the project.

## The five steps

| # | Step | What it does |
|---|---|---|
| 00 | `meta-spec` | First-time setup. Creates the file tree above and the first commit. |
| 01 | `todo-m` | Update the checklist in `todo.md`. |
| 02 | `plan-m` | Write the plan for the small piece you're working on. |
| 03 | `spec-m` | Check the plan for gaps; write the spec. |
| 04 | `code-m` | Write the code; test it in a browser; hand back to you. |
| 05 | `commit-m` | Write what shipped; one git commit; check the box in `todo.md`. |

Per-step details: [00 — meta-spec](docs/00-meta-spec.md) · [01 — todo](docs/01-todo.md) · [02 — plan](docs/02-plan.md) · [03 — spec](docs/03-spec.md) · [04 — code](docs/04-code.md) · [05 — commit](docs/05-commit.md).

## AGENTS.md

A project-level `AGENTS.md` lives at your project root. The agent reads it at session start, so it boots with full project context. See [06 — AGENTS.md](docs/06-AGENTS.md).

## Install

Copy this repo's `skills/` folder into your AI agent's skills directory. The agent picks them up on the next session. Re-copy to update.

## Get started

Run `meta-spec` once per project. It checks whether your project is brand new (no manifest file, no source code, no git) or already has work (a manifest, a framework, and a module), walks you through a quick discussion, and creates the files plus the first commit. After that the per-piece loop starts. See [00 — meta-spec](docs/00-meta-spec.md) for both flows.

## Two rules

1. You run the steps. The agent doesn't.
2. The agent stops and discusses with you when it isn't 95% sure of the next step.
