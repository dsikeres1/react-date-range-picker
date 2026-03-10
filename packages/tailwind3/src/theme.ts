// Tailwind v3 theme
// Colors bridge to --rdrp-* CSS custom properties for dark mode & theming support.
// Non-color utilities (layout, spacing, shadows) use standard Tailwind classes.

export const rootClassNames = {
  root: "relative w-max font-sans text-[13px] text-[color:var(--rdrp-color-text)] select-none",
};

export const triggerClassNames = {
  trigger:
    "flex items-center gap-2 justify-between min-w-[200px] px-3.5 py-2 text-sm bg-[color:var(--rdrp-color-bg)] border border-[color:var(--rdrp-color-border)] rounded-md shadow-sm hover:border-[color:var(--rdrp-color-border-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--rdrp-color-primary)] focus-visible:border-[color:var(--rdrp-color-primary)]",
  placeholder: "text-[color:var(--rdrp-color-text-muted)]",
  clear:
    "ml-2 p-1 -m-1 appearance-none border-0 bg-transparent text-[color:var(--rdrp-color-text-muted)] hover:text-[color:var(--rdrp-color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--rdrp-color-primary)] rounded-sm cursor-pointer",
};

export const headerClassNames = {
  header: "flex items-center justify-between mb-3",
  navButton:
    "flex items-center justify-center w-7 h-7 text-[color:var(--rdrp-color-text-muted)] rounded-md hover:bg-[color:var(--rdrp-color-bg-hover)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--rdrp-color-primary)]",
  title:
    "flex-1 flex items-center justify-center gap-1 font-semibold text-[15px] text-[color:var(--rdrp-color-text)]",
  select:
    "px-1 py-0.5 text-sm bg-transparent border border-transparent rounded hover:border-[color:var(--rdrp-color-border)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--rdrp-color-primary)] cursor-pointer",
  spacer: "flex-1",
};

export const gridClassNames = {
  panel: "flex flex-col",
  weekdays: "grid grid-cols-7 mb-1",
  weekday:
    "flex items-center justify-center h-7 text-xs font-medium text-[color:var(--rdrp-color-text-muted)]",
  grid: "flex flex-col gap-1",
  week: "grid grid-cols-7",
};

export const dayClassNames = {
  day: "flex items-center justify-center min-w-9 h-9 mx-[1px] rounded-lg transition-colors cursor-pointer hover:bg-[color:var(--rdrp-color-bg-hover)] focus-visible:outline-none",
  empty: "invisible pointer-events-none",
  today: "font-bold text-[color:var(--rdrp-color-text-today)]",
  selected:
    "bg-[color:var(--rdrp-color-primary)] text-[color:var(--rdrp-color-text-inverse)] font-semibold hover:bg-[color:var(--rdrp-color-primary)] hover:text-[color:var(--rdrp-color-text-inverse)]",
  disabled: "text-[color:var(--rdrp-color-text-muted)] opacity-50 pointer-events-none",
  outside: "text-[color:var(--rdrp-color-text-outside)]",
  highlighted:
    "relative after:absolute after:bottom-[3px] after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[color:var(--rdrp-color-highlight-dot)] after:rounded-full",
  inRange:
    "bg-[color:var(--rdrp-color-range-bg)] text-[color:var(--rdrp-color-text)] rounded-none mx-0 hover:bg-[color:var(--rdrp-color-range-bg)]",
  rangeStart:
    "bg-[color:var(--rdrp-color-primary)] text-[color:var(--rdrp-color-text-inverse)] rounded-l-lg rounded-r-none mx-0 hover:bg-[color:var(--rdrp-color-primary)] hover:text-[color:var(--rdrp-color-text-inverse)]",
  rangeEnd:
    "bg-[color:var(--rdrp-color-primary)] text-[color:var(--rdrp-color-text-inverse)] rounded-r-lg rounded-l-none mx-0 hover:bg-[color:var(--rdrp-color-primary)] hover:text-[color:var(--rdrp-color-text-inverse)]",
  rangeSingle:
    "bg-[color:var(--rdrp-color-primary)] text-[color:var(--rdrp-color-text-inverse)] mx-0 hover:bg-[color:var(--rdrp-color-primary)] hover:text-[color:var(--rdrp-color-text-inverse)]",
  hoverRange:
    "bg-[color:var(--rdrp-color-hover-range-bg)] text-[color:var(--rdrp-color-text)] rounded-none mx-0",
  hoverTarget: "bg-[color:var(--rdrp-color-hover-target-bg)] text-[color:var(--rdrp-color-text)]",
  focused:
    "ring-2 ring-[color:var(--rdrp-color-primary)] ring-offset-1 ring-offset-[color:var(--rdrp-color-bg)]",
};

