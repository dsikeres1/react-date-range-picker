# react-date-range-picker-styled

Date range picker for React with built-in CSS styling. No CSS framework required.

[![npm](https://img.shields.io/npm/v/react-date-range-picker-styled)](https://www.npmjs.com/package/react-date-range-picker-styled)
[![license](https://img.shields.io/npm/l/react-date-range-picker-styled)](https://github.com/dsikeres1/react-date-range-picker/blob/main/LICENSE)

## Installation

```bash
npm install react-date-range-picker-styled
```

Import the stylesheet:

```tsx
import "react-date-range-picker-styled/styles.css";
```

## Quick start

```tsx
import { useState } from "react";
import { DatePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/styles.css";

function App() {
  const [date, setDate] = useState<Date | null>(null);
  return <DatePicker value={date} onChange={setDate} />;
}
```

## Components

| Component             | Description                 |
| --------------------- | --------------------------- |
| `DatePicker`          | Single date selection       |
| `DateRangePicker`     | Date range selection        |
| `DateTimePicker`      | Date + time selection       |
| `DateRangeTimePicker` | Date range + time selection |
| `TimePicker`          | Standalone time selection   |

All components support both **simple usage** and **compound component** patterns.

## Features

- Built-in CSS — no Tailwind or other framework needed
- CSS variables for theming
- Dark mode support
- 4 sizes (small, medium, large, x-large)
- Keyboard navigation
- Date constraints (min/max, disabled dates)
- Presets for range pickers
- Inline mode
- 15 built-in locales

## Using Tailwind?

Consider using the Tailwind-specific packages instead:

- [`react-date-range-picker-tailwind4`](https://www.npmjs.com/package/react-date-range-picker-tailwind4) — Tailwind CSS v4
- [`react-date-range-picker-tailwind3`](https://www.npmjs.com/package/react-date-range-picker-tailwind3) — Tailwind CSS v3

## Documentation

Full docs with live examples: [https://dsikeres1.github.io/react-date-range-picker/](https://dsikeres1.github.io/react-date-range-picker/)

## License

MIT
