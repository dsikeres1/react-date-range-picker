import { useState, useEffect } from "react";
import { DatePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/styles.css";

export default function CompoundNotoSans() {
  const [value, setValue] = useState<Date | null>(null);

  useEffect(() => {
    // Load Noto Sans from Google Fonts (for demo purposes only)
    if (!document.getElementById("noto-sans-font")) {
      const link = document.createElement("link");
      link.id = "noto-sans-font";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div style={{ "--rdrp-font-family": '"Noto Sans", sans-serif' } as React.CSSProperties}>
      <DatePicker value={value} onChange={setValue} inline />
    </div>
  );
}
