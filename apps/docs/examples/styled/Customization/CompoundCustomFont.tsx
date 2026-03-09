import { useState } from "react";
import { DatePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/rdrp-styles.css";

const fonts = {
  System: {},
  Serif: { "--rdrp-font-family": '"Georgia", "Times New Roman", serif' },
  Mono: { "--rdrp-font-family": '"Menlo", "Courier New", monospace' },
};

type FontName = keyof typeof fonts;

export default function CompoundCustomFont() {
  const [value, setValue] = useState<Date | null>(null);
  const [font, setFont] = useState<FontName>("System");

  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {(Object.keys(fonts) as FontName[]).map((name) => (
          <button
            key={name}
            onClick={() => setFont(name)}
            style={{
              padding: "6px 14px",
              border: `1px solid ${font === name ? "#3b82f6" : "#d1d5db"}`,
              borderRadius: 6,
              background: font === name ? "#eff6ff" : "#fff",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            {name}
          </button>
        ))}
      </div>
      <div style={fonts[font] as React.CSSProperties}>
        <DatePicker value={value} onChange={setValue} inline />
      </div>
    </div>
  );
}
