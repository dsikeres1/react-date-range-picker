import { useState, useEffect } from "react";
import { DatePicker } from "react-date-range-picker-tailwind4";

export default function CompoundNotoSans() {
  const [value, setValue] = useState<Date | null>(null);

  useEffect(() => {
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
    <div style={{ fontFamily: '"Noto Sans", sans-serif' }}>
      <DatePicker value={value} onChange={setValue} inline />
    </div>
  );
}
