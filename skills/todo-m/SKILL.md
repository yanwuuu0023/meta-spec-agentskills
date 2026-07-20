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
- YYYY-MM-DD — <owner>: <reason>; see <cross-ref>      ← appended by this skill only
```

**Format rules.**
- File: `docs/vX.Y/todo.md` (one per major version).
- Subheading: `- [ ] v<X.Y.Z> <type> — <description>`. `<type>` is part of the description line, NOT a version-number suffix.
- User writes the full subheading line per the template above, including the `v<X.Y.Z>` prefix. `commit-m` uses 1-indexed position to verify the Z matches the order.
- `## Updated` section is appended by this skill (mid-version adjustments via discussion). Each line: `YYYY-MM-DD — <owner>: <reason>; see <cross-ref>`.

## Why this skill exists

**Universal body-lock principle.** Every doc body (plan.md / spec.md / todo.md) is written ONCE during its first phase, then locked FOREVER. Later corrections append to the relevant document's `## Updated` section. This keeps bodies as stable snapshots of intent and `## Updated` as the changelog.

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
