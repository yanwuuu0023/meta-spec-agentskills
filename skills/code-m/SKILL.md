---
name: code-m
description: User invokes to implement a signed spec and run runtime verification. May be re-invoked after user testing to address in-code or verification issues; records confirmed code decisions in `spec.md ## Updated`.
---

## What this skill does

**Trigger.** User invokes either:
- after signing `docs/vX.Y/vX.Y.Z/spec.md`, or
- after user testing surfaced an issue and user wants the code changed.

**Execution order.**

1. **Read the contract.** Read the full `spec.md`, including existing `## Updated` entries.
2. **Implement.** Follow `### D. Implementation Steps` in order and create, modify, or delete every file listed in `### B. File Change List`.
3. **Verify.**
   - Use Playwright MCP for applicable user flows. If unavailable or failing, stop and ask user to choose `skip` or `reconfigure + retry`.
   - If a browser action fails, retry with another selector or approach.
   - If behavior runs but does not match the spec, use the discuss-confirm flow below.
   - Give user 3–5 high-level UI/UX scenarios to verify manually.

Then report in chat: created, modified, and deleted files; `spec.md ## Updated` entries; Playwright result; and manual scenarios. Verification results and manual scenarios stay in chat; do not add a Verification section to `spec.md`.

**Discuss-confirm.** Used both during initial verification AND when user re-invokes after user testing. If the issue is:
- **Code detail** (visual micro-adjustment, 2px / color / spacing not pinned by spec — spec does NOT cover this) → apply directly, append `- code update: <reason>; see <file>:<line>` to `spec.md ## Updated`, no other file touched.
- **Spec gap** (spec said X but behavior is Y, or spec is silent on something user now wants) → stop, explain what needs to change, ask user to re-invoke `spec-m` (or `plan-m`) first.

Steps:
1. Stop before applying the unapproved change and explain what is needed.
2. Wait for user to discuss it and re-invoke `code-m` with confirmation.
3. Apply the change, then create `spec.md ## Updated` if absent and append `- code update: <reason>; see <file>:<line>`.
4. Continue from the interrupted implementation or verification step.

`code-m` is re-invoked freely for in-code issues. It is NOT the right tool when the user wants to **change the plan** (re-invoke `plan-m`) or **add a new todo** (re-invoke `todo-m`).

## Why this skill exists

`code-m` is the controlled execution step between the signed spec and user testing. It follows the spec's file list and implementation steps, verifies the resulting behavior, and hands user a tested artifact with the next step already in view.

Confirmed in-code changes are applied before they are appended to `spec.md ## Updated`, keeping the locked spec body as the original contract and the Updated section as an accurate record of what changed during implementation.

## What this skill does NOT do

- Skip or reorder the spec's Implementation Steps.
- Apply an in-code decision before user confirms it by re-invoking `code-m`.
- Edit the `spec.md` body.
- Modify `plan.md`, `todo.md`, `version.md`, or `AGENTS.md`.
- Classify what kind of user-testing issue it is — that is the user's call.
- Commit changes.
