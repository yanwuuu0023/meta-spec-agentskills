# 02 — plan

`plan-m` is the skill that turns a selected unchecked subheading in `todo.md` into a Z-level plan. A plan is the agreed design BEFORE implementation details are written.

[← 01-todo](01-todo.md) · [Next: 03-spec →](03-spec.md)

## What it does

You invoke `plan-m` either:

- For a selected unchecked subheading in `docs/vX.Y/todo.md` (the common case), or
- After discussing a plan issue recorded by `spec-m` in `plan.md ## Updated`.

**No-prompt write.** If you invoke with no extra description, the agent writes `plan.md` immediately from `docs/vX.Y/todo.md` and `docs/vX.Y/version.md` context — you read and edit the file yourself.

## The plan structure

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

## What each block means

- **A. Goal** — what this version changes, why, and what is in/out of scope. Also lists dependencies introduced by this Z.
- **B. UI/UX Operation Closure Loop** — user-action chain, no code. "Click → See → Render → Click modal opens" form.
- **C. Edge Cases & Open Decisions** — every edge case and open decision, phrased as a question, with a default recommendation.

## Flow inside this skill

1. You select an unchecked subheading in `todo.md` (or you come from `spec-m` after a Plan Verification halt).
2. The agent writes `plan.md` (or you and the agent discuss purpose, UI flow, edge cases, and open questions).
3. You iterate on `plan.md` through discussion.
4. When you are happy, you invoke `spec-m`.

## Rules

- Use the selected todo item's Z number and label for the plan heading; never invent Z.
- A states what changes. B gives user-action chain without code. C lists every edge case and open decision with a default recommendation.
- A also lists the endpoints this Z touches (or "none") so the API surface is explicit before spec.
- **C addresses B's UI/UX Operation Closure Loop; if this Z does not touch the closure loop, keep C minimal or skip it.**
- **Every time B is edited, review C for drift and update it.**
- List dependencies introduced by this Z under A.
- `plan.md` is editable through discussion UNTIL you invoke `spec-m`. After `spec-m`, the plan body is locked.

## Plan Verification correction

When `spec-m` halts on a Plan Verification check, you re-invoke `plan-m` to discuss the issue. After agreement, `plan-m` appends `- plan-m: <agreed correction>` to `plan.md ## Updated` — it does NOT edit the plan body. Then you re-invoke `spec-m`.

## What it does NOT do

- Write code, schemas, signatures, or implementation steps (that is `spec-m`).
- Modify files other than `plan.md`.
- Change `plan.md` without your confirmation.
- Edit the plan body after `spec-m` is first invoked.
- Add cross-references to `plan.md ## Updated` entries.

[← 01-todo](01-todo.md) · [Next: 03-spec →](03-spec.md)
