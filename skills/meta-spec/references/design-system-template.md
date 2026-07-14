# Design System

> Scope: **colors, typography, spacing, overall style only**.
> NOT scope: UI framework (see AGENTS.md → Project Framework),
> components (see docs/vX.Y/plan.md or spec.md).
> Format is optional; write it however fits.

---

## Color Palette

### Primary
- `primary-50`  — #F0F7FF
- `primary-100` — #DBEDFF
- `primary-200` — #BFE0FF
- `primary-300` — #93CCFF
- `primary-400` — #60AEFF
- `primary-500` — #3B8FFF
- `primary-600` — #256FEB
- `primary-700` — #1D58C7
- `primary-800` — #1E48A1
- `primary-900` — #003A7A

### Neutral
- `neutral-50`  — #FAFAFA
- `neutral-100` — #F4F4F5
- `neutral-200` — #E4E4E7
- `neutral-300` — #D4D4D8
- `neutral-400` — #A1A1AA
- `neutral-500` — #71717A
- `neutral-600` — #52525B
- `neutral-700` — #3F3F46
- `neutral-800` — #27272A
- `neutral-900` — #1A1A1A

### Semantic
- `success` — #10B981
- `warning` — #F59E0B
- `error`   — #EF4444
- `info`    — #3B82F6

---

## Typography

| Role | Family | Size | Weight | Line height |
|---|---|---|---|---|
| H1 | Inter | 32px | 700 | 1.2 |
| H2 | Inter | 24px | 600 | 1.3 |
| H3 | Inter | 20px | 600 | 1.3 |
| Body | Inter | 16px | 400 | 1.5 |
| Small | Inter | 14px | 400 | 1.5 |
| Mono | JetBrains Mono | 14px | 400 | 1.5 |

---

## Spacing

Base unit: 4px.

Scale: `0`, `1` (4px), `2` (8px), `3` (12px), `4` (16px), `6` (24px), `8` (32px), `12` (48px), `16` (64px), `24` (96px)

---

## Overall Style

- **Aesthetic**: [e.g. minimal, content-first]
- **Mood**: [e.g. calm, professional]
- **Reference projects**: [e.g. Stripe Docs, Linear, Vercel]
- **Anti-patterns**: [e.g. heavy gradients, decorative shadows, busy backgrounds]

---

## Usage Rules

- Use semantic tokens (`bg-primary`, `text-error`) not raw hex values.
- Body text on `neutral-50` background; never on saturated color backgrounds.
- Maintain 4px baseline grid in all component spacing.
