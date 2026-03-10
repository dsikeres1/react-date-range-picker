import { useState } from "react";
import { useDatePicker } from "react-date-range-picker-headless";

export default function CustomDatePicker() {
  const [value, setValue] = useState<Date | null>(null);

  const {
    isOpen,
    calendar,
    getDayProps,
    displayValue,
    hasValue,
    canConfirm,
    locale,
    handleToggle,
    handleDateClick,
    handleConfirm,
    handleCancel,
    handleClear,
    handlePrevMonth,
    handleNextMonth,
    handleKeyDown,
    containerRef,
    popupRef,
  } = useDatePicker({ value, onChange: setValue });

  return (
    <div ref={containerRef} style={{ position: "relative", display: "inline-block" }}>
      {/* Trigger */}
      <button
        onClick={handleToggle}
        style={{
          padding: "8px 16px",
          border: "1px solid #d1d5db",
          borderRadius: 6,
          background: "white",
          cursor: "pointer",
          minWidth: 180,
          textAlign: "left",
        }}
      >
        {displayValue || locale.placeholder}
      </button>

      {/* Popup */}
      {isOpen && (
        <div
          ref={popupRef}
          onKeyDown={handleKeyDown}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: 4,
            padding: 16,
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 50,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <button onClick={handlePrevMonth}>{locale.prevMonth}</button>
            <span style={{ fontWeight: 600 }}>{locale.formatMonthYear(calendar.month)}</span>
            <button onClick={handleNextMonth}>{locale.nextMonth}</button>
          </div>

          {/* Weekday headers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 36px)",
              gap: 2,
              textAlign: "center",
            }}
          >
            {locale.weekdays.map((wd) => (
              <span key={wd} style={{ fontSize: 12, color: "#9ca3af", padding: 4 }}>
                {wd}
              </span>
            ))}
          </div>

          {/* Calendar grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 36px)", gap: 2 }}>
            {calendar.weeks.flat().map((day, i) => {
              if (!day) return <span key={i} />;
              const dp = getDayProps(day);
              return (
                <button
                  key={i}
                  onClick={() => handleDateClick(day)}
                  disabled={dp.isDisabled}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: dp.isFocused ? "2px solid #0ea5e9" : "none",
                    background: dp.isSelected ? "#0ea5e9" : dp.isToday ? "#f0f9ff" : "transparent",
                    color: dp.isSelected ? "white" : dp.isDisabled ? "#d1d5db" : "inherit",
                    cursor: dp.isDisabled ? "not-allowed" : "pointer",
                    fontWeight: dp.isToday ? 600 : 400,
                  }}
                >
                  {dp.day}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
            {hasValue && (
              <button onClick={handleClear} style={{ color: "#ef4444" }}>
                {locale.clear}
              </button>
            )}
            <button onClick={handleCancel}>{locale.cancel}</button>
            <button
              onClick={handleConfirm}
              disabled={!canConfirm}
              style={{
                background: canConfirm ? "#0ea5e9" : "#e5e7eb",
                color: canConfirm ? "white" : "#9ca3af",
                padding: "4px 16px",
                borderRadius: 4,
                border: "none",
              }}
            >
              {locale.confirm}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
