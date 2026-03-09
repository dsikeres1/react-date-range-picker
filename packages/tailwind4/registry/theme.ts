// Theme values for tailwind4

export const rootClassNames = {
  root: "relative w-max font-sans text-[13px] text-foreground select-none",
};

export const triggerClassNames = {
  trigger:
    "flex items-center gap-2 justify-between min-w-[200px] px-3.5 py-2 bg-background border border-input rounded-md shadow-sm hover:border-ring/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring",
  placeholder: "text-muted-foreground",
  clear:
    "ml-2 p-1 -m-1 appearance-none border-0 bg-transparent text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm cursor-pointer",
};

export const headerClassNames = {
  header: "flex items-center justify-between mb-4",
  navButton:
    "flex items-center justify-center w-7 h-7 text-muted-foreground rounded hover:bg-accent hover:text-accent-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  title: "font-semibold text-[15px] text-foreground",
  select:
    "px-1 py-0.5 text-sm bg-transparent border border-transparent rounded hover:border-border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer",
  spacer: "flex-1",
};

export const gridClassNames = {
  panel: "flex flex-col",
  weekdays: "grid grid-cols-7 mb-2",
  weekday:
    "flex items-center justify-center h-7 text-xs font-medium text-muted-foreground uppercase",
  grid: "flex flex-col gap-1",
  week: "grid grid-cols-7",
};

export const dayClassNames = {
  day: "flex items-center justify-center w-9 h-9 mx-[1px] rounded-md transition-colors cursor-pointer hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
  empty: "invisible pointer-events-none",
  today: "font-bold text-primary",
  selected: "bg-primary text-primary-foreground font-semibold hover:bg-primary/90",
  disabled: "text-muted-foreground opacity-50 pointer-events-none",
  outside: "text-muted-foreground/50",
  highlighted:
    "relative after:absolute after:bottom-1 after:w-1 after:h-1 after:bg-primary after:rounded-full",
  inRange: "bg-primary/10 text-accent-foreground rounded-none mx-0 hover:bg-primary/15",
  rangeStart: "bg-primary text-primary-foreground rounded-r-none mx-0 hover:bg-primary/90",
  rangeEnd: "bg-primary text-primary-foreground rounded-l-none mx-0 hover:bg-primary/90",
  rangeSingle: "bg-primary text-primary-foreground mx-0 hover:bg-primary/90",
  hoverRange: "bg-primary/5 text-accent-foreground rounded-none mx-0",
  hoverTarget: "bg-primary/20 text-accent-foreground",
  focused: "ring-2 ring-ring ring-offset-1 ring-offset-background",
};

export const footerClassNames = {
  footer: "flex justify-end gap-2 mt-4 pt-4 border-t border-border",
  button:
    "px-3 py-1.5 text-sm text-muted-foreground border border-input hover:text-foreground hover:bg-accent rounded-md transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  confirmButton:
    "px-3 py-1.5 text-sm text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors motion-reduce:transition-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  clearButton:
    "mr-auto px-3 py-1.5 text-sm text-destructive hover:text-destructive/80 hover:bg-accent rounded-md transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
};

export const contentClassNames = {
  content:
    "absolute top-[calc(100%+8px)] left-0 z-50 p-4 bg-popover text-popover-foreground border border-border rounded-lg shadow-md",
  contentInline: "static z-auto shadow-none mt-0",
};

export const rangeClassNames = {
  presetsContainer: "flex flex-col gap-1 pr-4 border-r border-border min-w-[140px]",
  presetButton:
    "px-3 py-1.5 text-sm text-left rounded-md transition-colors motion-reduce:transition-none hover:bg-accent cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  presetButtonActive: "bg-primary/10 text-primary font-medium",
  presetsLayout: "flex flex-wrap gap-4",
  calendarsContainer: "flex flex-wrap gap-8 max-sm:flex-col max-sm:gap-4",
};

export const dateTimeClassNames = {
  timeSection: "flex flex-col gap-3 mt-4 pt-4 border-t border-border",
  timeLabel: "text-xs font-medium text-muted-foreground",
};

export const timePanelClassNames = {
  timePanel: "relative flex items-center justify-center w-fit mx-auto min-w-[120px] h-[176px]",
  timeHighlight: "absolute left-1 right-1 h-8 rounded-md bg-primary/8 pointer-events-none",
  timeColumns: "relative flex items-center w-full h-full",
  timeColumn:
    "flex-1 h-[160px] overflow-y-auto [scrollbar-width:none] [scroll-snap-type:y_mandatory] [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset rounded-md",
  timeItem:
    "h-8 flex items-center justify-center cursor-pointer text-sm text-muted-foreground [scroll-snap-align:center] transition-colors select-none hover:text-foreground",
  timeItemActive: "text-foreground font-semibold",
  timePadding: "h-8 shrink-0",
  timeColon: "text-sm font-semibold text-foreground w-3 text-center shrink-0",
  timePeriodButton:
    "h-8 flex items-center justify-center cursor-pointer text-sm text-foreground font-semibold border border-border bg-background hover:bg-accent hover:text-accent-foreground rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
};

export const timePickerClassNames = {
  root: "relative w-max font-sans text-[13px] text-foreground select-none",
  content:
    "min-w-[250px] [&.rdrp-size-small]:min-w-[210px] [&.rdrp-size-large]:min-w-[290px] [&.rdrp-size-x-large]:min-w-[340px]",
};
