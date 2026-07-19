---
name: commit-m
description: User invokes to finalize one Z: write its final `version.md`, create one git commit, flip the todo checkbox, and report what comes next.
---

## What this skill does

**Trigger.** User explicitly invokes `commit-m` to finalize the current Z.

**Execution order.**

1. **Write `docs/vX.Y/vX.Y.Z/version.md`.** Read the final code, `plan.md`, `spec.md`, and the selected `todo.md` item. Derive Z from that item's 1-indexed position, copy its subheading verbatim into the version heading, and use this format:

   ```markdown
   ## v0.4.0 add Week view to calendar

   ### What it does
   - <final user-visible behavior and important implementation details>

   ### How user uses it
   1. <final user-action step>

   ### Code changes
   - `src/components/CalendarView.tsx:1-80` — <actual change>
   ```

   Record the final result only. Base `How user uses it` on the plan's UI/UX operation loop, adjusted to match the final code. List actual changed files and line ranges.

2. **Handle new project-wide dependencies.** If any were introduced, stop and ask which entries to append to the existing `AGENTS.md ## Project Framework`. Continue only when user re-invokes `commit-m`; append approved entries, or make no change if user declines. If none were introduced, continue immediately.

3. **Create one git commit for this Z.** Include code, `plan.md`, `spec.md`, `version.md`, and any approved `AGENTS.md` addition. Use message `v<X.Y.Z> <subheading for this Z, copied verbatim>`.

4. **Flip the selected `todo.md` checkbox** from `[ ]` to `[x]`.

5. **Report in chat:** commit hash, remaining Z count, next unchecked subheading, and a suggestion to consider compressing the context window before continuing.

One Z always produces exactly one commit; never split or combine Zs.

## Why this skill exists

`commit-m` is the explicit, user-controlled boundary between an editable Z and a finalized Z. It captures the final result in `version.md`, creates the git snapshot, and updates the todo state only when user decides the Z is ready.

Keeping version documentation, commit creation, and task completion in one skill preserves a direct mapping among one todo item, one version document, and one commit.

## What this skill does NOT do

- Run or commit without explicit user invocation.
- Modify `plan.md` or `spec.md`.
- Change `todo.md` beyond flipping the selected checkbox.
- Split one Z across commits or combine multiple Zs.
- Append project-wide dependencies to `AGENTS.md` without user approval.
