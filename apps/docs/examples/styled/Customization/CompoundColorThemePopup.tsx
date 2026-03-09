import { useState } from "react";
import { DatePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/styles.css";

const themes: Record<string, React.CSSProperties> = {
  default: {},
  purple: {
    "--rdrp-color-primary": "#8b5cf6",
    "--rdrp-color-primary-hover": "#7c3aed",
    "--rdrp-color-primary-light": "#ede9fe",
    "--rdrp-color-primary-lighter": "#f5f3ff",
  } as React.CSSProperties,
  rose: {
    "--rdrp-color-primary": "#f43f5e",
    "--rdrp-color-primary-hover": "#e11d48",
    "--rdrp-color-primary-light": "#ffe4e6",
    "--rdrp-color-primary-lighter": "#fff1f2",
  } as React.CSSProperties,
  emerald: {
    "--rdrp-color-primary": "#10b981",
    "--rdrp-color-primary-hover": "#059669",
    "--rdrp-color-primary-light": "#d1fae5",
    "--rdrp-color-primary-lighter": "#ecfdf5",
  } as React.CSSProperties,
};

const themeNames = Object.keys(themes);

export default function CompoundColorThemePopup() {
  const [value, setValue] = useState<Date | null>(null);
  const [theme, setTheme] = useState("default");

  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {themeNames.map((name) => (
          <button
            key={name}
            onClick={() => setTheme(name)}
            style={{
              padding: "6px 14px",
              border: `1px solid ${theme === name ? "#3b82f6" : "#d1d5db"}`,
              borderRadius: 6,
              background: theme === name ? "#eff6ff" : "#fff",
              cursor: "pointer",
              fontSize: 13,
              textTransform: "capitalize",
            }}
          >
            {name}
          </button>
        ))}
      </div>
      <DatePicker.Root value={value} onChange={setValue} style={themes[theme]}>
        <DatePicker.Trigger />
        <DatePicker.Content>
          <DatePicker.Header>
            <DatePicker.PrevButton />
            <DatePicker.Title />
            <DatePicker.NextButton />
          </DatePicker.Header>
          <DatePicker.Grid />
          <DatePicker.Footer>
            <DatePicker.ClearButton />
            <DatePicker.CancelButton />
            <DatePicker.ConfirmButton />
          </DatePicker.Footer>
        </DatePicker.Content>
      </DatePicker.Root>
    </div>
  );
}
