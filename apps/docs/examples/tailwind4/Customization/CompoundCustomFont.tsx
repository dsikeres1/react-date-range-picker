import { useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind4";

const fonts = {
  system: "inherit",
  serif: "'Georgia', 'Times New Roman', serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
};

type FontName = keyof typeof fonts;

export default function CompoundCustomFont() {
  const [value, setValue] = useState<Date | null>(null);
  const [font, setFont] = useState<FontName>("system");

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(Object.keys(fonts) as FontName[]).map((name) => (
          <button
            key={name}
            onClick={() => setFont(name)}
            style={{
              padding: "4px 12px",
              borderRadius: 4,
              border: `1px solid ${font === name ? "#3b82f6" : "#d1d5db"}`,
              background: font === name ? "#eff6ff" : "#fff",
              color: font === name ? "#3b82f6" : "#374151",
              cursor: "pointer",
              fontSize: 13,
              fontFamily: fonts[name],
              textTransform: "capitalize",
            }}
          >
            {name}
          </button>
        ))}
      </div>
      <div style={{ fontFamily: fonts[font] }}>
        <DatePicker value={value} onChange={setValue} inline />
      </div>
    </div>
  );
}
