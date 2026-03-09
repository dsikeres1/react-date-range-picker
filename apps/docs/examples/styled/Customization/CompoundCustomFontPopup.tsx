import { useState } from "react";
import { DatePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/styles.css";

const presets = {
  Compact: {
    "--rdrp-font-size-xs": "9px",
    "--rdrp-font-size-sm": "10px",
    "--rdrp-font-size-base": "11px",
    "--rdrp-font-size-md": "12px",
    "--rdrp-font-size-lg": "13px",
    "--rdrp-font-weight-semibold": "500",
    "--rdrp-font-weight-bold": "600",
  },
  Default: {},
  Large: {
    "--rdrp-font-size-xs": "13px",
    "--rdrp-font-size-sm": "14px",
    "--rdrp-font-size-base": "15px",
    "--rdrp-font-size-md": "16px",
    "--rdrp-font-size-lg": "18px",
    "--rdrp-font-weight-semibold": "700",
    "--rdrp-font-weight-bold": "800",
  },
};

type PresetName = keyof typeof presets;

export default function CompoundCustomFontPopup() {
  const [value, setValue] = useState<Date | null>(null);
  const [preset, setPreset] = useState<PresetName>("Default");

  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {(Object.keys(presets) as PresetName[]).map((name) => (
          <button
            key={name}
            onClick={() => setPreset(name)}
            style={{
              padding: "6px 14px",
              border: `1px solid ${preset === name ? "#3b82f6" : "#d1d5db"}`,
              borderRadius: 6,
              background: preset === name ? "#eff6ff" : "#fff",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            {name}
          </button>
        ))}
      </div>
      <div style={presets[preset] as React.CSSProperties}>
        <DatePicker value={value} onChange={setValue} inline />
      </div>
    </div>
  );
}
