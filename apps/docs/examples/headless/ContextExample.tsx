import { useState } from "react";
import {
  DatePickerProvider,
  usePickerContext,
  type DayProps,
} from "react-date-range-picker-headless";

/** A child component that reads from PickerContext instead of receiving props. */
function CalendarDisplay() {
  const ctx = usePickerContext();

  const calendar = ctx.calendars[0];

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8, background: "#fff" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <button onClick={ctx.handlePrevMonth}>←</button>
        <span>{ctx.locale.formatMonthYear(calendar.month)}</span>
        <button onClick={ctx.handleNextMonth}>→</button>
      </div>

      {/* Weekdays */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center" }}>
        {ctx.locale.weekdays.map((wd) => (
          <div key={wd} style={{ fontSize: 12, color: "#888", padding: 4 }}>
            {wd}
          </div>
        ))}
      </div>

      {/* Days */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center" }}>
        {calendar.days.map((date, i) => {
          if (!date) return <div key={i} />;
          const dp: DayProps = ctx.getDayProps(date);
          return (
            <button
              key={i}
              onClick={() => ctx.handleDateClick(date)}
              disabled={dp.isDisabled}
              style={{
                padding: 8,
                cursor: dp.isDisabled ? "not-allowed" : "pointer",
                background: dp.isSelected ? "#3b82f6" : "transparent",
                color: dp.isSelected
                  ? "#fff"
                  : dp.isToday
                    ? "#3b82f6"
                    : dp.isDisabled
                      ? "#ccc"
                      : "#333",
                fontWeight: dp.isToday ? "bold" : "normal",
                border: "none",
                borderRadius: 4,
              }}
            >
              {dp.day}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
        <button onClick={ctx.handleCancel}>Cancel</button>
        <button onClick={ctx.handleConfirm} disabled={!ctx.canConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
}

/** Main example wrapping with DatePickerProvider so children can use usePickerContext. */
export default function ContextExample() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <div style={{ fontFamily: "system-ui" }}>
      <DatePickerProvider value={value} onChange={setValue} initialOpen>
        <div style={{ marginBottom: 8, fontSize: 14, color: "#555" }}>
          Context-driven calendar (always open via initialOpen):
        </div>
        <CalendarDisplay />
      </DatePickerProvider>
    </div>
  );
}
