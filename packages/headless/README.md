<p align="center">
  <img src="https://dsikeres1.github.io/react-date-range-picker/logo.svg" width="64" alt="React Date Range Picker" />
</p>
<h3 align="center">react-date-range-picker-headless</h3>
<p align="center">Headless date & range picker hooks for React.<br/>Zero dependencies · Compound components · Keyboard navigation · 15 locales</p>
<p align="center">
  <a href="https://www.npmjs.com/package/react-date-range-picker-headless"><img src="https://img.shields.io/npm/v/react-date-range-picker-headless" alt="npm" /></a>
  <a href="https://github.com/dsikeres1/react-date-range-picker/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/react-date-range-picker-headless" alt="license" /></a>
  <img src="https://img.shields.io/badge/TypeScript-strict-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/dependencies-0-green" alt="zero dependencies" />
</p>

## Installation

```bash
npm install react-date-range-picker-headless
```

## What's Included

- **6 hooks** — `useDatePicker`, `useDateRangePicker`, `useDateTimePicker`, `useDateRangeTimePicker`, `useTimePicker`, `useStandaloneTimePicker`
- **Compound Component contexts** — Provider + consumer pattern for custom UIs
- **15 locale packs** — en, ko, ja, zh-Hans, zh-Hant, es, pt-BR, fr, de, ru, tr, it, vi, th, pl
- **`createLocale()`** — Generate a locale from any `Intl.DateTimeFormat` key
- **Date utilities** — `parseDate`, `startOf`, `endOf`, `add`, `subtract`, `diff`, `formatBasic` and more
- **Zero dependencies** — Only `react` as peer dependency
- **Full keyboard navigation** — Arrow keys, Enter, Escape, Tab

## Quick Start

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
          {/* Build your own calendar UI using picker.calendar, picker.getDayProps, etc. */}
        </div>
      )}
    </div>
  );
}
```

### Date Range

```tsx
import { useState } from "react";
import { useDateRangePicker } from "react-date-range-picker-headless";

function MyRangePicker() {
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  const picker = useDateRangePicker({ value: range, onChange: setRange });

  return (
    <div ref={picker.containerRef}>
      <button onClick={picker.handleToggle}>{picker.displayValue || "Select range"}</button>
      {picker.isOpen && <div ref={picker.popupRef}>{/* Build your own range calendar UI */}</div>}
    </div>
  );
}
```

### Using Locales

```tsx
import { useDatePicker, ko } from "react-date-range-picker-headless";

const picker = useDatePicker({
  value: date,
  onChange: setDate,
  locale: ko, // Korean
});
```

### Custom Locale

```tsx
import { createLocale } from "react-date-range-picker-headless";

const swedish = createLocale("sv-SE");
```

## Don't Want to Build Your Own UI?

Use a pre-styled package:

| Package                                                                                                | Styling                              |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| [`react-date-range-picker-tailwind4`](https://www.npmjs.com/package/react-date-range-picker-tailwind4) | Tailwind CSS v4 + shadcn/ui registry |
| [`react-date-range-picker-tailwind3`](https://www.npmjs.com/package/react-date-range-picker-tailwind3) | Tailwind CSS v3                      |
| [`react-date-range-picker-styled`](https://www.npmjs.com/package/react-date-range-picker-styled)       | Built-in CSS (no framework)          |

## Documentation

Full docs with live examples: **[dsikeres1.github.io/react-date-range-picker](https://dsikeres1.github.io/react-date-range-picker/)**

## License

[MIT](https://github.com/dsikeres1/react-date-range-picker/blob/main/LICENSE)
