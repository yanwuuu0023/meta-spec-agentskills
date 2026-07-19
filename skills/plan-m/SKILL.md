---
name: plan-m
description: User invokes to turn a selected todo subheading into a Z-level plan with purpose, user flow, edge-case defaults, and Q&A.
---

## What this skill does

**Trigger.** User invokes either:
- for a selected unchecked subheading in `docs/vX.Y/todo.md`, or
- after discussing a plan issue recorded by `spec-m` in `plan.md ## Updated`.

**No-prompt write.** If the user invokes with no extra description, write `plan.md` immediately from `docs/vX.Y/todo.md` and `docs/vX.Y/version.md` context — do not ask any clarifying question first. The user reads and edits the file themselves.

**Initial plan.** Write `docs/vX.Y/vX.Y.Z/plan.md` using this structure:

```markdown
## v0.4.0 base

### A. Goal

**Goal**: Add Week view + Agenda view
**Background**: v0.3 only has Month view
**Scope**: <optional>
**Not in scope**: <optional>
**Dependencies**: <optional>
**API**: <endpoints this Z touches, or "none">

### B. UI/UX Operation Closure Loop

User clicks "Week mode" in Calendar top bar
  ↓
Sees a 7-column time grid
  ↓
Tasks render at their scheduledStart time
  ↓
Clicks a task → Edit modal opens

### C. Edge Cases & Open Decisions

| # | Question / Edge case | Default |
|---|---|---|
| 1 | <edge case or open decision, phrased as a question> | **<option>** — <reason> |
```

Rules:
- Use the selected todo item's Z number and label for the plan heading; never invent Z.
- A states what changes. B gives user-action chain without code. C lists every edge case and open decision with a default recommendation.
- A also lists the endpoints this Z touches (or "none") so the API surface is explicit before spec.
- C addresses B's UI/UX Operation Closure Loop; if this Z does not touch the closure loop, keep C minimal or skip it.
- Every time B is edited, review C for drift and update it.
- List dependencies introduced by this Z under A.
- Edit `plan.md` through discussion until user invokes `spec-m`.

**Plan Verification correction.** When invoked after a `spec-m` halt, append `- plan-m: <agreed correction>` to `plan.md ## Updated`; do not edit the plan body.

## Why this skill exists

`plan-m` turns a todo-sized intention into an agreed design before implementation details are written. Purpose, user flow, edge-case defaults, and Q&A make user-visible behavior explicit enough for `spec-m` to verify and translate into code instructions.

The selected todo subheading keeps the plan tied to one Z. The plan remains editable during planning, then becomes a stable design record when user invokes `spec-m`; later Plan Verification corrections are appended instead of rewriting that record.

## What this skill does NOT do

- Write code, schemas, signatures, or implementation steps.
- Modify files other than `plan.md`.
- Change `plan.md` without user confirmation.
- Edit the plan body after `spec-m` is first invoked.
- Add cross-references to `plan.md ## Updated` entries.