export const footerClassNames = {
  footer: "flex justify-end gap-2 mt-3 pt-3 border-t border-[color:var(--rdrp-color-border)]",
  button:
    "px-3.5 py-1.5 text-[color:var(--rdrp-color-text-muted)] border border-[color:var(--rdrp-color-border)] hover:bg-[color:var(--rdrp-color-bg-hover)] hover:border-[color:var(--rdrp-color-border-hover)] rounded-md transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--rdrp-color-primary)]",
  confirmButton:
    "px-3.5 py-1.5 text-[color:var(--rdrp-color-text-inverse)] bg-[color:var(--rdrp-color-primary)] hover:bg-[color:var(--rdrp-color-primary-hover)] rounded-md transition-colors motion-reduce:transition-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--rdrp-color-primary)]",
  clearButton:
    "mr-auto px-3.5 py-1.5 text-[color:var(--rdrp-color-text-danger)] hover:text-[color:var(--rdrp-color-text)] hover:bg-[color:var(--rdrp-color-bg-hover)] rounded-md transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--rdrp-color-primary)]",
};

export const contentClassNames = {
  content:
    "absolute top-[calc(100%+8px)] left-0 z-50 p-4 bg-[color:var(--rdrp-color-bg)] text-[color:var(--rdrp-color-text)] border border-[color:var(--rdrp-color-border)] rounded-xl shadow-lg",
  contentInline: "static z-auto shadow-none mt-0",
};

export const rangeClassNames = {
  presetsContainer:
    "flex flex-col gap-0.5 pr-4 border-r border-[color:var(--rdrp-color-border)] min-w-[140px]",
  presetButton:
    "px-4 py-2 text-left rounded-md transition-colors motion-reduce:transition-none hover:bg-[color:var(--rdrp-color-bg-hover)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--rdrp-color-primary)]",
  presetButtonActive:
    "bg-[color:var(--rdrp-color-primary-lighter)] text-[color:var(--rdrp-color-primary)] font-medium",
  presetsLayout: "flex flex-wrap gap-4",
  calendarsContainer: "flex flex-wrap gap-6 max-sm:flex-col max-sm:gap-4",
};

export const dateTimeClassNames = {
  timeSection: "flex flex-col gap-3 mt-3 pt-3 border-t border-[color:var(--rdrp-color-border)]",
  timeLabel: "text-xs font-medium text-[color:var(--rdrp-color-text-muted)]",
};

export const timePanelClassNames = {
  timePanel: "relative flex items-center justify-center w-fit mx-auto min-w-[120px] h-[176px]",
  timeHighlight:
    "absolute left-1 right-1 h-8 rounded-md bg-[color:var(--rdrp-color-time-highlight)] pointer-events-none",
  timeColumns: "relative flex items-center w-full h-full",
  timeColumn:
    "flex-1 h-[160px] overflow-y-auto [scrollbar-width:none] [scroll-snap-type:y_mandatory] [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--rdrp-color-primary)] focus-visible:ring-inset rounded-md",
  timeItem:
    "h-8 flex items-center justify-center cursor-pointer text-sm text-[color:var(--rdrp-color-text-muted)] [scroll-snap-align:center] transition-colors select-none hover:text-[color:var(--rdrp-color-text)]",
  timeItemActive: "text-[color:var(--rdrp-color-text)] font-semibold",
  timePadding: "h-8 shrink-0",
  timeColon: "text-sm font-semibold text-[color:var(--rdrp-color-text)] w-3 text-center shrink-0",
  timePeriodButton:
    "h-8 flex items-center justify-center cursor-pointer text-sm text-[color:var(--rdrp-color-text)] font-semibold border border-[color:var(--rdrp-color-border)] bg-[color:var(--rdrp-color-bg)] hover:bg-[color:var(--rdrp-color-bg-hover)] hover:text-[color:var(--rdrp-color-text)] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--rdrp-color-primary)]",
};

export const timePickerClassNames = {
  root: "relative w-max font-sans text-[13px] text-[color:var(--rdrp-color-text)] select-none",
  content:
    "min-w-[250px] [&.rdrp-size-small]:min-w-[210px] [&.rdrp-size-large]:min-w-[290px] [&.rdrp-size-x-large]:min-w-[340px]",
};
