<p align="center">
  <img src="https://dsikeres1.github.io/react-date-range-picker/logo.svg" width="80" alt="React Date Range Picker" />
</p>
<h1 align="center">React Date Range Picker</h1>
<p align="center">A headless-first, composable date & range picker for React.<br/>Tailwind CSS v4 · shadcn/ui · Built-in CSS · Headless hooks</p>
<p align="center">
  <a href="https://www.npmjs.com/package/react-date-range-picker-tailwind4"><img src="https://img.shields.io/npm/v/react-date-range-picker-tailwind4?label=tailwind4" alt="npm tailwind4" /></a>
  <a href="https://www.npmjs.com/package/react-date-range-picker-headless"><img src="https://img.shields.io/npm/v/react-date-range-picker-headless?label=headless" alt="npm headless" /></a>
  <a href="https://github.com/dsikeres1/react-date-range-picker/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/react-date-range-picker-headless" alt="license" /></a>
  <img src="https://img.shields.io/badge/TypeScript-strict-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/dependencies-0_(headless)-green" alt="zero dependencies" />
</p>

## Why This Library?

Most React date pickers either lack range/time support, don't support Tailwind CSS v4, or aren't designed for composition. This library gives you:

- **One-liner or full control** — Simple `<DatePicker />` for quick usage, or Compound Components to customize every piece.
- **Tailwind CSS v4 first-class support** — Semantic design tokens (`bg-primary`, `text-foreground`) that match your theme.
- **shadcn/ui registry** — Install via `npx shadcn add` and own the source code, just like shadcn's built-in components.
- **Headless core** — Use the hooks directly to build completely custom UIs.

## Features

- **5 picker types** — DatePicker, DateRangePicker, DateTimePicker, DateRangeTimePicker, TimePicker
- **Compound Component API** — Compose, rearrange, or replace any internal part
- **Zero dependencies** (headless) — Built with native `Date` and `Intl`. No moment, no date-fns.
- **15 locales** — en, ko, ja, zh-Hans, zh-Hant, es, pt-BR, fr, de, ru, tr, it, vi, th, pl
- **Keyboard navigation** — Arrow keys, Enter, Escape, Tab with focus management
- **Accessible** — ARIA attributes, focus trapping, screen reader support
- **Dark mode** — Works with `dark:` variant, `next-themes`, or CSS `prefers-color-scheme`
- **4 sizes** — small, medium, large, x-large
- **Date constraints** — min/max date, min/max days in range, disabled dates
- **Range presets** — "Last 7 days", "This month", or any custom preset
- **Inline mode** — Render calendar without popup trigger
- **TypeScript** — Strict types for all props, events, and configurations

## Packages

