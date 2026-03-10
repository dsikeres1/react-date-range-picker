import { useState } from "react";
import { useDateRangePicker, type DayProps } from "react-date-range-picker-headless";

export default function CustomDateRangePicker() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  const picker = useDateRangePicker({ value, onChange: setValue });

  return (
    <div style={{ fontFamily: "system-ui" }}>
      <button onClick={picker.handleToggle} style={{ padding: "8px 16px", cursor: "pointer" }}>
        {picker.displayValue || "Select a date range"}
      </button>

      {picker.isOpen && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: 16,
            marginTop: 8,
            borderRadius: 8,
            background: "#fff",
          }}
        >
          <div style={{ display: "flex", gap: 24 }}>
            {/* Left Calendar */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <button onClick={picker.handlePrevMonth}>←</button>
                <span>{picker.locale.formatMonthYear(picker.leftMonth)}</span>
                <div style={{ width: 24 }} />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  textAlign: "center",
                }}
              >
                {picker.locale.weekdays.map((wd) => (
                  <div key={wd} style={{ fontSize: 12, color: "#888", padding: 4 }}>
                    {wd}
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  textAlign: "center",
                }}
              >
                {picker.leftCalendar.days.map((date, i) => {
                  if (!date) return <div key={i} />;
                  const dp: DayProps = picker.getDayProps(date);
                  return (
                    <button
                      key={i}
                      onClick={() => picker.handleDateClick(date)}
                      onMouseEnter={() => picker.handleDateHover(date)}
                      onMouseLeave={() => picker.handleDateHover(null)}
                      disabled={dp.isDisabled}
                      style={{
                        padding: 8,
                        cursor: dp.isDisabled ? "not-allowed" : "pointer",
                        background:
                          dp.isRangeStart || dp.isRangeEnd
                            ? "#3b82f6"
                            : dp.isInRange || dp.isInHoverRange
                              ? "#dbeafe"
                              : "transparent",
                        color:
                          dp.isRangeStart || dp.isRangeEnd
                            ? "#fff"
                            : dp.isToday
                              ? "#3b82f6"
                              : dp.isDisabled
                                ? "#ccc"
                                : "#333",
                        fontWeight: dp.isToday ? "bold" : "normal",
                        border: "none",
                        borderRadius: dp.isRangeStart
                          ? "4px 0 0 4px"
                          : dp.isRangeEnd
                            ? "0 4px 4px 0"
                            : 0,
                      }}
                    >
                      {dp.day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Calendar */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ width: 24 }} />
                <span>{picker.locale.formatMonthYear(picker.rightMonth)}</span>
                <button onClick={picker.handleNextMonth}>→</button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  textAlign: "center",
                }}
              >
                {picker.locale.weekdays.map((wd) => (
                  <div key={wd} style={{ fontSize: 12, color: "#888", padding: 4 }}>
                    {wd}
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  textAlign: "center",
                }}
              >
                {picker.rightCalendar.days.map((date, i) => {
                  if (!date) return <div key={i} />;
                  const dp: DayProps = picker.getDayProps(date);
                  return (
                    <button
                      key={i}
                      onClick={() => picker.handleDateClick(date)}
                      onMouseEnter={() => picker.handleDateHover(date)}
                      onMouseLeave={() => picker.handleDateHover(null)}
                      disabled={dp.isDisabled}
                      style={{
                        padding: 8,
                        cursor: dp.isDisabled ? "not-allowed" : "pointer",
                        background:
                          dp.isRangeStart || dp.isRangeEnd
                            ? "#3b82f6"
                            : dp.isInRange || dp.isInHoverRange
                              ? "#dbeafe"
                              : "transparent",
                        color:
                          dp.isRangeStart || dp.isRangeEnd
                            ? "#fff"
                            : dp.isToday
                              ? "#3b82f6"
                              : dp.isDisabled
                                ? "#ccc"
                                : "#333",
                        fontWeight: dp.isToday ? "bold" : "normal",
                        border: "none",
                        borderRadius: dp.isRangeStart
                          ? "4px 0 0 4px"
                          : dp.isRangeEnd
                            ? "0 4px 4px 0"
                            : 0,
                      }}
                    >
                      {dp.day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
            <button onClick={picker.handleCancel}>Cancel</button>
            <button onClick={picker.handleConfirm} disabled={!picker.canConfirm}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
