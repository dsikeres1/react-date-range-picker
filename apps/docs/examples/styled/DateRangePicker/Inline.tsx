import { useState } from "react";
import { DateRangePicker } from "react-date-range-picker-styled";
import { formatDate } from "react-date-range-picker-headless";
import "react-date-range-picker-styled/rdrp-styles.css";

export default function Inline() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  const fmt = (d: Date | null) => (d ? formatDate(d) : "\u2014");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          padding: 16,
          border: "1px solid rgba(128,128,128,0.2)",
          borderRadius: 8,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, opacity: 0.7 }}>
          Filter by date range
        </div>
        <DateRangePicker value={value} onChange={setValue} inline />
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 13, opacity: 0.5, marginBottom: 4 }}>Selected range</div>
        <div style={{ fontSize: 16, fontWeight: 600 }}>
          {fmt(value.start)} → {fmt(value.end)}
        </div>
      </div>
    </div>
  );
}
