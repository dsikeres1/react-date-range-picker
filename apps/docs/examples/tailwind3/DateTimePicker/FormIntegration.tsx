import { type SubmitEvent, useState } from "react";
import { DateTimePicker } from "react-date-range-picker-tailwind3";

export default function FormIntegration() {
  const [value, setValue] = useState<Date | null>(null);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const appointment = formData.get("appointment");
    alert(`Submitted datetime: ${typeof appointment === "string" ? appointment : ""}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DateTimePicker value={value} onChange={setValue} name="appointment" />
      <button type="submit" style={{ marginTop: 8 }}>
        Submit
      </button>
    </form>
  );
}
