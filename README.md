<p align="center">
  <img src="https://dsikeres1.github.io/react-date-range-picker/logo.svg" width="80" alt="React Date Range Picker" />
</p>
<h1 align="center">React Date Range Picker</h1>
<p align="center">A modern, accessible, headless-first date & range picker for React.</p>
<p align="center">
  <a href="https://www.npmjs.com/package/react-date-range-picker-headless"><img src="https://img.shields.io/npm/v/react-date-range-picker-headless?label=headless" alt="npm headless" /></a>
  <a href="https://www.npmjs.com/package/react-date-range-picker-tailwind4"><img src="https://img.shields.io/npm/v/react-date-range-picker-tailwind4?label=tailwind4" alt="npm tailwind4" /></a>
  <a href="https://github.com/dsikeres1/react-date-range-picker/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/react-date-range-picker-headless" alt="license" /></a>
</p>

## Features

- **Headless core** — All logic, zero styling. Bring your own UI.
- **Compound Component API** — Flexible composition or simple one-liner usage.
- **5 picker types** — DatePicker, DateRangePicker, DateTimePicker, DateRangeTimePicker, TimePicker.
- **Zero dependencies** — Built with native `Date` and `Intl`.
- **15 locales** — en, ko, ja, zh-Hans, zh-Hant, es, pt-BR, fr, de, ru, tr, it, vi, th, pl.
- **Accessible** — Keyboard navigation, focus management, ARIA attributes.
- **Dark mode** — Styled packages include light/dark theme support.

## Packages

| Package                                                                                                | Description                |                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------ | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [`react-date-range-picker-headless`](https://www.npmjs.com/package/react-date-range-picker-headless)   | Headless hooks & utilities | [![npm](https://img.shields.io/npm/v/react-date-range-picker-headless)](https://www.npmjs.com/package/react-date-range-picker-headless)   |
| [`react-date-range-picker-tailwind4`](https://www.npmjs.com/package/react-date-range-picker-tailwind4) | Tailwind CSS v4            | [![npm](https://img.shields.io/npm/v/react-date-range-picker-tailwind4)](https://www.npmjs.com/package/react-date-range-picker-tailwind4) |
| [`react-date-range-picker-tailwind3`](https://www.npmjs.com/package/react-date-range-picker-tailwind3) | Tailwind CSS v3            | [![npm](https://img.shields.io/npm/v/react-date-range-picker-tailwind3)](https://www.npmjs.com/package/react-date-range-picker-tailwind3) |
| [`react-date-range-picker-styled`](https://www.npmjs.com/package/react-date-range-picker-styled)       | Built-in CSS (no Tailwind) | [![npm](https://img.shields.io/npm/v/react-date-range-picker-styled)](https://www.npmjs.com/package/react-date-range-picker-styled)       |

## Choose Your Installation

| Method                | Best for                                | Customization               | Updates      |
| --------------------- | --------------------------------------- | --------------------------- | ------------ |
| **npm + Tailwind v4** | Tailwind v4 projects                    | Props & className overrides | `npm update` |
| **npm + shadcn/ui**   | shadcn/ui projects                      | Props & className overrides | `npm update` |
| **shadcn Registry**   | shadcn/ui projects wanting full control | Edit source code directly   | Manual       |
| **npm + Tailwind v3** | Tailwind v3 projects                    | Props & className overrides | `npm update` |
| **npm + CSS**         | Any React project (no Tailwind)         | CSS variables               | `npm update` |
| **Headless**          | Build your own UI from scratch          | Everything                  | `npm update` |

### npm Install (Tailwind v4)

```bash
npm install react-date-range-picker-tailwind4
```

```css
/* Standalone Tailwind v4 — import theme + styles */
@import "react-date-range-picker-tailwind4/rdrp-theme.css";
@import "react-date-range-picker-tailwind4/rdrp-styles.css";

/* shadcn/ui projects — tokens already defined, just import reset + styles */
@import "react-date-range-picker-tailwind4/rdrp-reset.css";
@import "react-date-range-picker-tailwind4/rdrp-styles.css";
```

### shadcn/ui Registry (Source Code in Your Project)

Components are copied into your project — you own and can modify the source directly:

```bash
npx shadcn add https://dsikeres1.github.io/react-date-range-picker/r/date-picker.json
npx shadcn add https://dsikeres1.github.io/react-date-range-picker/r/date-range-picker.json
npx shadcn add https://dsikeres1.github.io/react-date-range-picker/r/date-time-picker.json
npx shadcn add https://dsikeres1.github.io/react-date-range-picker/r/date-range-time-picker.json
npx shadcn add https://dsikeres1.github.io/react-date-range-picker/r/time-picker.json
```

No CSS import needed — the copied components use Tailwind classes directly.

### Other Packages

```bash
npm install react-date-range-picker-tailwind3  # Tailwind v3
npm install react-date-range-picker-styled     # Built-in CSS (no Tailwind)
npm install react-date-range-picker-headless   # Headless hooks only
```

## Quick Start

```tsx
import { useState } from "react";
import { DateRangePicker } from "react-date-range-picker-tailwind4";

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
<DateRangePicker.Root value={range} onChange={setRange}>
  <DateRangePicker.Trigger />
  <DateRangePicker.Content>
    <DateRangePicker.Header>
      <DateRangePicker.PrevButton />
      <DateRangePicker.Title />
      <DateRangePicker.NextButton />
    </DateRangePicker.Header>
    <DateRangePicker.Grid />
    <DateRangePicker.Footer>
      <DateRangePicker.Presets />
      <DateRangePicker.ClearButton />
      <DateRangePicker.CancelButton />
      <DateRangePicker.ConfirmButton />
    </DateRangePicker.Footer>
  </DateRangePicker.Content>
</DateRangePicker.Root>
```

## Documentation

Full docs with live examples: **[dsikeres1.github.io/react-date-range-picker](https://dsikeres1.github.io/react-date-range-picker/)**

## Support

If this library helps you, consider buying me a coffee:

<a href="https://buymeacoffee.com/dsikeres1">
  <img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee" />
</a>

## License

[MIT](./LICENSE)
