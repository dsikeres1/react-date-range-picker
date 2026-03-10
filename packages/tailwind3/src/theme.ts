// Tailwind v3 theme
// Dark mode is handled by CSS variables (via .dark class or data-theme="dark").
// No dark: variants here — prevents unwanted auto-dark via prefers-color-scheme.

export const rootClassNames = {
  root: "relative w-max font-sans text-[13px] text-slate-900 select-none",
};

export const triggerClassNames = {
  trigger:
    "flex items-center gap-2 justify-between min-w-[200px] px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-md shadow-sm hover:border-sky-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:border-sky-500",
  placeholder: "text-slate-500",
  clear:
    "ml-2 p-1 -m-1 appearance-none border-0 bg-transparent text-slate-500 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-sm cursor-pointer",
};

export const headerClassNames = {
  header: "flex items-center justify-between mb-3",
  navButton:
    "flex items-center justify-center w-7 h-7 text-slate-500 rounded-md hover:bg-slate-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
  title: "flex-1 flex items-center justify-center gap-1 font-semibold text-[15px] text-slate-900",
  select:
    "px-1 py-0.5 text-sm bg-transparent border border-transparent rounded hover:border-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500 cursor-pointer",
  spacer: "flex-1",
};

export const gridClassNames = {
  panel: "flex flex-col",
  weekdays: "grid grid-cols-7 mb-1",
  weekday: "flex items-center justify-center h-7 text-xs font-medium text-slate-500",
  grid: "flex flex-col gap-1",
  week: "grid grid-cols-7",
};

export const dayClassNames = {
  day: "flex items-center justify-center min-w-9 h-9 mx-[1px] rounded-lg transition-colors cursor-pointer hover:bg-slate-100 focus-visible:outline-none",
  empty: "invisible pointer-events-none",
  today: "font-bold text-sky-500",
  selected: "bg-sky-500 text-white font-semibold hover:bg-sky-500 hover:text-white",
  disabled: "text-slate-500 opacity-50 pointer-events-none",
  outside: "text-slate-500/50",
  highlighted:
    "relative after:absolute after:bottom-[3px] after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-amber-500 after:rounded-full",
  inRange: "bg-sky-50 text-slate-900 rounded-none mx-0 hover:bg-sky-50",
  rangeStart:
    "bg-sky-500 text-white rounded-l-lg rounded-r-none mx-0 hover:bg-sky-500 hover:text-white",
  rangeEnd:
    "bg-sky-500 text-white rounded-r-lg rounded-l-none mx-0 hover:bg-sky-500 hover:text-white",
  rangeSingle: "bg-sky-500 text-white mx-0 hover:bg-sky-500 hover:text-white",
  hoverRange: "bg-sky-50/50 text-slate-900 rounded-none mx-0",
  hoverTarget: "bg-sky-100 text-slate-900",
  focused: "ring-2 ring-sky-500 ring-offset-1 ring-offset-white",
};

export const footerClassNames = {
  footer: "flex justify-end gap-2 mt-3 pt-3 border-t border-slate-200",
  button:
    "px-3.5 py-1.5 text-slate-500 border border-slate-200 hover:bg-slate-100 hover:border-sky-500/50 rounded-md transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
  confirmButton:
    "px-3.5 py-1.5 text-white bg-sky-500 hover:bg-sky-600 rounded-md transition-colors motion-reduce:transition-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
  clearButton:
    "mr-auto px-3.5 py-1.5 text-red-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
};

export const contentClassNames = {
  content:
    "absolute top-[calc(100%+8px)] left-0 z-50 p-4 bg-white text-slate-900 border border-slate-200 rounded-xl shadow-lg",
  contentInline: "static z-auto shadow-none mt-0",
};

export const rangeClassNames = {
  presetsContainer: "flex flex-col gap-0.5 pr-4 border-r border-slate-200 min-w-[140px]",
  presetButton:
    "px-4 py-2 text-left rounded-md transition-colors motion-reduce:transition-none hover:bg-slate-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
  presetButtonActive: "bg-sky-50 text-sky-500 font-medium",
  presetsLayout: "flex flex-wrap gap-4",
  calendarsContainer: "flex flex-wrap gap-6 max-sm:flex-col max-sm:gap-4",
};

export const dateTimeClassNames = {
  timeSection: "flex flex-col gap-3 mt-3 pt-3 border-t border-slate-200",
  timeLabel: "text-xs font-medium text-slate-500",
};

export const timePanelClassNames = {
  timePanel: "relative flex items-center justify-center w-fit mx-auto min-w-[120px] h-[176px]",
  timeHighlight: "absolute left-1 right-1 h-8 rounded-md bg-sky-500/10 pointer-events-none",
  timeColumns: "relative flex items-center w-full h-full",
  timeColumn:
    "flex-1 h-[160px] overflow-y-auto [scrollbar-width:none] [scroll-snap-type:y_mandatory] [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-inset rounded-md",
  timeItem:
    "h-8 flex items-center justify-center cursor-pointer text-sm text-slate-500 [scroll-snap-align:center] transition-colors select-none hover:text-slate-900",
  timeItemActive: "text-slate-900 font-semibold",
  timePadding: "h-8 shrink-0",
  timeColon: "text-sm font-semibold text-slate-900 w-3 text-center shrink-0",
  timePeriodButton:
    "h-8 flex items-center justify-center cursor-pointer text-sm text-slate-900 font-semibold border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
};

export const timePickerClassNames = {
  root: "relative w-max font-sans text-[13px] text-slate-900 select-none",
  content:
    "min-w-[250px] [&.rdrp-size-small]:min-w-[210px] [&.rdrp-size-large]:min-w-[290px] [&.rdrp-size-x-large]:min-w-[340px]",
};
