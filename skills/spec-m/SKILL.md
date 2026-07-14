---
name: spec-m
description: User invokes to verify an agreed plan and turn it into a Z-level implementation spec, or to continue after an agreed Plan Verification correction.
---

## What this skill does

**Trigger.** User invokes either:
- after agreeing on `docs/vX.Y/vX.Y.Z/plan.md`, or
- after `plan-m` appends an agreed Plan Verification correction to `plan.md ## Updated`.

**Step 1 — Verify the plan.** Run all six checks before drafting `spec.md`:

| Type | Check |
|---|---|
| Hard | Boundary defaults cover cross-day, cross-month, empty, and edge-time cases |
| Hard | All dependencies, including implicit utilities and hooks, are declared |
| Hard | The boundary between this Z and later Zs is explicit |
| Soft | UI closure-loop data sources are named |
| Soft | Colors align with `design-system.md` tokens |
| Soft | Storage and types are consistent and schema-compatible |

If any check fails:
1. Append `- spec-m: <reason>` to `plan.md ## Updated`.
2. Stop before drafting or updating `spec.md`.
3. Report `Spec-m Halt on Plan Verification`, grouped into `[Hard]` and `[Soft]`; include suggestions for soft failures only.
4. Wait for user to discuss the issue and re-invoke `plan-m`.

**Step 2 — Write the spec.** When all checks pass, write `docs/vX.Y/vX.Y.Z/spec.md` using this structure:

```markdown
## v0.4.0 base

### A. Plan Reference + Plan Verification

**Plan**: <plan subheading>
**Decisions**: <concise summary>

- [x] Boundary default coverage
- [x] Dependency declaration completeness
- [x] Version-boundary contract
- [x] UI closure-loop data sources named
- [x] Color token alignment
- [x] Storage / type consistency

### B. File Change List

- Add: `src/...`
- Modify: `src/...`
- Delete: `src/...`

### C. Code Skeleton

<interfaces, data structures, function signatures, and pseudocode; no full implementation>

### D. Implementation Steps

1. <independently verifiable step>
2. <independently verifiable step>
```

Rules:
- A names the plan subheading, summarizes its decisions, and records all six passed checks.
- B lists every file to add, modify, or delete.
- C defines the implementation shape without full code.
- D gives ordered, independently verifiable steps.
- Edit `spec.md` through discussion until user invokes `code-m`.

**After a Plan Verification correction.** Re-run all six checks. Once they pass, write or update the spec, create `## Updated` if absent, and append `- plan update: <reason>; see plan.md ## Updated "<line text>"`.

## Why this skill exists

`spec-m` is the implementation contract between the agreed plan and `code-m`. It verifies that the design is complete, then translates it into concrete file changes, code shape, and ordered steps so `code-m` does not invent missing behavior.

A failed Plan Verification returns the issue to planning before implementation instructions are written. Once user invokes `code-m`, the spec body becomes a stable contract; later code-phase decisions are recorded in `spec.md ## Updated` by `code-m`.

## What this skill does NOT do

- Draft or update `spec.md` while any Plan Verification check fails.
- Change plan decisions; append the issue to `plan.md ## Updated` and stop.
- Write full implementation code.
- Change `spec.md` without user confirmation.
- Edit the spec body after `code-m` is first invoked.
