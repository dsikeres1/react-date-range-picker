<p align="center">
  <img src="https://dsikeres1.github.io/react-date-range-picker/logo.svg" width="64" alt="React Date Range Picker" />
</p>
<h3 align="center">react-date-range-picker-tailwind3</h3>
<p align="center">Date range picker for React with Tailwind CSS v3. Utility-first styling with dark mode support.</p>
<p align="center">
  <a href="https://www.npmjs.com/package/react-date-range-picker-tailwind3"><img src="https://img.shields.io/npm/v/react-date-range-picker-tailwind3" alt="npm" /></a>
  <a href="https://github.com/dsikeres1/react-date-range-picker/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/react-date-range-picker-tailwind3" alt="license" /></a>
</p>

## Installation

```bash
npm install react-date-range-picker-tailwind3
```

Add the package to your Tailwind content config:

```js
// tailwind.config.js (or tailwind.config.cjs if your package.json has "type": "module")
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-date-range-picker-tailwind3/dist/**/*.{js,mjs}",
  ],
  darkMode: "class",
};
```

If Tailwind Preflight is disabled in your project, import the reset CSS to fix baseline styling:

```tsx
import "react-date-range-picker-tailwind3/rdrp-reset.css";
```

## Quick Start

### Simple (One-liner)

```tsx
import { useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind3";

function App() {
  const [date, setDate] = useState<Date | null>(null);
  return <DatePicker value={date} onChange={setDate} />;
}
```

### Date Range

```tsx
import { useState } from "react";
import { DateRangePicker } from "react-date-range-picker-tailwind3";

function App() {
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  return <DateRangePicker value={range} onChange={setRange} />;
}
```

### Compound Component (Full Customization)

```tsx
import { useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind3";

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

- **Tailwind CSS v3** utility classes
- **Dark mode** via `darkMode: "class"`
- **Theme override** via className props
- **4 sizes** — small, medium, large, x-large
- **Keyboard navigation** — Arrow keys, Enter, Escape, Tab
- **Date constraints** — min/max date, min/max days, disabled dates
- **Range presets** — Last 7 days, This month, etc.
- **Inline mode** — Render calendar without popup
- **15 locales** — en, ko, ja, zh-Hans, zh-Hant, es, pt-BR, fr, de, ru, tr, it, vi, th, pl

## Upgrading to Tailwind v4?

Use [`react-date-range-picker-tailwind4`](https://www.npmjs.com/package/react-date-range-picker-tailwind4) instead — with semantic design tokens and shadcn/ui registry support.

## Other Packages

| Package                                                                                                | Description                        |
| ------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| [`react-date-range-picker-headless`](https://www.npmjs.com/package/react-date-range-picker-headless)   | Headless hooks — bring your own UI |
| [`react-date-range-picker-tailwind4`](https://www.npmjs.com/package/react-date-range-picker-tailwind4) | Tailwind CSS v4 + shadcn/ui        |
| [`react-date-range-picker-styled`](https://www.npmjs.com/package/react-date-range-picker-styled)       | Built-in CSS (no framework)        |

## Documentation

Full docs with live examples: **[dsikeres1.github.io/react-date-range-picker](https://dsikeres1.github.io/react-date-range-picker/)**

## License

[MIT](https://github.com/dsikeres1/react-date-range-picker/blob/main/LICENSE)
