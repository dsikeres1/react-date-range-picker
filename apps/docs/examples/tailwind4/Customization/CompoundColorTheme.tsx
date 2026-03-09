import { useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind4";

const themes = {
  default: {},
  purple: {
    "--color-primary": "oklch(0.541 0.281 293.009)",
    "--color-primary-foreground": "oklch(1 0 0)",
  },
  rose: {
    "--color-primary": "oklch(0.586 0.237 17.584)",
    "--color-primary-foreground": "oklch(1 0 0)",
  },
  emerald: {
    "--color-primary": "oklch(0.696 0.17 162.48)",
    "--color-primary-foreground": "oklch(1 0 0)",
  },
} as const;

type ThemeName = keyof typeof themes;

export default function CompoundColorTheme() {
  const [value, setValue] = useState<Date | null>(null);
  const [theme, setTheme] = useState<ThemeName>("default");

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {(Object.keys(themes) as ThemeName[]).map((name) => (
          <button
            key={name}
            onClick={() => setTheme(name)}
            style={{
              padding: "4px 12px",
              borderRadius: 4,
              border: `1px solid ${theme === name ? "#3b82f6" : "#d1d5db"}`,
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
      <DatePicker.Root
        value={value}
        onChange={setValue}
        inline
        style={themes[theme] as React.CSSProperties}
      >
        <DatePicker.Content>
          <DatePicker.Header>
            <DatePicker.PrevButton />
            <DatePicker.Title />
            <DatePicker.NextButton />
          </DatePicker.Header>
          <DatePicker.Grid />
        </DatePicker.Content>
      </DatePicker.Root>
    </div>
  );
}
