# react-date-range-picker-tailwind3

Date range picker for React with Tailwind CSS v3. Utility-first styling with dark mode support.

[![npm](https://img.shields.io/npm/v/react-date-range-picker-tailwind3)](https://www.npmjs.com/package/react-date-range-picker-tailwind3)
[![license](https://img.shields.io/npm/l/react-date-range-picker-tailwind3)](https://github.com/dsikeres1/react-date-range-picker/blob/main/LICENSE)

## Installation

```bash
npm install react-date-range-picker-tailwind3
```

## Quick start

```tsx
import { useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind3";

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

- Tailwind CSS v3 utility classes
- Dark mode support
- Theme override via className props
- 4 sizes (small, medium, large, x-large)
- Keyboard navigation
- Date constraints (min/max, disabled dates)
- Presets for range pickers
- Inline mode
- 15 built-in locales

## Tailwind v4?

Use [`react-date-range-picker-tailwind4`](https://www.npmjs.com/package/react-date-range-picker-tailwind4) instead — with semantic design tokens and shadcn/ui registry support.

## Documentation

Full docs with live examples: [https://dsikeres1.github.io/react-date-range-picker/](https://dsikeres1.github.io/react-date-range-picker/)

## License

MIT
