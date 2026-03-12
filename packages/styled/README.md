<p align="center">
  <img src="https://dsikeres1.github.io/react-date-range-picker/logo.svg" width="64" alt="React Date Range Picker" />
</p>
<h3 align="center">react-date-range-picker-styled</h3>
<p align="center">Date & range picker for React with built-in CSS.<br/>No Tailwind needed · CSS variables · Dark mode · 15 locales</p>
<p align="center">
  <a href="https://www.npmjs.com/package/react-date-range-picker-styled"><img src="https://img.shields.io/npm/v/react-date-range-picker-styled" alt="npm" /></a>
  <a href="https://github.com/dsikeres1/react-date-range-picker/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/react-date-range-picker-styled" alt="license" /></a>
  <img src="https://img.shields.io/badge/TypeScript-strict-blue" alt="TypeScript" />
</p>
<p align="center">
  <a href="https://dsikeres1.github.io/react-date-range-picker/docs/styled/getting-started"><img src="https://img.shields.io/badge/Documentation-blue?style=flat-square&logo=readthedocs&logoColor=white" alt="Documentation" /></a>
  <a href="https://github.com/dsikeres1/react-date-range-picker"><img src="https://img.shields.io/badge/GitHub-black?style=flat-square&logo=github" alt="GitHub" /></a>
</p>

> Part of the [React Date Range Picker](https://github.com/dsikeres1/react-date-range-picker) family — Also available: [`tailwind4`](https://www.npmjs.com/package/react-date-range-picker-tailwind4) · [`tailwind3`](https://www.npmjs.com/package/react-date-range-picker-tailwind3) · [`headless`](https://www.npmjs.com/package/react-date-range-picker-headless)

## Installation

```bash
npm install react-date-range-picker-styled
```

Import the stylesheet in your app entry:

```tsx
import "react-date-range-picker-styled/rdrp-styles.css";
```

## Quick Start

### Simple (One-liner)

```tsx
import { useState } from "react";
import { DatePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/rdrp-styles.css";

function App() {
  const [date, setDate] = useState<Date | null>(null);
  return <DatePicker value={date} onChange={setDate} />;
}
```

### Date Range with Presets

```tsx
import { useState } from "react";
import { DateRangePicker, type DateRangePreset } from "react-date-range-picker-styled";

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
];

function App() {
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  return <DateRangePicker value={range} onChange={setRange} presets={presets} />;
}
```

### Date & Time Picker

```tsx
import { useState } from "react";
import { DateTimePicker } from "react-date-range-picker-styled";

function App() {
  const [dateTime, setDateTime] = useState<Date | null>(null);

  return (
    <>
      {/* 24-hour format (default) */}
      <DateTimePicker value={dateTime} onChange={setDateTime} />

      {/* 12-hour format with seconds */}
      <DateTimePicker
        value={dateTime}
        onChange={setDateTime}
        time={{ hourFormat: "12", precision: "second" }}
      />
    </>
  );
}
```

### Date Range & Time Picker

```tsx
import { useState } from "react";
import { DateRangeTimePicker } from "react-date-range-picker-styled";

function App() {
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return <DateRangeTimePicker value={range} onChange={setRange} time={{ hourFormat: "12" }} />;
}
```

### Time Picker (Standalone)

```tsx
import { useState } from "react";
import { TimePicker } from "react-date-range-picker-styled";

function App() {
  const [time, setTime] = useState<Date | null>(null);
  return <TimePicker value={time} onChange={setTime} />;
}
```

### Compound Component (Full Customization)

```tsx
import { useState } from "react";
import { DatePicker } from "react-date-range-picker-styled";

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

- **Built-in CSS** — No Tailwind or other framework needed
- **CSS variables** for theming
- **Dark mode** support
- **4 sizes** — small, medium, large, x-large
- **Keyboard navigation** — Arrow keys, Enter, Escape, Tab
- **Date constraints** — min/max date, min/max days, disabled dates
- **Range presets** — Last 7 days, This month, etc.
- **Inline mode** — Render calendar without popup
- **15 locales** — en, ko, ja, zh-Hans, zh-Hant, es, pt-BR, fr, de, ru, tr, it, vi, th, pl

## Theming

Override CSS variables to customize the look:

```css
:root {
  --rdrp-color-primary: #0ea5e9; /* sky-500 */
  --rdrp-color-bg: #ffffff;
  --rdrp-color-text: #0f172a; /* slate-900 */
  --rdrp-color-border: #e2e8f0; /* slate-200 */
}

.dark {
  --rdrp-color-bg: #020617; /* slate-950 */
  --rdrp-color-text: #f8fafc; /* slate-50 */
  --rdrp-color-border: #1e293b; /* slate-800 */
}
```

## Using Tailwind?

Consider using the Tailwind-specific packages instead:

| Package                                                                                                | Description                          |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| [`react-date-range-picker-tailwind4`](https://www.npmjs.com/package/react-date-range-picker-tailwind4) | Tailwind CSS v4 + shadcn/ui registry |
| [`react-date-range-picker-tailwind3`](https://www.npmjs.com/package/react-date-range-picker-tailwind3) | Tailwind CSS v3                      |

## Other Packages

| Package                                                                                              | Description                        |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------- |
| [`react-date-range-picker-headless`](https://www.npmjs.com/package/react-date-range-picker-headless) | Headless hooks — bring your own UI |

## Documentation

Full docs with live examples: **[dsikeres1.github.io/react-date-range-picker](https://dsikeres1.github.io/react-date-range-picker/)**

## Support

If this library helps you, consider buying me a coffee:

<a href="https://buymeacoffee.com/dsikeres1">
  <img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee" />
</a>

## License

[MIT](https://github.com/dsikeres1/react-date-range-picker/blob/main/LICENSE)
