import { useState } from "react";
import { DateRangePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/rdrp-styles.css";

export default function CSSCustomColors() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return (
    <div
      style={{
        ["--rdrp-color-primary" as string]: "#8b5cf6",
        ["--rdrp-color-primary-hover" as string]: "#7c3aed",
        ["--rdrp-color-primary-light" as string]: "#ede9fe",
        ["--rdrp-color-primary-lighter" as string]: "#f5f3ff",
        ["--rdrp-color-primary-disabled" as string]: "#c4b5fd",
        ["--rdrp-color-range-bg" as string]: "#ede9fe",
        ["--rdrp-color-hover-range-bg" as string]: "#f5f3ff",
        ["--rdrp-color-hover-target-bg" as string]: "#ddd6fe",
        ["--rdrp-color-text-today" as string]: "#7c3aed",
        ["--rdrp-color-border-hover" as string]: "#c4b5fd",
      }}
    >
      <DateRangePicker value={value} onChange={setValue} />
    </div>
  );
}
