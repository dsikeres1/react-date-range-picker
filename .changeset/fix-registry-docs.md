---
"react-date-range-picker-tailwind4": patch
---

fix(registry): add missing RangeTimeSectionRenderProps to time-picker registry types

The time-picker.json registry had an incomplete types.ts that was missing the
RangeTimeSectionRenderProps interface. When users installed time-picker after
other components, shadcn would overwrite the complete types.ts with the
incomplete one, causing TypeScript errors.

Also improved README documentation across all packages with preset and time
configuration examples.