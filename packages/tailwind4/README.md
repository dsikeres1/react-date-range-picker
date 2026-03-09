<p align="center">
  <img src="https://dsikeres1.github.io/react-date-range-picker/logo.svg" width="64" alt="React Date Range Picker" />
</p>
<h3 align="center">react-date-range-picker-tailwind4</h3>
<p align="center">Date & range picker for React + Tailwind CSS v4.<br/>Semantic design tokens · shadcn/ui compatible · Dark mode · 15 locales</p>
<p align="center">
  <a href="https://www.npmjs.com/package/react-date-range-picker-tailwind4"><img src="https://img.shields.io/npm/v/react-date-range-picker-tailwind4" alt="npm" /></a>
  <a href="https://github.com/dsikeres1/react-date-range-picker/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/react-date-range-picker-tailwind4" alt="license" /></a>
  <img src="https://img.shields.io/badge/TypeScript-strict-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8" alt="Tailwind v4" />
</p>

## Installation

There are 3 ways to use this package depending on your project setup:

| Method               | Best for                                | What you get                                                 |
| -------------------- | --------------------------------------- | ------------------------------------------------------------ |
| **npm (standalone)** | Tailwind v4 without shadcn              | Components in `node_modules`, themed with default palette    |
| **npm (shadcn/ui)**  | shadcn/ui projects                      | Components in `node_modules`, auto-matches your shadcn theme |
| **shadcn Registry**  | shadcn/ui projects wanting full control | Source code copied into your project, fully editable         |

### Option A: npm Install (Standalone Tailwind v4)

```bash
npm install react-date-range-picker-tailwind4
```

```css
/* src/index.css */
@import "tailwindcss";
@import "react-date-range-picker-tailwind4/rdrp-theme.css";
@import "react-date-range-picker-tailwind4/rdrp-styles.css";
```

`rdrp-theme.css` provides default color tokens (Slate + Sky palette). You can override them in your CSS.

### Option B: npm Install (shadcn/ui Projects)

```bash
npm install react-date-range-picker-tailwind4
```

```css
/* app/globals.css or src/index.css */
@import "tailwindcss";
@import "tw-animate-css";
@import "react-date-range-picker-tailwind4/rdrp-reset.css";
@import "react-date-range-picker-tailwind4/rdrp-styles.css";
```

No `rdrp-theme.css` needed — your shadcn/ui project already defines `--color-primary`, `--color-background`, etc. The picker inherits your theme automatically.

### Option C: shadcn Registry (Full Source Control)

```bash
npx shadcn add https://dsikeres1.github.io/react-date-range-picker/r/date-picker.json
npx shadcn add https://dsikeres1.github.io/react-date-range-picker/r/date-range-picker.json
npx shadcn add https://dsikeres1.github.io/react-date-range-picker/r/date-time-picker.json
npx shadcn add https://dsikeres1.github.io/react-date-range-picker/r/date-range-time-picker.json
npx shadcn add https://dsikeres1.github.io/react-date-range-picker/r/time-picker.json
```

No CSS import needed. Components are copied into your project and use Tailwind classes directly. You can edit the source to customize anything. Trade-off: updates require re-running the command.

## Quick Start

### Simple (One-liner)

```tsx
import { useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind4";

function App() {
  const [date, setDate] = useState<Date | null>(null);
  return <DatePicker value={date} onChange={setDate} />;
}
```

### Date Range with Presets

```tsx
import { useState } from "react";
import { DateRangePicker } from "react-date-range-picker-tailwind4";

function App() {
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return (
    <DateRangePicker
      value={range}
      onChange={setRange}
      presets={[
        {
          label: "Last 7 days",
          value: () => {
            const e = new Date();
            const s = new Date();
            s.setDate(s.getDate() - 6);
            return { start: s, end: e };
          },
        },
        {
          label: "Last 30 days",
          value: () => {
            const e = new Date();
            const s = new Date();
            s.setDate(s.getDate() - 29);
            return { start: s, end: e };
          },
        },
      ]}
    />
  );
}
```

