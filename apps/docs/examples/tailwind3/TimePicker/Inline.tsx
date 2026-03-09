import { useState } from "react";
import { TimePicker } from "react-date-range-picker-tailwind3";
import { padNumber } from "react-date-range-picker-headless";

export default function Inline() {
  const [value, setValue] = useState<Date | null>(null);

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
          Select a time
        </div>
        <TimePicker value={value} onChange={setValue} inline />
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 13, opacity: 0.5, marginBottom: 4 }}>Selected time</div>
        <div style={{ fontSize: 18, fontWeight: 600 }}>
          {value ? `${padNumber(value.getHours())}:${padNumber(value.getMinutes())}` : "\u2014"}
        </div>
      </div>
    </div>
  );
}
