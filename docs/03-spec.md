# 03 — spec

`spec-m` is the skill that verifies the agreed plan and turns it into a Z-level implementation contract. The spec is what `code-m` later reads as instructions.

[← 02-plan](02-plan.md) · [Next: 04-code →](04-code.md)

## What it does

You invoke `spec-m` either:

- After agreeing on `docs/vX.Y/vX.Y.Z/plan.md`, or
- After `plan-m` appends an agreed Plan Verification correction to `plan.md ## Updated`.

**No-prompt write.** If you invoke with no extra description, the agent runs the three checks and writes `spec.md` immediately from `docs/vX.Y/vX.Y.Z/plan.md` and `docs/vX.Y/version.md` context — you read and edit the file yourself. Plan Verification halt still applies on any hard-check failure.

## Step 1 — Verify the plan (three checks)

| Type | Check |
|---|---|
| Hard | All dependencies, including implicit utilities and hooks, are declared |
| Hard | UI closure-loop data sources are named |
| Hard | Storage and types are consistent and schema-compatible |

When a check fails:

1. Append `- spec-m: <reason>` to `plan.md ## Updated`.
2. Stop before drafting or updating `spec.md`.
3. Report `Spec-m Halt on Plan Verification` listing every failed check.
4. Wait for you to discuss the issue and re-invoke `plan-m`.

## Step 2 — Write the spec

When all checks pass, write `docs/vX.Y/vX.Y.Z/spec.md`:

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

**API contract** (only if A listed endpoints):

| Method | Path | Request | Response | Errors |
|---|---|---|---|---|
| <verb> | `/api/...` | <body or "none"> | <body or "none"> | <status codes> |
```

## What each block means

- **A. Plan Reference** — names the plan subheading, summarizes its decisions, and records the Plan Verification result.
- **B. File Change List** — every file to add, modify, or delete.
- **C. Code Skeleton** — interfaces, types, function signatures, pseudocode in implementation order. NOT full implementation.

## After a Plan Verification correction

When invoked after a `plan-m` correction, `spec-m` re-runs all three checks. Once they pass, it writes or updates the spec, creates `## Updated` if absent, and appends `- plan update: <reason>; see plan.md ## Updated "<line text>"`.

## What it does NOT do

- Change plan decisions; append the issue to `plan.md ## Updated` and stop.
- Write full implementation code (that is `code-m`).
- Change `spec.md` without your confirmation.
- Edit the spec body after `code-m` is first invoked.

[← 02-plan](02-plan.md) · [Next: 04-code →](04-code.md)
