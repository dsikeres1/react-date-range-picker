import { useState, useEffect } from "react";
import { DatePicker } from "react-date-range-picker-tailwind4";

const WEB_FONTS = [
  { name: "Noto Sans", family: '"Noto Sans", sans-serif' },
  { name: "Noto Serif", family: '"Noto Serif", serif' },
  { name: "IBM Plex Sans", family: '"IBM Plex Sans", sans-serif' },
  { name: "Roboto Slab", family: '"Roboto Slab", serif' },
];

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Noto+Sans:wght@400;500;600;700&family=Noto+Serif:wght@400;500;600;700&family=Roboto+Slab:wght@400;500;600;700&display=swap";

export default function CompoundWebFonts() {
  const [value, setValue] = useState<Date | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!document.getElementById("web-fonts-link")) {
      const link = document.createElement("link");
      link.id = "web-fonts-link";
      link.rel = "stylesheet";
      link.href = FONT_URL;
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
        {WEB_FONTS.map((f, i) => (
          <button
            key={f.name}
            onClick={() => setActive(i)}
            style={{
              padding: "6px 14px",
              border: `1px solid ${active === i ? "#3b82f6" : "#d1d5db"}`,
              borderRadius: 6,
              background: active === i ? "#eff6ff" : "#fff",
              color: active === i ? "#3b82f6" : "#374151",
              cursor: "pointer",
              fontSize: 13,
              fontFamily: f.family,
            }}
          >
            {f.name}
          </button>
        ))}
      </div>
      <div style={{ fontFamily: WEB_FONTS[active].family }}>
        <DatePicker value={value} onChange={setValue} inline />
      </div>
    </div>
  );
}
