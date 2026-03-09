import { useState } from "react";
import {
  useStandaloneTimePicker,
  generateHours,
  generateMinutes,
  padNumber,
} from "react-date-range-picker-headless";

export default function CustomTimePicker() {
  const [value, setValue] = useState<Date | null>(null);
  const picker = useStandaloneTimePicker({ value, onChange: setValue, inline: true });

  const hours = generateHours();
  const minutes = generateMinutes(5);

  return (
    <div style={{ fontFamily: "system-ui" }}>
      <div style={{ marginBottom: 8, fontSize: 14, color: "#555" }}>
        Selected:{" "}
        {value ? `${padNumber(value.getHours())}:${padNumber(value.getMinutes())}` : "None"}
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: 16,
          background: "#fff",
          width: 240,
        }}
      >
        <div style={{ display: "flex", gap: 16 }}>
          {/* Hours column */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: "#888", textAlign: "center", marginBottom: 4 }}>
              {picker.locale.hoursLabel}
            </div>
            <div
              style={{ height: 200, overflowY: "auto", border: "1px solid #eee", borderRadius: 4 }}
            >
              {hours.map((h) => (
                <button
                  key={h}
                  onClick={() => picker.handleHourChange(h)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "6px 8px",
                    border: "none",
                    background: h === picker.tempHour ? "#3b82f6" : "transparent",
                    color: h === picker.tempHour ? "#fff" : "#333",
                    cursor: "pointer",
                    textAlign: "center",
                    fontSize: 14,
                  }}
                >
                  {padNumber(h)}
                </button>
              ))}
            </div>
          </div>

          {/* Minutes column */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: "#888", textAlign: "center", marginBottom: 4 }}>
              {picker.locale.minutesLabel}
            </div>
            <div
              style={{ height: 200, overflowY: "auto", border: "1px solid #eee", borderRadius: 4 }}
            >
              {minutes.map((m) => (
                <button
                  key={m}
                  onClick={() => picker.handleMinuteChange(m)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "6px 8px",
                    border: "none",
                    background: m === picker.tempMinute ? "#3b82f6" : "transparent",
                    color: m === picker.tempMinute ? "#fff" : "#333",
                    cursor: "pointer",
                    textAlign: "center",
                    fontSize: 14,
                  }}
                >
                  {padNumber(m)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
