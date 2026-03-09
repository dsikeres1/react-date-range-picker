# react-date-range-picker-tailwind4

## 0.2.1

### Patch Changes

- Enhance npm discoverability: expanded keywords, improved descriptions, and enriched READMEs with badges and value proposition
- Updated dependencies
  - react-date-range-picker-headless@0.2.1

## 0.2.0

### Minor Changes

- Unified CSS architecture: all packages now use `rdrp-*` semantic CSS classes + `--rdrp-*` CSS custom properties for styling, resolving Tailwind v4 `@layer utilities` cascade issues.
  - **ui-primitives**: All DOM elements now output `rdrp-*` CSS class names (e.g. `rdrp-trigger`, `rdrp-day`, `rdrp-content`)
  - **tailwind3/tailwind4**: New `rdrp-styles.css` CSS bundle with component styles, variables, and size overrides
  - **All packages**: Unlayered CSS with class specificity ensures styles always win over framework defaults
  - **Docs**: Updated Getting Started guides for all 15 languages with new import instructions
  - **Registry**: Synced shadcn registry components with `rdrp-*` class additions

### Patch Changes

- Updated dependencies
  - react-date-range-picker-headless@0.2.0

## 0.1.4

### Patch Changes

- f2cdff4: fix: registry type bugs (FormNameProps, RangeTimeSectionRenderProps, timeConfig -> time), README preset getValue -> value
- Updated dependencies [f2cdff4]
  - react-date-range-picker-headless@0.1.4

## 0.1.3

### Patch Changes

- 50cd605: fix: add @source directive for automatic Tailwind v4 class detection, fix TimePicker -1 rendering in registry, fix registry hook/type names
- Updated dependencies [50cd605]
  - react-date-range-picker-headless@0.1.3

## 0.1.2

### Patch Changes

- 50cd605: Fix CSS not rendering in user projects by adding @source directive to rdrp-theme.css and rdrp-reset.css for automatic Tailwind class detection. Fix shadcn registry TimePicker rendering -1 padding values, keyboard navigation skipping padding items, incorrect hook import name (useTimePickerPanel → useStandaloneTimePicker), and missing name prop in DatePickerProps type.
  - react-date-range-picker-headless@0.1.2

## 0.1.1

### Patch Changes

- Rename CSS files to avoid generic filename conflicts:
  - `styles.css` → `rdrp-styles.css` (styled)
  - `theme.css` → `rdrp-theme.css` (tailwind4)
  - `reset.css` → `rdrp-reset.css` (tailwind3, tailwind4)

  Add `rdrp-theme.css` with default semantic design tokens for Tailwind v4 projects without shadcn/ui.

- Updated dependencies
  - react-date-range-picker-headless@0.1.1
