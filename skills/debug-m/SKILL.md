---
name: debug-m
description: User invokes after deciding a user-testing outcome in chat. Applies the outcome's code or todo action, then records one `debug.md` section last.
---

## What this skill does

**Trigger.** User invokes with an outcome name — 4 from chat with `code-m` (`no issues`, `nit`, `defer`, `preference shift`) plus `unfixed` (escalated by `debug-m` when `nit` fails — see Escalation below). `debug-m` performs the action and writes the section; it does not classify the outcome.

**Outcome actions.**

| Branch | Outcome | Action before logging | Section title |
|---|---|---|---|
| Bug | `no issues` | none | `## Bug: no issues — <brief>` |
| Bug | `nit` | apply the immediate code fix | `## Bug: nit — <brief>` |
| Bug | `unfixed` | remove the broken feature from the code | `## Bug: unfixed — <brief>` |
| Not-bug | `defer` | append `- debug-m: <reason>` to `docs/vX.Y/todo.md ## Updated` | `## Not-bug: defer — <brief>` |
| Not-bug | `preference shift` | apply the immediate code change | `## Not-bug: preference shift — <brief>` |

**Escalation: `nit` → `unfixed`.** If the `nit` action (apply code fix) is attempted but keeps failing, the agent reports the failure and asks if you want to remove the broken feature instead. If you agree, the outcome becomes `unfixed`: the agent removes the feature and writes `## Bug: unfixed — <brief>` (replacing the `nit` section per the section-continuation rule below).

**Execution order.**

1. Read the decided outcome from chat and the existing `docs/vX.Y/vX.Y.Z/debug.md`, if present.
2. Perform the outcome action from the table.
3. Create `debug.md` if absent, then write the section last:
   - If chat continues the previous section's topic, replace that section with the latest result.
   - If it is a new issue, append a new section.
   - If the action failed, record the failure instead of claiming success.
4. Report what was done in chat.

**Section format.**

```markdown
## <Bug | Not-bug>: <outcome> — <brief title>

<what was discussed and what was done>
```

For `nit`, cite the changed file and line. For `unfixed`, cite the removed file(s) and explain why the feature was removed. For `preference shift`, describe the behavior change and cite the changed file and line. For `defer`, state what was deferred. Do not add a separate `Status` field.

## Why this skill exists

`debug-m` turns an outcome already decided during user testing into commit-ready state. It performs the agreed action and creates a durable `debug.md` record.

Writing the section last keeps the record truthful. Replacing a continuation prevents duplicate history for one unresolved issue, while appending new issues preserves separate outcomes.

## What this skill does NOT do

- Discuss, classify, or decide the outcome.
- Modify `plan.md`, `spec.md`, `version.md`, or `AGENTS.md`.
- Modify `todo.md` except for a `defer` outcome.
- Modify code except for the immediate `nit`, `unfixed`, or `preference shift` action.
- Write the `debug.md` section before attempting the outcome action.
- Commit changes. (That is `commit-m` — invoke it after all issues are processed.)
