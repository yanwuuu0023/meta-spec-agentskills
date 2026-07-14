# 03 — spec

`spec-m` is the skill that verifies the agreed plan and turns it into a Z-level implementation contract. The spec is what `code-m` later reads as instructions.

[← 02-plan](02-plan.md) · [Next: 04-code →](04-code.md)

## What it does

You invoke `spec-m` either:

- After agreeing on `docs/vX.Y/vX.Y.Z/plan.md`, or
- After `plan-m` appends an agreed Plan Verification correction to `plan.md ## Updated`.

It runs six verification checks on the plan. If any fail, it halts before writing the spec and reports back to you. If all pass, it writes `docs/vX.Y/vX.Y.Z/spec.md`.

## Step 1 — Verify the plan (six checks)

| Type | Check |
|---|---|
| Hard | Boundary defaults cover cross-day, cross-month, empty, and edge-time cases |
| Hard | All dependencies (including implicit utilities and hooks) are declared |
| Hard | The boundary between this Z and later Zs is explicit |
| Soft | UI closure-loop data sources are named |
| Soft | Colors align with `design-system.md` tokens |
| Soft | Storage and types are consistent and schema-compatible |

When a check fails:

1. Append `- spec-m: <reason>` to `plan.md ## Updated`.
2. Stop before drafting or updating `spec.md`.
3. Report `Spec-m Halt on Plan Verification`, grouped into `[Hard]` and `[Soft]`; include suggestions for soft failures only.
4. Wait for you to discuss the issue and re-invoke `plan-m`.

## Step 2 — Write the spec

When all checks pass, write `docs/vX.Y/vX.Y.Z/spec.md`:

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

## What each block means

- **A. Plan Reference + Plan Verification** — names the plan subheading, summarizes its decisions, and records all six passed checks as `[x]`.
- **B. File Change List** — every file to add, modify, or delete.
- **C. Code Skeleton** — interfaces, types, function signatures, pseudocode. NOT full implementation.
- **D. Implementation Steps** — ordered, independently verifiable steps.

## After a Plan Verification correction

When invoked after a `plan-m` correction, `spec-m` re-runs all six checks. Once they pass, it writes or updates the spec, creates `## Updated` if absent, and appends `- plan update: <reason>; see plan.md ## Updated "<line text>"`.

## What it does NOT do

- Draft or update `spec.md` while any Plan Verification check fails.
- Change plan decisions; append the issue to `plan.md ## Updated` and stop.
- Write full implementation code (that is `code-m`).
- Change `spec.md` without your confirmation.
- Edit the spec body after `code-m` is first invoked.

[← 02-plan](02-plan.md) · [Next: 04-code →](04-code.md)