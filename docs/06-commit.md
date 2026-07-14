# 06 — commit

`commit-m` is the skill that finalizes one Z: writes `version.md`, creates one git commit, flips the todo checkbox. It is the boundary between an editable Z and a finalized one.

[← 05-debug](05-debug.md) · [Next: 07-AGENTS →](07-AGENTS.md)

## What it does

You invoke `commit-m` explicitly to finalize the current Z.

## Execution order

The agent does these in sequence:

1. **Write `docs/vX.Y/vX.Y.Z/version.md`.** Read the final code, `plan.md`, `spec.md`, `debug.md`, and the selected `todo.md` item. Derive Z from that item's 1-indexed position, copy its subheading verbatim into the version heading, and use this format:

   ```markdown
   ## v0.4.0 add Week view to calendar

   ### What it does
   - <final user-visible behavior and important implementation details>
   - If any `unfixed` outcomes from `debug.md`, mention what was removed and why (e.g. "The 'Add Event' button could not be made to work as specified, so it was removed").

   ### How user uses it
   1. <final user-action step>

   ### Code changes
   - `src/components/CalendarView.tsx:1-80` — <actual change>
   - If `unfixed` outcomes, list removed files / lines.
   ```

   Record the final result only. Base `How user uses it` on the plan's UI/UX operation loop, adjusted to match the final code and debug outcomes. List actual changed files and line ranges.

2. **Handle new project-wide dependencies.** If any were introduced, STOP and ask which entries to append to the existing `AGENTS.md ## Project Framework`. Continue only when you re-invoke `commit-m`; append approved entries, or make no change if you decline. If none were introduced, continue immediately.

3. **Create one git commit for this Z.** Include code, `plan.md`, `spec.md`, `debug.md`, `version.md`, and any approved `AGENTS.md` addition. Use message `v<X.Y.Z> <subheading for this Z, copied verbatim>`.

4. **Flip the selected `todo.md` checkbox** from `[ ]` to `[x]`.

5. **Report in chat:**
   - commit hash
   - remaining Z count
   - next unchecked subheading
   - a suggestion to consider compressing the context window before continuing

## Iron rule

**One Z always produces exactly one commit; never split or combine Zs.**

## Why this skill exists

`commit-m` is the explicit, user-controlled boundary between an editable Z and a finalized Z. It captures the final result in `version.md`, creates the git snapshot, and updates the todo state only when YOU decide the Z is ready.

Keeping version documentation, commit creation, and task completion in one skill preserves a direct mapping: one todo item ↔ one version document ↔ one commit.

## After commit

The per-Z loop continues:

```
todo-m → plan-m → spec-m → code-m → debug-m → commit-m → plan-m (loop)
```

After `commit-m` you re-invoke `plan-m` for the next unchecked subheading. If there are no more unchecked subheadings, the version is done — start a new major version with `todo-m`.

## What it does NOT do

- Run or commit without your explicit invocation.
- Modify `plan.md`, `spec.md`, or `debug.md`.
- Change `todo.md` beyond flipping the selected checkbox.
- Split one Z across commits or combine multiple Zs.
- Append project-wide dependencies to `AGENTS.md` without your approval.

[← 05-debug](05-debug.md) · [Next: 07-AGENTS →](07-AGENTS.md)