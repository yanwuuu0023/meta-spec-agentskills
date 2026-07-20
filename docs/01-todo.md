# 01 — todo

`todo-m` is the skill that discusses and edits `docs/vX.Y/todo.md` — the version-level checklist that drives the rest of the workflow.

[← 00-meta-spec](00-meta-spec.md) · [Next: 02-plan →](02-plan.md)

## What it does

You invoke `todo-m` to discuss `todo.md` questions. With your sign-off, the file gets edited. Without it, nothing changes. Either way, you return to whatever skill you were on before — `todo-m` does not advance the workflow.

Common cases:

- **New major version entry**: you say "start v0.5" (with or without requirements) → discusses and (if confirmed) writes fresh `docs/vX.Y/todo.md`.
- **Mid-version adjust**: re-order subversions, rename, split.
- **Think about todos**: pure discussion, may not result in a write.

## When to invoke it

- Before starting any Z, to align on which subheading you are picking.
- Any time you want to add, remove, rename, or re-order subversions.
- After code-m surfaces a new piece of work mid-Z, to capture it as a new subheading.

## The file format

`todo.md` has two sections plus a header:

```markdown
# v0.5 Todo

**Goal**: <summary>
**Why**: <motivation>

---

## subversions
- [ ] v0.5.0 base — <description>
- [ ] v0.5.1 polish — <description>

## Updated
- YYYY-MM-DD — <owner>: <reason>; see <cross-ref>      ← appended by this skill
```

Rules:

- One `todo.md` per major version (`docs/v0.5/todo.md`, `docs/v0.6/todo.md`).
- Each subversion line has the form `- [ ] v<X.Y.Z> <type> — <description>`.
- The `## subversions` body is only editable during the `todo-m` stage (before `plan-m` is first invoked for this version). After that it is LOCKED: any change must either append to `## Updated` or create a new version `docs/vX+1/todo.md`. Exception: `commit-m` may still flip `[ ]` to `[x]`.
- The Z number (`0`, `1`, `2`, ...) is the 1-indexed position in the subversions list. `commit-m` uses this position to verify the Z number in each subversion line matches its place in the list.
- `## Updated` is appended by this skill (mid-version adjustments via discussion).

## Flow inside this skill

1. You and the agent discuss what should change in `todo.md` (scope, subversions, split, reorder).
2. The agent summarizes the proposed change.
3. You sign off.
4. The agent writes / edits the file.

If the discussion is pure exploration (think-out-loud), step 4 is skipped.

## Universal body-lock principle

Every doc body (`plan.md`, `spec.md`, `todo.md`) is written ONCE during its first phase, then locked FOREVER. Later corrections append to the document's `## Updated` section. This keeps bodies as stable snapshots of intent and `## Updated` as the changelog.

For `todo.md`, the `## subversions` body exits its editable phase when the workflow enters `plan-m` for the first time. After that, only `## Updated` appends are allowed, or a new version todo.md must be created.

## What it does NOT do

- Modify any file other than `docs/vX.Y/todo.md`.
- Flip `[ ]` to `[x]` (that is `commit-m`'s job).
- Invent Z numbers — Z comes from position, never authored.

[← 00-meta-spec](00-meta-spec.md) · [Next: 02-plan →](02-plan.md)
