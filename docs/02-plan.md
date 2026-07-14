# 02 — plan

`plan-m` is the skill that turns a selected unchecked subheading in `todo.md` into a Z-level plan. A plan is the agreed design BEFORE implementation details are written.

[← 01-todo](01-todo.md) · [Next: 03-spec →](03-spec.md)

## What it does

You invoke `plan-m` either:

- For a selected unchecked subheading in `docs/vX.Y/todo.md` (the common case), or
- After discussing a plan issue recorded by `spec-m` in `plan.md ## Updated`.

It writes `docs/vX.Y/vX.Y.Z/plan.md` with four blocks (A. Purpose, B. UI/UX Operation Closure Loop, C. Edge Cases + Defaults, Q&A).

## The plan structure

```markdown
## v0.4.0 base

### A. Purpose

**Purpose**: Add Week view + Agenda view
**Background**: v0.3 only has Month view
**Scope**: <optional>
**Not in scope**: <optional>
**Dependencies**: <optional>

### B. UI/UX Operation Closure Loop

User clicks "Week mode" in Calendar top bar
  ↓
Sees a 7-column time grid
  ↓
Tasks render at their scheduledStart time
  ↓
Clicks a task → Edit modal opens

### C. Edge Cases + Default Recommendation

| Edge case | Options | Default |
|---|---|---|
| <case> | <2–3 options> | **<recommended option>** — <reason> |

### Q1-Qn

| # | Question | Default |
|---|---|---|
| Q1 | Use react-day-picker or hand-write the grid? | **Hand-written** — more flexible |
```

## What each block means

- **A. Purpose** — what changes, why, and what is in/out of scope. Also lists dependencies introduced by this Z.
- **B. UI/UX Operation Closure Loop** — user-action chain, no code. "Click → See → Render → Click modal opens" form.
- **C. Edge Cases + Default Recommendation** — for each edge case, 2–3 options with a recommended default and a reason.
- **Q&A** — every unresolved decision becomes a row with a default recommendation.

## Flow inside this skill

1. You select an unchecked subheading in `todo.md` (or you come from `spec-m` after a Plan Verification halt).
2. You and the agent discuss purpose, UI flow, edge cases, and open questions.
3. The agent drafts `plan.md`.
4. You iterate on `plan.md` through discussion.
5. When you are happy, you invoke `spec-m`.

## Rules

- Use the selected todo item's Z number and label for the plan heading; never invent Z.
- A says what changes. B gives the user-action chain without code. C gives 2–3 options per edge case and recommends one.
- Always end with a Q&A table.
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