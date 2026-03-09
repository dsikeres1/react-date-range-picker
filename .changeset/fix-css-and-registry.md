---
"react-date-range-picker-tailwind4": patch
---

Fix CSS not rendering in user projects by adding @source directive to rdrp-theme.css and rdrp-reset.css for automatic Tailwind class detection. Fix shadcn registry TimePicker rendering -1 padding values, keyboard navigation skipping padding items, incorrect hook import name (useTimePickerPanel → useStandaloneTimePicker), and missing name prop in DatePickerProps type.
