# AGENTS.md

## Workflow

The loop:

```
todo-m → plan-m → spec-m → code-m → commit-m → plan-m
```

Loop until every item in `todo.md` is done.

User invokes each skill in order; never skip a step.

The filesystem is the source of truth for stage. When chat context is lost or a new window opens, recover from `docs/`.

### Stage detection

Active Z = smallest-Z unchecked subheading in `docs/vX.Y/todo.md`. For that Z:

| `plan.md` | `spec.md` | Next skill |
|---|---|---|
| absent | absent | `plan-m` |
| exists | absent | `spec-m` |
| exists | exists | `code-m` or `commit-m` |

User says "continue" without a skill name → check this table.

### Body lock matrix

Before editing any doc body:

| Doc body | Editable until |
|---|---|
| `todo.md ## subversions` | first `plan-m` call for any Z in vX.Y |
| `plan.md` body | first `spec-m` call for this Z |
| `spec.md` body | first `code-m` call for this Z |

Locked bodies accept only `## Updated` appends.

### `## Updated` ownership

| Doc | Appended by |
|---|---|
| `todo.md ## Updated` | `todo-m` only |
| `plan.md ## Updated` | `plan-m` (correction) or `code-m` (drift) |
| `spec.md ## Updated` | `spec-m` (after plan update) or `code-m` (drift) |

Format: `- <skill-name>: <reason>; see <cross-ref>`. Create the section if absent.

### File layout (per vX.Y)

```
docs/vX.Y/
├── todo.md
├── overview.md       ← meta-spec (project context)
└── vX.Y.Z/
    ├── plan.md        ← plan-m
    ├── spec.md        ← spec-m
    └── version.md     ← commit-m (per-Z shipped record)
```

`overview.md` is the major-version context doc (bootstrap writes); `version.md` inside `vX.Y.Z/` is the per-Z shipped record (commit-m writes). Two different files.

Z comes from `todo.md` 1-indexed position; never authored.

Stop and discuss with user when not 95% sure what to do.

---

## Project Framework

### Frontend
- Framework: [e.g. Next.js 15 + React 19]
- Styling: [e.g. Tailwind CSS 4]
- State: [e.g. Zustand 5]
- [other]

### Backend
- Runtime: [e.g. Node.js 22]
- Framework: [e.g. Hono 4]
- DB: [e.g. PostgreSQL 16]
- [other]

### Build / Test / Deploy (optional)
- Package manager: [e.g. pnpm]
- Test: [e.g. Vitest + Playwright MCP]
- Deploy: [e.g. Vercel]
- [other]

### Code Style (optional)
- [e.g. TypeScript strict, ESLint + Prettier, Conventional commits]

---

## Visual System

> For colors, typography, spacing, and overall style see [`design-system.md`](./design-system.md).

---

## language preference

- Docs outputs: English or 中文 (user picks at step 2)
- code outputs: English
