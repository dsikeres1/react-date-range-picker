# react-date-range-picker

A modern, accessible, and headless-first Date Range Picker library for React.

## Features

- **Compound Component API:** Flexible and fully customizable UI pieces.
- **No External Dependencies:** Built with native Date utilities, completely removing Day.js.
- **Headless Core:** Bring your own styles or use our pre-styled wrappers.
- **Multiple Styling Options:** First-class support for Tailwind v4, Tailwind v3, and Styled CSS.
- **Accessibility:** Keyboard navigation, focus management, and ARIA attributes.

## Installation

```bash
npm install react-date-range-picker-headless
```

_(Optional)_ Install a styled package:

```bash
npm install react-date-range-picker-tailwind4
```

## Quick Start (Compound Component)

```tsx
import { useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind4";

export function Example() {
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
          <DatePicker.ClearButton />
          <DatePicker.CancelButton />
          <DatePicker.ConfirmButton />
        </DatePicker.Footer>
      </DatePicker.Content>
    </DatePicker.Root>
  );
}
```

## License

MIT