| Package                                                                                                | Description                                   |                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------ | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [`react-date-range-picker-tailwind4`](https://www.npmjs.com/package/react-date-range-picker-tailwind4) | Tailwind CSS v4 + shadcn/ui compatible        | [![npm](https://img.shields.io/npm/v/react-date-range-picker-tailwind4)](https://www.npmjs.com/package/react-date-range-picker-tailwind4) |
| [`react-date-range-picker-tailwind3`](https://www.npmjs.com/package/react-date-range-picker-tailwind3) | Tailwind CSS v3                               | [![npm](https://img.shields.io/npm/v/react-date-range-picker-tailwind3)](https://www.npmjs.com/package/react-date-range-picker-tailwind3) |
| [`react-date-range-picker-styled`](https://www.npmjs.com/package/react-date-range-picker-styled)       | Built-in CSS (no Tailwind, CSS variables)     | [![npm](https://img.shields.io/npm/v/react-date-range-picker-styled)](https://www.npmjs.com/package/react-date-range-picker-styled)       |
| [`react-date-range-picker-headless`](https://www.npmjs.com/package/react-date-range-picker-headless)   | Headless hooks — bring your own UI, zero deps | [![npm](https://img.shields.io/npm/v/react-date-range-picker-headless)](https://www.npmjs.com/package/react-date-range-picker-headless)   |

## Choose Your Installation

| Method                | Best for                                | Customization               | Updates      |
| --------------------- | --------------------------------------- | --------------------------- | ------------ |
| **npm + Tailwind v4** | Tailwind v4 projects                    | Props & className overrides | `npm update` |
| **npm + shadcn/ui**   | shadcn/ui projects                      | Props & className overrides | `npm update` |
| **shadcn Registry**   | shadcn/ui projects wanting full control | Edit source code directly   | Manual       |
| **npm + Tailwind v3** | Tailwind v3 projects                    | Props & className overrides | `npm update` |
| **npm + CSS**         | Any React project (no Tailwind)         | CSS variables               | `npm update` |
| **Headless**          | Build your own UI from scratch          | Everything                  | `npm update` |

### npm Install (Tailwind v4)

```bash
npm install react-date-range-picker-tailwind4
```

```css
/* Standalone Tailwind v4 — import theme + styles */
@import "react-date-range-picker-tailwind4/rdrp-theme.css";
@import "react-date-range-picker-tailwind4/rdrp-styles.css";

/* shadcn/ui projects — tokens already defined, just import reset + styles */
@import "react-date-range-picker-tailwind4/rdrp-reset.css";
@import "react-date-range-picker-tailwind4/rdrp-styles.css";
```

### shadcn/ui Registry (Source Code in Your Project)

Components are copied into your project — you own and can modify the source directly:

```bash
npx shadcn add https://dsikeres1.github.io/react-date-range-picker/r/date-picker.json
npx shadcn add https://dsikeres1.github.io/react-date-range-picker/r/date-range-picker.json
npx shadcn add https://dsikeres1.github.io/react-date-range-picker/r/date-time-picker.json
npx shadcn add https://dsikeres1.github.io/react-date-range-picker/r/date-range-time-picker.json
npx shadcn add https://dsikeres1.github.io/react-date-range-picker/r/time-picker.json
```

No CSS import needed — the copied components use Tailwind classes directly.

### Other Packages

```bash
npm install react-date-range-picker-tailwind3  # Tailwind v3
npm install react-date-range-picker-styled     # Built-in CSS (no Tailwind)
npm install react-date-range-picker-headless   # Headless hooks only
```

Each package requires additional setup (CSS imports, Tailwind config, etc.). See the respective package README for details.

## Quick Start

```tsx
import { useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind4";

function App() {
  const [date, setDate] = useState<Date | null>(null);
  return <DatePicker value={date} onChange={setDate} />;
}
```

### Date Range Picker

```tsx
import { DateRangePicker } from "react-date-range-picker-tailwind4";

const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
  start: null,
  end: null,
});

<DateRangePicker value={range} onChange={setRange} />;
```

### Range Presets

```tsx
import { DateRangePicker, type DateRangePreset } from "react-date-range-picker-tailwind4";

const presets: DateRangePreset[] = [
  {
    label: "Last 7 days",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 6);
      return { start, end };
    },
  },
  {
    label: "Last 30 days",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 29);
      return { start, end };
    },
  },
];

<DateRangePicker value={range} onChange={setRange} presets={presets} />;
```

### Date & Time Picker

```tsx
import { DateTimePicker } from "react-date-range-picker-tailwind4";

const [dateTime, setDateTime] = useState<Date | null>(null);

// 24-hour format (default)
<DateTimePicker value={dateTime} onChange={setDateTime} />

// 12-hour format with seconds
<DateTimePicker
  value={dateTime}
  onChange={setDateTime}
  time={{ hourFormat: "12", precision: "second" }}
/>
```

### Date Range & Time Picker

```tsx
import { DateRangeTimePicker } from "react-date-range-picker-tailwind4";

<DateRangeTimePicker
  value={range}
  onChange={setRange}
  time={{ hourFormat: "12" }}
  presets={presets}
/>;
```

### Time Picker (Standalone)

```tsx
import { TimePicker } from "react-date-range-picker-tailwind4";

const [time, setTime] = useState<Date | null>(null);

<TimePicker value={time} onChange={setTime} time={{ hourFormat: "12" }} />;
```

### Inline Mode

Render the calendar always visible, without a popup trigger:

```tsx
<DatePicker value={date} onChange={setDate} inline />
<DateRangePicker value={range} onChange={setRange} inline />
```

### Date Constraints

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  minDate={new Date(2025, 0, 1)}
  maxDate={new Date(2025, 11, 31)}
/>

<DateRangePicker
  value={range}
  onChange={setRange}
  minDays={3}
  maxDays={14}
/>
```

### Dark Mode

Add the `dark` class to a parent element or `<html>`:

```html
<html class="dark"></html>
```

All components automatically adapt to dark mode.

### Compound Component (Full Customization)

```tsx
<DateRangePicker.Root value={range} onChange={setRange}>
  <DateRangePicker.Trigger />
  <DateRangePicker.Content>
    <DateRangePicker.Header>
      <DateRangePicker.PrevButton />
      <DateRangePicker.Title />
      <DateRangePicker.NextButton />
    </DateRangePicker.Header>
    <DateRangePicker.Grid />
    <DateRangePicker.Footer>
      <DateRangePicker.Presets />
      <DateRangePicker.ClearButton />
      <DateRangePicker.CancelButton />
      <DateRangePicker.ConfirmButton />
    </DateRangePicker.Footer>
  </DateRangePicker.Content>
</DateRangePicker.Root>
```

## Documentation

Full docs with live examples: **[dsikeres1.github.io/react-date-range-picker](https://dsikeres1.github.io/react-date-range-picker/)**

## Support

If this library helps you, consider buying me a coffee:

<a href="https://buymeacoffee.com/dsikeres1">
  <img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee" />
</a>

## License

[MIT](./LICENSE)
