# react-date-range-picker-tailwind4

Date range picker for React with Tailwind CSS v4. Semantic design tokens, dark mode, and shadcn/ui registry support.

[![npm](https://img.shields.io/npm/v/react-date-range-picker-tailwind4)](https://www.npmjs.com/package/react-date-range-picker-tailwind4)
[![license](https://img.shields.io/npm/l/react-date-range-picker-tailwind4)](https://github.com/dsikeres1/react-date-range-picker/blob/main/LICENSE)

## Installation

```bash
npm install react-date-range-picker-tailwind4
```

### shadcn/ui registry

```bash
npx shadcn add https://dsikeres1.github.io/react-date-range-picker/r/date-picker.json
```

## Quick start

```tsx
import { useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind4";

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

All components support both **simple usage** and **compound component** patterns:

```tsx
// Simple
<DatePicker value={date} onChange={setDate} />

// Compound (full customization)
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
```

## Features

- Tailwind CSS v4 with semantic design tokens
- Dark mode support
- 4 sizes (small, medium, large, x-large)
- Keyboard navigation
- Date constraints (min/max, disabled dates)
- Presets for range pickers
- Inline mode
- 15 built-in locales

## Documentation

Full docs with live examples: [https://dsikeres1.github.io/react-date-range-picker/](https://dsikeres1.github.io/react-date-range-picker/)

## License

MIT
