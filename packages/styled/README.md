<p align="center">
  <img src="https://dsikeres1.github.io/react-date-range-picker/logo.svg" width="64" alt="React Date Range Picker" />
</p>
<h3 align="center">react-date-range-picker-styled</h3>
<p align="center">Date range picker for React with built-in CSS styling. No CSS framework required.</p>
<p align="center">
  <a href="https://www.npmjs.com/package/react-date-range-picker-styled"><img src="https://img.shields.io/npm/v/react-date-range-picker-styled" alt="npm" /></a>
  <a href="https://github.com/dsikeres1/react-date-range-picker/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/react-date-range-picker-styled" alt="license" /></a>
</p>

## Installation

```bash
npm install react-date-range-picker-styled
```

Import the stylesheet in your app entry:

```tsx
import "react-date-range-picker-styled/styles.css";
```

## Quick Start

### Simple (One-liner)

```tsx
import { useState } from "react";
import { DatePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/styles.css";

function App() {
  const [date, setDate] = useState<Date | null>(null);
  return <DatePicker value={date} onChange={setDate} />;
}
```

### Date Range

```tsx
import { useState } from "react";
import { DateRangePicker } from "react-date-range-picker-styled";

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

| Component | Description |
| --- | --- |
| `DatePicker` | Single date selection |
| `DateRangePicker` | Date range selection with presets |
| `DateTimePicker` | Date + time selection |
| `DateRangeTimePicker` | Date range + time selection |
| `TimePicker` | Standalone time selection |

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
  --rdrp-primary: #3b82f6;
  --rdrp-primary-foreground: #ffffff;
  --rdrp-background: #ffffff;
  --rdrp-foreground: #0a0a0a;
  --rdrp-border: #e5e7eb;
}

.dark {
  --rdrp-background: #0a0a0a;
  --rdrp-foreground: #fafafa;
  --rdrp-border: #27272a;
}
```

## Using Tailwind?

Consider using the Tailwind-specific packages instead:

| Package | Description |
| --- | --- |
| [`react-date-range-picker-tailwind4`](https://www.npmjs.com/package/react-date-range-picker-tailwind4) | Tailwind CSS v4 + shadcn/ui registry |
| [`react-date-range-picker-tailwind3`](https://www.npmjs.com/package/react-date-range-picker-tailwind3) | Tailwind CSS v3 |

## Other Packages

| Package | Description |
| --- | --- |
| [`react-date-range-picker-headless`](https://www.npmjs.com/package/react-date-range-picker-headless) | Headless hooks — bring your own UI |

## Documentation

Full docs with live examples: **[dsikeres1.github.io/react-date-range-picker](https://dsikeres1.github.io/react-date-range-picker/)**

## License

[MIT](https://github.com/dsikeres1/react-date-range-picker/blob/main/LICENSE)
