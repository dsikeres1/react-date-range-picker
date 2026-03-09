<p align="center">
  <img src="https://dsikeres1.github.io/react-date-range-picker/logo.svg" width="64" alt="React Date Range Picker" />
</p>
<h3 align="center">react-date-range-picker-tailwind4</h3>
<p align="center">Date range picker for React with Tailwind CSS v4. Semantic design tokens, dark mode, and shadcn/ui registry.</p>
<p align="center">
  <a href="https://www.npmjs.com/package/react-date-range-picker-tailwind4"><img src="https://img.shields.io/npm/v/react-date-range-picker-tailwind4" alt="npm" /></a>
  <a href="https://github.com/dsikeres1/react-date-range-picker/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/react-date-range-picker-tailwind4" alt="license" /></a>
</p>

## Installation

```bash
npm install react-date-range-picker-tailwind4
```

Import the theme CSS in your main CSS file. This automatically registers the component's Tailwind classes — no extra config needed:

```css
/* In your main CSS file */
@import "react-date-range-picker-tailwind4/rdrp-theme.css";
```

> **shadcn/ui users:** You already have the design tokens defined. Import `rdrp-reset.css` instead:
>
> ```css
> @import "react-date-range-picker-tailwind4/rdrp-reset.css";
> ```

### shadcn/ui Registry

```bash
npx shadcn add https://dsikeres1.github.io/react-date-range-picker/r/date-picker.json
npx shadcn add https://dsikeres1.github.io/react-date-range-picker/r/date-range-picker.json
npx shadcn add https://dsikeres1.github.io/react-date-range-picker/r/date-time-picker.json
npx shadcn add https://dsikeres1.github.io/react-date-range-picker/r/date-range-time-picker.json
npx shadcn add https://dsikeres1.github.io/react-date-range-picker/r/time-picker.json
```

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

- **Tailwind CSS v4** with semantic design tokens
- **shadcn/ui compatible** — Uses the same token convention (`--color-primary`, `--color-accent`, etc.)
- **Dark mode** via `dark:` variant
- **4 sizes** — small, medium, large, x-large
- **Keyboard navigation** — Arrow keys, Enter, Escape, Tab
- **Date constraints** — min/max date, min/max days, disabled dates
- **Range presets** — Last 7 days, This month, etc.
- **Inline mode** — Render calendar without popup
- **15 locales** — en, ko, ja, zh-Hans, zh-Hant, es, pt-BR, fr, de, ru, tr, it, vi, th, pl

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
