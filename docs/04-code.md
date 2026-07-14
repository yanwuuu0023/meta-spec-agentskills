# 04 — code

`code-m` is the skill that implements a signed spec and runs runtime verification. After `code-m` finishes, you do user testing in chat, then invoke `debug-m` per issue, then `commit-m`.

[← 03-spec](03-spec.md) · [Next: 05-debug →](05-debug.md)

## What it does

You invoke `code-m` either:

- After signing `docs/vX.Y/vX.Y.Z/spec.md`, or
- After discussing an in-code or verification issue and confirming the proposed change.

It follows the spec exactly: read it, implement the file changes in order, verify, hand back to you for manual testing.

## Execution order

The agent does these in sequence:

1. **Read the contract.** Read the full `spec.md`, including existing `## Updated` entries.
2. **Implement.** Follow `### D. Implementation Steps` in order and create, modify, or delete every file listed in `### B. File Change List`.
3. **Verify.**
   - Use Playwright MCP for applicable user flows. If unavailable or failing, stop and ask you to choose `skip` or `reconfigure + retry`.
   - If a browser action fails, retry with another selector or approach.
   - If behavior runs but does not match the spec, use the stop-discuss-confirm flow below.
   - Give you 3–5 high-level UI/UX scenarios to verify manually.

Then report in chat:

- Created, modified, and deleted files.
- `spec.md ## Updated` entries.
- Playwright result.
- Manual scenarios.

Verification results and manual scenarios stay in chat; do NOT add a Verification section to `spec.md`.

## Stop-discuss-confirm

If implementation reveals a missing small detail, or verification finds behavior that does not match the spec:

1. Stop before applying the unapproved change and explain what is needed.
2. Wait for you to discuss it and re-invoke `code-m` with confirmation.
3. Apply the change, then create `spec.md ## Updated` if absent and append `- code update: <reason>; see <file>:<line>`.
4. Continue from the interrupted step.

`code-m` completes implementation and verification once per Z. It is NOT re-invoked for user-testing issues — those go to `debug-m`.

## User testing stage (the handoff)

This is NOT part of `code-m`. It is the state between `code-m` returning and you invoking `debug-m` (then `commit-m`).

After `code-m` returns, you test the code in chat. Each issue (or the whole pass) is classified by you into one of 4 outcomes:

| Branch | Outcome |
|---|---|
| Bug | `no issues` |
| Bug | `nit` |
| Not-bug | `defer` |
| Not-bug | `preference shift` |

**Matching examples.** Some concrete cases to help you classify:

| What you report | Likely outcome | Why |
|---|---|---|
| "Button is 2px to the left" | `nit` | small visual fix, apply now |
| "Color should be blue, not green" | `nit` | small visual fix, apply now |
| "When I click, I get a 500 error" | `nit` | small code fix, apply now |
| "Clicking the button does nothing" | `nit` | functional bug, fix now |
| "Clicking the button should open a modal" | `preference shift` | operation logic change, apply now |
| "Want a totally new design" | `defer` | new feature, separate Z |
| "Everything works, ship it" | `no issues` | pass |

You decide during chat, using the 4 outcomes as the reference for matching the report to the right one. After classification, you invoke `debug-m` with the decided outcome name; `debug-m` performs the action and writes the section. The agent does not classify the outcome for you.

When all issues are recorded, you invoke `commit-m` to finalize the Z.

## What it does NOT do

- Skip or reorder the spec's Implementation Steps.
- Apply an in-code decision before you confirm it by re-invoking `code-m`.
- Edit the `spec.md` body (only `## Updated`).
- Modify `plan.md`, `todo.md`, `debug.md`, `version.md`, or `AGENTS.md`.
- Handle issues found during subsequent user testing (that is `debug-m`).
- Classify user-testing outcome (you decide in chat).
- Commit changes (that is `commit-m`).

[← 03-spec](03-spec.md) · [Next: 05-debug →](05-debug.md)