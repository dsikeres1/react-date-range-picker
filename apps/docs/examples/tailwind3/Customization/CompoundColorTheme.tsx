import { useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind3";

const themes = {
  default: {
    selected: "bg-sky-500 text-white font-semibold hover:bg-sky-500/90",
    today: "font-bold text-sky-500",
    confirm: "bg-sky-500 hover:bg-sky-600",
  },
  purple: {
    selected: "bg-violet-500 text-white font-semibold hover:bg-violet-500/90",
    today: "font-bold text-violet-500",
    confirm: "bg-violet-500 hover:bg-violet-600",
  },
  rose: {
    selected: "bg-rose-500 text-white font-semibold hover:bg-rose-500/90",
    today: "font-bold text-rose-500",
    confirm: "bg-rose-500 hover:bg-rose-600",
  },
  emerald: {
    selected: "bg-emerald-500 text-white font-semibold hover:bg-emerald-500/90",
    today: "font-bold text-emerald-500",
    confirm: "bg-emerald-500 hover:bg-emerald-600",
  },
};

type ThemeName = keyof typeof themes;

export default function CompoundColorTheme() {
  const [value, setValue] = useState<Date | null>(null);
  const [theme, setTheme] = useState<ThemeName>("default");
  const t = themes[theme];

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {(Object.keys(themes) as ThemeName[]).map((name) => (
          <button
            key={name}
            onClick={() => setTheme(name)}
            style={{
              padding: "4px 12px",
              border: `1px solid ${theme === name ? "#3b82f6" : "#d1d5db"}`,
              borderRadius: 6,
              background: theme === name ? "#eff6ff" : "#fff",
              color: theme === name ? "#3b82f6" : "#374151",
              cursor: "pointer",
              fontSize: 13,
              textTransform: "capitalize",
            }}
          >
            {name}
          </button>
        ))}
      </div>
      <DatePicker.Root value={value} onChange={setValue} inline>
        <DatePicker.Content>
          <DatePicker.Header>
            <DatePicker.PrevButton />
            <DatePicker.Title />
            <DatePicker.NextButton />
          </DatePicker.Header>
          <DatePicker.Grid daySelectedClassName={t.selected} dayTodayClassName={t.today} />
        </DatePicker.Content>
      </DatePicker.Root>
    </div>
  );
}
