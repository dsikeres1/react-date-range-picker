import { useState } from "react";
import { DateRangePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/styles.css";

export default function CompoundCustomTriggerRange() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return (
    <DateRangePicker.Root value={value} onChange={setValue}>
      <DateRangePicker.Trigger>
        {({ displayValue, isOpen, onToggle, triggerRef }) => (
          <button
            ref={triggerRef as React.Ref<HTMLButtonElement>}
            onClick={onToggle}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              border: `2px solid ${isOpen ? "#3b82f6" : "#d1d5db"}`,
              borderRadius: 8,
              background: isOpen ? "#eff6ff" : "#fff",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
              transition: "border-color 0.15s, background 0.15s",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{displayValue || "Select date range"}</span>
          </button>
        )}
      </DateRangePicker.Trigger>
      <DateRangePicker.Content>
        <div>
          <DateRangePicker.Header>
            <DateRangePicker.PrevButton />
            <DateRangePicker.Title calendarIndex={0} />
            <div style={{ flex: 1 }} />
            <DateRangePicker.Title calendarIndex={1} />
            <DateRangePicker.NextButton />
          </DateRangePicker.Header>
          <DateRangePicker.Calendars>
            <DateRangePicker.Grid calendarIndex={0} />
            <DateRangePicker.Grid calendarIndex={1} />
          </DateRangePicker.Calendars>
          <DateRangePicker.Footer>
            <DateRangePicker.ClearButton />
            <DateRangePicker.CancelButton />
            <DateRangePicker.ConfirmButton />
          </DateRangePicker.Footer>
        </div>
      </DateRangePicker.Content>
    </DateRangePicker.Root>
  );
}
