# 05 — debug

`debug-m` is the skill that applies a user-testing outcome (already decided in chat) and records it in `docs/vX.Y/vX.Y.Z/debug.md`.

[← 04-code](04-code.md) · [Next: 06-commit →](06-commit.md)

## What it does

You invoke `debug-m` after deciding a user-testing outcome in chat. The 5 outcomes are — 4 from initial chat (`no issues`, `nit`, `defer`, `preference shift`) plus `unfixed` (escalated by `debug-m` from `nit` failure, see below):

| Branch | Outcome | Action before logging | Section title |
|---|---|---|---|
| Bug | `no issues` | none | `## Bug: no issues — <brief>` |
| Bug | `nit` | apply the immediate code fix | `## Bug: nit — <brief>` |
| Bug | `unfixed` | remove the broken feature from the code | `## Bug: unfixed — <brief>` |
| Not-bug | `defer` | append `- debug-m: <reason>` to `docs/vX.Y/todo.md ## Updated` | `## Not-bug: defer — <brief>` |
| Not-bug | `preference shift` | apply the immediate code change | `## Not-bug: preference shift — <brief>` |

`debug-m` performs the action from the table, then writes the section last. It does NOT classify the outcome — you do that during chat with `code-m`.

**Escalation: `nit` → `unfixed`.** If the `nit` action (apply code fix) is attempted but keeps failing, the agent reports the failure and asks if you want to remove the broken feature instead. If you agree, the outcome becomes `unfixed`: the agent removes the feature and writes `## Bug: unfixed — <brief>` (replacing the `nit` section per the section-continuation rule below).

## Execution order

The agent does these in sequence:

1. Read the decided outcome from chat and the existing `docs/vX.Y/vX.Y.Z/debug.md`, if present.
2. Perform the outcome action from the table.
3. Create `debug.md` if absent, then write the section last:
   - If chat continues the previous section's topic, replace that section with the latest result.
   - If it is a new issue, append a new section.
   - If the action failed, record the failure instead of claiming success.
4. Report what was done in chat.

## Section format

```markdown
## <Bug | Not-bug>: <outcome> — <brief title>

<what was discussed and what was done>
```

For `nit`, cite the changed file and line. For `unfixed`, cite the removed file(s) and explain why the feature was removed. For `preference shift`, describe the behavior change and cite the changed file and line. For `defer`, state what was deferred. Do NOT add a separate `Status` field.

## Why write the section last

Writing the section after the action keeps the record truthful. Replacing a continuation prevents duplicate history for one unresolved issue, while appending new issues preserves separate outcomes.

## What it does NOT do

- Discuss, classify, or decide the outcome (you do that during chat).
- Modify `plan.md`, `spec.md`, `version.md`, or `AGENTS.md`.
- Modify `todo.md` except for a `defer` outcome.
- Modify code except for the immediate `nit`, `unfixed`, or `preference shift` action.
- Write the `debug.md` section before attempting the outcome action.
- Commit changes (that is `commit-m`).

[← 04-code](04-code.md) · [Next: 06-commit →](06-commit.md)