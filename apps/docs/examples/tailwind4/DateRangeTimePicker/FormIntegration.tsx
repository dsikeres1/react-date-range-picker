import { type SubmitEvent, useState } from "react";
import { DateRangeTimePicker } from "react-date-range-picker-tailwind4";

export default function FormIntegration() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const start = formData.get("booking");
    const end = formData.get("booking-end");
    alert(
      `Submitted range: ${typeof start === "string" ? start : ""} ~ ${typeof end === "string" ? end : ""}`,
    );
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <DateRangeTimePicker
        value={value}
        onChange={setValue}
        name="booking"
        time={{ minuteStep: 5 }}
      />
      <button
        type="submit"
        style={{
          padding: "6px 14px",
          border: "1px solid #d1d5db",
          borderRadius: 6,
          background: "#3b82f6",
          color: "#fff",
          cursor: "pointer",
          fontSize: 13,
        }}
      >
        Submit
      </button>
    </form>
  );
}
