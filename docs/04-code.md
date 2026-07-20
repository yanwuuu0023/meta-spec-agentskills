# 04 — code

`code-m` is the skill that implements a signed spec, runs runtime verification, then handles user testing in chat. `code-m` is invoked **once** per Z — user testing does NOT re-invoke it.

[← 03-spec](03-spec.md) · [Next: 05-commit →](05-commit.md)

## What it does

You invoke `code-m` after signing `docs/vX.Y/vX.Y.Z/spec.md`. It implements the spec, verifies the artifact, then stays in chat with you for user testing.

## Execution order

The agent does these in sequence:

1. **Read the contract.** Read the full `spec.md`, including existing `## Updated` entries.
2. **Implement.** Follow `### C. Code Skeleton` in implementation order and create, modify, or delete every file listed in `### B. File Change List`.
3. **Verify.**
   - Use Playwright MCP for applicable user flows. If unavailable or failing, stop and ask you to choose `skip` or `reconfigure + retry`.
   - If a browser action fails, retry with another selector or approach.
   - Give you 3–5 high-level UI/UX scenarios to verify manually.

Then report in chat: created, modified, and deleted files; Playwright result; and manual scenarios. Verification results and manual scenarios stay in chat; do NOT add a Verification section to `spec.md`.

## User testing

After `code-m` finishes, you test the artifact in chat. `code-m` is NOT re-invoked. For each change you ask for, the agent:

1. Applies the code edit in place.
2. Classifies which contract the drift came from:
   - **Drifts from `plan.md`** (user-action logic, business rules, closure-loop behavior in B) → recommend append to `plan.md ## Updated`.
   - **Drifts from `spec.md`** (interfaces, data structures, function signatures, pseudocode in C) → recommend append to `spec.md ## Updated`.
   - **Drifts from neither** (visual micro-detail, refactor, naming tweak, bug fix that does not change contract) → no append. Apply directly.
3. Reports: `Changed: <one line>; Recommended: <plan.md | spec.md | none>; Reason: <why>`.
4. Waits for your `yes` / `skip` / `override to <other>` before appending.

Each append uses the format `- code-m: <reason>; see <file>:<line>`. Create `## Updated` on the target file if absent.

If a change is a brand-new feature neither plan nor spec covers, the agent will NOT append — it tells you to re-invoke `todo-m` to add a new subheading.

## After user testing

When user testing passes (no more changes needed), invoke `commit-m` to finalize this Z.

## What it does NOT do

- Wait for a re-invocation after user testing. All post-Verify edits happen in chat during this single invocation.
- Skip or reorder the spec's `### C. Code Skeleton` implementation order.
- Edit the `spec.md` body (only `## Updated`).
- Modify `plan.md` body, `todo.md`, `version.md`, or `AGENTS.md`.
- Append to `plan.md ## Updated` or `spec.md ## Updated` without your confirmation.
- Commit changes (that is `commit-m`).

[← 03-spec](03-spec.md) · [Next: 05-commit →](05-commit.md)