import { useState } from "react";
import { DatePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/rdrp-styles.css";

export default function CompoundDarkMode() {
  const [value, setValue] = useState<Date | null>(null);
  const [isDark, setIsDark] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsDark((prev) => !prev)}
        style={{
          marginBottom: 12,
          padding: "6px 14px",
          border: "1px solid #d1d5db",
          borderRadius: 6,
          background: isDark ? "#374151" : "#fff",
          color: isDark ? "#f9fafb" : "#111827",
          cursor: "pointer",
          fontSize: 13,
        }}
      >
        {isDark ? "Switch to Light" : "Switch to Dark"}
      </button>
      <div
        className="rdrp-root"
        data-theme={isDark ? "dark" : "light"}
        style={{
          padding: 16,
          borderRadius: 8,
          background: isDark ? "#0f172a" : "#fff",
          display: "inline-block",
        }}
      >
        <DatePicker value={value} onChange={setValue} inline />
      </div>
    </div>
  );
}
