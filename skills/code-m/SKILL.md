---
name: code-m
description: User invokes to implement a signed spec and run runtime verification. May be re-invoked after user confirms an in-code or verification issue; records confirmed code decisions in `spec.md ## Updated`.
---

## What this skill does

**Trigger.** User invokes either:
- after signing `docs/vX.Y/vX.Y.Z/spec.md`, or
- after discussing an in-code or verification issue and confirming the proposed change.

**Execution order.**

1. **Read the contract.** Read the full `spec.md`, including existing `## Updated` entries.
2. **Implement.** Follow `### D. Implementation Steps` in order and create, modify, or delete every file listed in `### B. File Change List`.
3. **Verify.**
   - Use Playwright MCP for applicable user flows. If unavailable or failing, stop and ask user to choose `skip` or `reconfigure + retry`.
   - If a browser action fails, retry with another selector or approach.
   - If behavior runs but does not match the spec, use the stop-discuss-confirm flow below.
   - Give user 3–5 high-level UI/UX scenarios to verify manually.

Then report in chat: created, modified, and deleted files; `spec.md ## Updated` entries; Playwright result; and manual scenarios. Verification results and manual scenarios stay in chat; do not add a Verification section to `spec.md`.

**Stop-discuss-confirm.** If implementation reveals a missing small detail, or verification finds behavior that does not match the spec:
1. Stop before applying the unapproved change and explain what is needed.
2. Wait for user to discuss it and re-invoke `code-m` with confirmation.
3. Apply the change, then create `spec.md ## Updated` if absent and append `- code update: <reason>; see <file>:<line>`.
4. Continue from the interrupted implementation or verification step.

`code-m` completes implementation and verification once per Z. It is NOT re-invoked for user-testing issues — those go to `debug-m`.

## User testing stage

This is **not** part of `code-m`'s execution. It is the state transition between `code-m` returning and user invoking `debug-m` (and later `commit-m`).

After `code-m` returns, user tests the code in chat. Each issue (or the whole pass) is classified by user into one of these 4 outcomes, which fall into 2 branches:

| Branch | Outcome |
|---|---|
| Bug | `no issues` |
| Bug | `nit` |
| Not-bug | `defer` |
| Not-bug | `preference shift` |

**Matching examples.** Concrete cases for grounding the classification:

| User report | Likely outcome | Why |
|---|---|---|
| "Button is 2px to the left" | `nit` | small visual fix, apply now |
| "Color should be blue, not green" | `nit` | small visual fix, apply now |
| "When I click, I get a 500 error" | `nit` | small code fix, apply now |
| "Clicking the button does nothing" | `nit` | functional bug, fix now |
| "Clicking the button should open a modal" | `preference shift` | operation logic change, apply now |
| "Want a totally new design" | `defer` | new feature, separate Z |
| "Everything works, ship it" | `no issues` | pass |

User decides during chat, using the 4 outcomes above as the reference for matching the report to the right one. After classification, user invokes `debug-m` with the decided outcome name; `debug-m` performs the action and writes the section.

When all issues are recorded, user invokes `commit-m` to finalize the Z.

## Why this skill exists

`code-m` is the controlled execution step between the signed spec and user testing. It follows the spec's file list and implementation steps, verifies the resulting behavior, and hands user a tested artifact with the next step already in view.

Confirmed in-code changes are applied before they are appended to `spec.md ## Updated`, keeping the locked spec body as the original contract and the Updated section as an accurate record of what changed during implementation.

## What this skill does NOT do

- Skip or reorder the spec's Implementation Steps.
- Apply an in-code decision before user confirms it by re-invoking `code-m`.
- Edit the `spec.md` body.
- Modify `plan.md`, `todo.md`, `debug.md`, `version.md`, or `AGENTS.md`.
- Handle issues found during subsequent user testing.
- Classify user-testing outcome (user decides in chat).
- Commit changes.