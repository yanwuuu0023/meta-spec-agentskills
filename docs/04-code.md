# 04 — code

`code-m` is the skill that implements a signed spec and runs runtime verification. After `code-m` finishes, you do user testing in chat, then either re-invoke `code-m` for in-code issues or `plan-m` / `spec-m` for spec-level changes, then `commit-m`.

[← 03-spec](03-spec.md) · [Next: 05-commit →](05-commit.md)

## What it does

You invoke `code-m` either:

- After signing `docs/vX.Y/vX.Y.Z/spec.md`, or
- After user testing surfaced an issue and you want the code changed.

It follows the spec exactly: read it, implement the file changes in order, verify, hand back to you for manual testing.

## Execution order

The agent does these in sequence:

1. **Read the contract.** Read the full `spec.md`, including existing `## Updated` entries.
2. **Implement.** Follow `### D. Implementation Steps` in order and create, modify, or delete every file listed in `### B. File Change List`.
3. **Verify.**
   - Use Playwright MCP for applicable user flows. If unavailable or failing, stop and ask you to choose `skip` or `reconfigure + retry`.
   - If a browser action fails, retry with another selector or approach.
   - If behavior runs but does not match the spec, use the discuss-confirm flow below.
   - Give you 3–5 high-level UI/UX scenarios to verify manually.

Then report in chat:

- Created, modified, and deleted files.
- `spec.md ## Updated` entries.
- Playwright result.
- Manual scenarios.

Verification results and manual scenarios stay in chat; do NOT add a Verification section to `spec.md`.

## Discuss-confirm

Used both during initial verification AND when you re-invoke after user testing. If the issue is:

- **Code detail** (visual micro-adjustment, 2px / color / spacing not pinned by spec — spec does NOT cover this) → apply directly, append `- code update: <reason>; see <file>:<line>` to `spec.md ## Updated`, no other file touched.
- **Spec gap** (spec said X but behavior is Y, or spec is silent on something you now want) → stop, explain what needs to change, ask you to re-invoke `spec-m` (or `plan-m`) first.

Steps:
1. Stop before applying the unapproved change and explain what is needed.
2. Wait for you to discuss it and re-invoke `code-m` with confirmation.
3. Apply the change, then create `spec.md ## Updated` if absent and append `- code update: <reason>; see <file>:<line>`.
4. Continue from the interrupted step.

`code-m` is re-invoked freely for in-code issues. It is NOT the right tool when you want to **change the plan** (re-invoke `plan-m`) or **add a new todo** (re-invoke `todo-m`).

## What it does NOT do

- Skip or reorder the spec's Implementation Steps.
- Apply an in-code decision before you confirm it by re-invoking `code-m`.
- Edit the `spec.md` body (only `## Updated`).
- Modify `plan.md`, `todo.md`, `version.md`, or `AGENTS.md`.
- Classify what kind of user-testing issue it is — that is your call.
- Commit changes (that is `commit-m`).

[← 03-spec](03-spec.md) · [Next: 05-commit →](05-commit.md)
