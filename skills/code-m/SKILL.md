---
name: code-m
description: User invokes once to implement a signed spec and run runtime verification. User testing then happens in chat; agent edits code in place and recommends appending any drift to `plan.md` or `spec.md`.
---

## What this skill does

**Trigger.** User invokes once, after signing `docs/vX.Y/vX.Y.Z/spec.md`.

**Execution order.**

1. **Read the contract.** Read the full `spec.md`, including existing `## Updated` entries.
2. **Implement.** Follow `### C. Code Skeleton` in implementation order and create, modify, or delete every file listed in `### B. File Change List`.
3. **Verify.**
   - Use Playwright MCP for applicable user flows. If unavailable or failing, stop and ask user to choose `skip` or `reconfigure + retry`.
   - If a browser action fails, retry with another selector or approach.
   - Give user 3–5 high-level UI/UX scenarios to verify manually.

Then report in chat: created, modified, and deleted files; Playwright result; and manual scenarios. Verification results and manual scenarios stay in chat; do not add a Verification section to `spec.md`.

**User testing.** After `code-m` finishes, the user tests the artifact in chat. `code-m` is NOT re-invoked. Instead, for each user-reported change the agent:

1. Applies the code edit in place.
2. Classifies which contract the drift came from:
   - **Drifts from `plan.md`** (user-action logic, business rules, closure-loop behavior in B) → recommend append to `plan.md ## Updated`.
   - **Drifts from `spec.md`** (interfaces, data structures, function signatures, pseudocode in C) → recommend append to `spec.md ## Updated`.
   - **Drifts from neither** (visual micro-detail, refactor, naming tweak, bug fix that does not change contract) → no append. Apply directly.
3. Reports in chat: `Changed: <one line>; Recommended: <plan.md | spec.md | none>; Reason: <why>`.
4. Waits for user to confirm `yes` / `skip` / `override to <other>` before appending.

Each append uses the format `- code-m: <reason>; see <file>:<line>`. Create `## Updated` on the target file if absent.

If a user-reported change is a brand-new feature neither plan nor spec covers, do not append to either; tell the user to re-invoke `todo-m` to add a new subheading.

## Why this skill exists

`code-m` is the controlled execution step between the signed spec and user testing. It implements the spec, verifies the result, and hands user a tested artifact.

User testing exposes the inevitable gap between the spec as written and the spec as needed. By applying the edit in chat and recommending a `## Updated` append — instead of re-invoking `code-m` — the change is recorded in the contract it actually drifted from, leaving the original spec body intact as the design record.

## What this skill does NOT do

- Wait for a re-invocation after user testing. All post-Verify edits happen in chat during this single invocation.
- Skip or reorder the spec's `### C. Code Skeleton` implementation order.
- Edit the `spec.md` body (only `## Updated`).
- Modify `plan.md` body, `todo.md`, `version.md`, or `AGENTS.md`.
- Append to `plan.md ## Updated` or `spec.md ## Updated` without user confirmation.
- Commit changes.