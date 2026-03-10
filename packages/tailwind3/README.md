<p align="center">
  <img src="https://dsikeres1.github.io/react-date-range-picker/logo.svg" width="64" alt="React Date Range Picker" />
</p>
<h3 align="center">react-date-range-picker-tailwind3</h3>
<p align="center">Date & range picker for React + Tailwind CSS v3.<br/>Dark mode · Compound components · Keyboard navigation · 15 locales</p>
<p align="center">
  <a href="https://www.npmjs.com/package/react-date-range-picker-tailwind3"><img src="https://img.shields.io/npm/v/react-date-range-picker-tailwind3" alt="npm" /></a>
  <a href="https://github.com/dsikeres1/react-date-range-picker/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/react-date-range-picker-tailwind3" alt="license" /></a>
  <img src="https://img.shields.io/badge/TypeScript-strict-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v3-38BDF8" alt="Tailwind v3" />
</p>

## Installation

```bash
npm install react-date-range-picker-tailwind3
```

Import the stylesheet in your app entry:

```tsx
import "react-date-range-picker-tailwind3/rdrp-styles.css";
```

Add the plugin and content path to your Tailwind config:

```js
// tailwind.config.js
import { rdrpPlugin } from "react-date-range-picker-tailwind3/plugin";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-date-range-picker-tailwind3/dist/**/*.{js,mjs}",
  ],
  darkMode: "class",
  plugins: [rdrpPlugin],
};
```

If Tailwind Preflight is disabled in your project, also import the reset CSS:

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

### Date Range with Presets

```tsx
import { useState } from "react";
import { DateRangePicker, type DateRangePreset } from "react-date-range-picker-tailwind3";

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
import { DateTimePicker } from "react-date-range-picker-tailwind3";

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
import { DateRangeTimePicker } from "react-date-range-picker-tailwind3";

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
import { TimePicker } from "react-date-range-picker-tailwind3";

function App() {
  const [time, setTime] = useState<Date | null>(null);
  return <TimePicker value={time} onChange={setTime} />;
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

## Support

If this library helps you, consider buying me a coffee:

<a href="https://buymeacoffee.com/dsikeres1">
  <img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee" />
</a>

## License

[MIT](https://github.com/dsikeres1/react-date-range-picker/blob/main/LICENSE)
