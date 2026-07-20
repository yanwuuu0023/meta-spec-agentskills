---
name: spec-m
description: User invokes to verify an agreed plan and turn it into a Z-level implementation spec, or to continue after an agreed Plan Verification correction.
---

## What this skill does

**Trigger.** User invokes either:
- after agreeing on `docs/vX.Y/vX.Y.Z/plan.md`, or
- after `plan-m` appends an agreed Plan Verification correction to `plan.md ## Updated`.

**No-prompt write.** If the user invokes with no extra description, run the three checks and write `spec.md` immediately from `docs/vX.Y/vX.Y.Z/plan.md` and `docs/vX.Y/overview.md` context — do not ask any clarifying question first. The user reads and edits the file themselves. Plan Verification halt still applies on any hard-check failure.

**Step 1 — Verify the plan.** Run all three checks before drafting `spec.md`:

| Type | Check |
|---|---|
| Hard | All dependencies, including implicit utilities and hooks, are declared |
| Hard | UI closure-loop data sources are named |
| Hard | Storage and types are consistent and schema-compatible |

If any check fails:
1. Append `- spec-m: <reason>` to `plan.md ## Updated`.
2. Stop before drafting or updating `spec.md`.
3. Report `Spec-m Halt on Plan Verification` listing every failed check.
4. Wait for user to discuss the issue and re-invoke `plan-m`.

**Step 2 — Write the spec.** When all checks pass, write `docs/vX.Y/vX.Y.Z/spec.md` using this structure:

```markdown
## v0.4.0 base

### A. Plan Reference

**Plan**: <plan subheading>
**Decisions**: <concise summary>
**Plan Verification**: passed all 3 checks.

### B. File Change List

- Add: `src/...`
- Modify: `src/...`
- Delete: `src/...`

### C. Code Skeleton

<interfaces, data structures, function signatures, and pseudocode in implementation order; no full implementation>
```

Rules:
- Edit `spec.md` through discussion until user invokes `code-m`.

**After a Plan Verification correction.** Re-run all three checks. Once they pass, write or update the spec, create `## Updated` if absent, and append `- plan update: <reason>; see plan.md ## Updated "<line text>"`.

**Code-phase append.** `code-m` may also append `- code-m: <reason>; see <file>:<line>` to `spec.md ## Updated` during user testing, when a change drifts from spec-level concerns (interfaces, data structures, function signatures, pseudocode in C). The agent recommends; user confirms before the append happens.

## Why this skill exists

`spec-m` is the implementation contract between the agreed plan and `code-m`. It verifies that the design is implementable, then translates it into concrete file changes and code shape so `code-m` does not invent missing behavior.

A failed Plan Verification returns the issue to planning before implementation instructions are written. Once user invokes `code-m`, the spec body becomes a stable contract; later code-phase decisions are recorded in `spec.md ## Updated` by `code-m`.

## What this skill does NOT do

- Change plan decisions; append the issue to `plan.md ## Updated` and stop.
- Write full implementation code.
- Change `spec.md` without user confirmation.
- Edit the spec body after `code-m` is first invoked.
