import { useState } from "react";
import { TimePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/rdrp-styles.css";

export default function CompoundTimePicker() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <TimePicker.Root value={value} onChange={setValue}>
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
              border: "1px solid #d1d5db",
              borderRadius: 6,
              background: isOpen ? "#eff6ff" : "#fff",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            <span style={{ fontSize: 18 }}>{"\uD83D\uDD52"}</span>
            <span>{displayValue || "Select time"}</span>
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
