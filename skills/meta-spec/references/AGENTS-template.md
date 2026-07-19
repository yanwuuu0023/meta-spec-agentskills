# AGENTS.md

## Workflow

The loop:

```
todo-m → plan-m → spec-m → code-m → commit-m → plan-m
```

Loop until every item in `todo.md` is done.

Know which skill in the loop is current at every step by checking `/docs`.

User invokes each skill in order; never skip a step.

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
> does NOT duplicate it here.

---

## language preference

- Docs outputs: English or 中文 (user picks at step 2)
- code outputs: English
