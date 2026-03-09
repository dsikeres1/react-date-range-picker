import { useState } from "react";
import { DateTimePicker } from "react-date-range-picker-tailwind4";

export default function CustomDarkMode() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <div
      className="dark"
      data-theme="dark"
      style={{
        padding: 24,
        borderRadius: 12,
        background: "#1e293b",
      }}
    >
      <DateTimePicker value={value} onChange={setValue} />
    </div>
  );
}
