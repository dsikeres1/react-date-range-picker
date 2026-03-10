# react-date-range-picker-styled

## 0.2.10

### Patch Changes

- fix: include README.md in npm packages, remove unused React imports
- Updated dependencies
  - react-date-range-picker-headless@0.2.10

## 0.2.9

### Patch Changes

- react-date-range-picker-headless@0.2.9

## 0.2.8

### Patch Changes

- react-date-range-picker-headless@0.2.8

## 0.2.7

### Patch Changes

- ce5b3c5: Fix registry drift and documentation accuracy
  - Sync registry components with latest ui-primitives (portalRoot, data-slot, style prop, React 19 cleanup)
  - Sync registry component wrappers with src (showFooter, showNav, inline, numMonths logic)
  - Fix incorrect CSS variable defaults in styled docs (Blue→Sky/Slate)
  - Add missing props documentation (today, onMonthChange, size)
  - Fix broken links and code examples

- Updated dependencies [ce5b3c5]
  - react-date-range-picker-headless@0.2.7

## 0.2.6

### Patch Changes

- docs: fix TimePicker value type and add missing examples

  Fix incorrect TimePicker value type in root README (`{hour,minute,second}` → `Date | null`). Add DateRangeTimePicker, TimePicker examples to all package READMEs. Add missing hook examples to headless README. Add TimePicker to docs getting-started pages.

- Updated dependencies
  - react-date-range-picker-headless@0.2.6

## 0.2.5

### Patch Changes

- react-date-range-picker-headless@0.2.5

## 0.2.4

### Patch Changes

- fix(tailwind3): dark mode not working - replace hardcoded color classes with CSS variable bridge + Tailwind plugin
- Updated dependencies
  - react-date-range-picker-headless@0.2.4

## 0.2.3

### Patch Changes

- Fix tw3 auto-dark mode and tw4 registry focus ring
  - **tailwind3**: Remove all `dark:` Tailwind variants. Dark mode is now exclusively controlled via CSS variables (`.dark` class or `data-theme="dark"`), preventing unwanted auto-darkening on systems with dark color scheme preference.
  - **tailwind4**: Remove `focus-visible:ring-*` from base day class. Focus ring is now exclusively applied via the `focused` className (controlled by `showFocusRing` logic), fixing unwanted ring/outline on selected dates in registry usage.

- Updated dependencies
  - react-date-range-picker-headless@0.2.3

## 0.2.2

### Patch Changes

- react-date-range-picker-headless@0.2.2

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
