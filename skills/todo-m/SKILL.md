---
name: todo-m
description: User invokes at ANY workflow stage to discuss `docs/vX.Y/todo.md` questions. Writes or edits the file only if discussion leads to a change. Returns to the current stage after.
---

## What this skill does

**Trigger.** User invokes **at any workflow stage** to discuss `docs/vX.Y/todo.md`. After discussion, returns to caller (no workflow advance). Common cases:
- **New major-version vX.Y entry**: most common; user says "start v0.5" (with or without requirements) → discusses and (if confirmed) writes fresh `docs/vX.Y/todo.md`.
- **Mid-version adjust**: re-order subversions, rename, split, etc.
- **Think about todos**: pure discussion, may not result in a write.

**Inputs.**
- User's request (intent for `todo.md`).
- Existing `docs/vX.Y/todo.md` (read + edit + write, if it exists).

**Outputs.** `docs/vX.Y/todo.md` (possibly edited). Two sections:

```markdown
# v0.5 Todo

**Goal**: <summary>
**Why**: <motivation>

---

## subversions
- [ ] v0.5.0 base — <description>
- [ ] v0.5.1 polish — <description>

## Updated

### Updates to existing subversions
- v0.5.0 — <owner>: <reason>; see <cross-ref>      ← Z = the subversion being updated

### New subversions added
- v0.5.2 — <owner>: <reason>; see <cross-ref>      ← Z = subversions list length at append time
```

**Format rules.**
- File: `docs/vX.Y/todo.md` (one per major version).
- Subversion line: `- [ ] v<X.Y.Z> <type> — <description>`. `<type>` is part of the description, NOT a version-number suffix.
- The `## subversions` body is only editable during the `todo-m` stage (before `plan-m` is first invoked for this version). After that it is LOCKED: any change must either append to `## Updated` or create a new version `docs/vX+1/todo.md`. Exception: `commit-m` may still flip `[ ]` to `[x]`.
- `## Updated` is split into two sub-sections. Each line uses `v<X.Y.Z>` (NOT `YYYY-MM-DD`) as the version identifier:
  - `### Updates to existing subversions` — Z = position of the subversion being changed.
  - `### New subversions added` — Z = subversions list length at append time (e.g., list `[v0.5.0, v0.5.1]` → new is `v0.5.2`).
- `commit-m` uses 1-indexed position in the subversions list to verify the Z matches the order.

## Why this skill exists

**Universal body-lock principle.** Every doc body (plan.md / spec.md / todo.md) is written ONCE during its first phase, then locked FOREVER. Later corrections append to the relevant document's `## Updated` section. This keeps bodies as stable snapshots of intent and `## Updated` as the changelog.

For `todo.md`, the `## subversions` body exits its editable phase when the workflow enters `plan-m` for the first time. After that, only `## Updated` appends are allowed, or a new version todo.md must be created.

This skill's main work is **discussion**, not writing. The write is the END output, after user sign-off.

1. Discuss what should change in `docs/vX.Y/todo.md` (scope, subversions, split, reorder).
2. Summarize the proposed change.
3. User signs off.
4. Write / edit the file.

If discussion is pure exploration (think-out-loud), step 4 is skipped.

## What this skill does NOT do

- Modify any file other than `docs/vX.Y/todo.md` (no plan / spec / version / code).
- Flip `[ ]` to `[x]`.
- Skip Z-number mapping (Z comes from position, never authored).
