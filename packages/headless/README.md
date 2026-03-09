# react-date-range-picker-headless

A headless, composable date & range picker for React. All logic, zero styling.

[![npm](https://img.shields.io/npm/v/react-date-range-picker-headless)](https://www.npmjs.com/package/react-date-range-picker-headless)
[![license](https://img.shields.io/npm/l/react-date-range-picker-headless)](https://github.com/dsikeres1/react-date-range-picker/blob/main/LICENSE)

## Installation

```bash
npm install react-date-range-picker-headless
```

## What's included

- **6 hooks** — `useDatePicker`, `useDateRangePicker`, `useDateTimePicker`, `useDateRangeTimePicker`, `useTimePicker`, `useStandaloneTimePicker`
- **Keyboard navigation** — full arrow-key, Enter, Escape support
- **Compound Component contexts** — provider + consumer pattern for custom UIs
- **15 locale packs** — en, ko, ja, zh-Hans, zh-Hant, es, pt-BR, fr, de, ru, tr, it, vi, th, pl
- **`createLocale()`** — generate locale from any `Intl.DateTimeFormat` key
- **Date utilities** — `parseDate`, `startOf`, `endOf`, `add`, `subtract`, `diff`, `formatBasic` and more
- **Zero dependencies** — only `react` and `react-dom` as peer dependencies

## Quick start

```tsx
import { useState } from "react";
import { useDatePicker } from "react-date-range-picker-headless";

function MyDatePicker() {
  const [date, setDate] = useState<Date | null>(null);
  const picker = useDatePicker({ value: date, onChange: setDate });

  return (
    <div ref={picker.containerRef}>
      <button onClick={picker.handleToggle}>{picker.displayValue || "Select date"}</button>
      {picker.isOpen && (
        <div ref={picker.popupRef}>
          {/* Render your own calendar UI using picker.calendar, picker.getDayProps, etc. */}
        </div>
      )}
    </div>
  );
}
```

## Using locale packs

```tsx
import { useDatePicker, ko } from "react-date-range-picker-headless";

const picker = useDatePicker({
  value: date,
  onChange: setDate,
  locale: ko, // Korean locale
});
```

## Documentation

Full docs with examples: [https://dsikeres1.github.io/react-date-range-picker/](https://dsikeres1.github.io/react-date-range-picker/)

## Styled packages

Don't want to build your own UI? Use a pre-styled package:

- [`react-date-range-picker-tailwind4`](https://www.npmjs.com/package/react-date-range-picker-tailwind4) — Tailwind CSS v4
- [`react-date-range-picker-tailwind3`](https://www.npmjs.com/package/react-date-range-picker-tailwind3) — Tailwind CSS v3
- [`react-date-range-picker-styled`](https://www.npmjs.com/package/react-date-range-picker-styled) — Built-in CSS

## License

MIT
