import { useState } from "react";
import { TimePicker } from "react-date-range-picker-tailwind4";

export default function CompoundTimePickerTwelveHour() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <TimePicker.Root value={value} onChange={setValue} time={{ hourFormat: "12" }}>
      <TimePicker.Trigger>
        {({ displayValue, isOpen, onToggle, triggerRef }) => (
          <button
            ref={triggerRef as React.Ref<HTMLButtonElement>}
            onClick={onToggle}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              border: `1px solid ${isOpen ? "#3b82f6" : "#d1d5db"}`,
              borderRadius: 6,
              background: isOpen ? "#eff6ff" : "#fff",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            <span style={{ fontSize: 16 }}>🕐</span>
            <span>{displayValue || "Select time (12h)"}</span>
          </button>
        )}
      </TimePicker.Trigger>
      <TimePicker.Content>
        <TimePicker.TimePanel target="single" />
        <TimePicker.Footer>
          <TimePicker.ClearButton />
          <TimePicker.CancelButton />
          <TimePicker.ConfirmButton />
        </TimePicker.Footer>
      </TimePicker.Content>
    </TimePicker.Root>
  );
}