### Compound Component (Full Customization)

```tsx
import { useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind4";

function App() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker.Root value={date} onChange={setDate}>
      <DatePicker.Trigger />
      <DatePicker.Content>
        <DatePicker.Header>
          <DatePicker.PrevButton />
          <DatePicker.Title />
          <DatePicker.NextButton />
        </DatePicker.Header>
        <DatePicker.Grid />
        <DatePicker.Footer>
          <DatePicker.TodayButton />
          <DatePicker.ClearButton />
        </DatePicker.Footer>
      </DatePicker.Content>
    </DatePicker.Root>
  );
}
```

## Components

| Component             | Description                       |
| --------------------- | --------------------------------- |
| `DatePicker`          | Single date selection             |
| `DateRangePicker`     | Date range selection with presets |
| `DateTimePicker`      | Date + time selection             |
| `DateRangeTimePicker` | Date range + time selection       |
| `TimePicker`          | Standalone time selection         |

All components support **simple** and **compound component** patterns.

## Features

- **Tailwind CSS v4** — Semantic design tokens (`bg-primary`, `text-foreground`, `border-border`)
- **shadcn/ui compatible** — Same token convention, auto-matches your theme. Also available as a [shadcn registry](#option-c-shadcn-registry-full-source-control).
- **Compound Component API** — One-liner for quick usage, or compose/rearrange every internal part
- **Dark mode** — Works with `dark:` variant, `next-themes`, or `prefers-color-scheme`
- **4 sizes** — small, medium, large, x-large
- **Keyboard navigation** — Arrow keys, Enter, Escape, Tab with focus management
- **Accessible** — ARIA attributes, focus trapping, screen reader support
- **Date constraints** — min/max date, min/max days in range, disabled dates
- **Range presets** — "Last 7 days", "This month", or any custom preset
- **Inline mode** — Render calendar without popup trigger
- **15 locales** — en, ko, ja, zh-Hans, zh-Hant, es, pt-BR, fr, de, ru, tr, it, vi, th, pl
- **TypeScript** — Strict types for all props, events, and configurations

## Semantic Tokens

The components use CSS variables for theming. Define them in your CSS:

```css
@theme {
  --color-popover: oklch(1 0 0);
  --color-popover-foreground: oklch(0.145 0.004 285.823);
  --color-primary: oklch(0.205 0.006 285.885);
  --color-primary-foreground: oklch(0.985 0.001 285.823);
  --color-muted: oklch(0.96 0.003 285.823);
  --color-muted-foreground: oklch(0.556 0.01 285.823);
  --color-accent: oklch(0.96 0.003 285.823);
  --color-accent-foreground: oklch(0.205 0.006 285.885);
  --color-border: oklch(0.922 0.004 285.823);
  --color-input: oklch(0.922 0.004 285.823);
  --color-ring: oklch(0.87 0.006 285.823);
}
```

> If your project already uses shadcn/ui, these tokens are already defined — no extra setup needed.

## Other Packages

| Package                                                                                                | Description                        |
| ------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| [`react-date-range-picker-headless`](https://www.npmjs.com/package/react-date-range-picker-headless)   | Headless hooks — bring your own UI |
| [`react-date-range-picker-tailwind3`](https://www.npmjs.com/package/react-date-range-picker-tailwind3) | Tailwind CSS v3                    |
| [`react-date-range-picker-styled`](https://www.npmjs.com/package/react-date-range-picker-styled)       | Built-in CSS (no framework)        |

## Documentation

Full docs with live examples: **[dsikeres1.github.io/react-date-range-picker](https://dsikeres1.github.io/react-date-range-picker/)**

## License

[MIT](https://github.com/dsikeres1/react-date-range-picker/blob/main/LICENSE)
