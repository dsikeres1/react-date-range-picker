import { useState } from "react";
import { DatePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/styles.css";

export default function DisablePastFuture() {
  const [pastValue, setPastValue] = useState<Date | null>(null);
  const [futureValue, setFutureValue] = useState<Date | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.7, marginBottom: 8 }}>
          Past dates disabled
        </div>
        <DatePicker value={pastValue} onChange={setPastValue} disablePast />
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.7, marginBottom: 8 }}>
          Future dates disabled
        </div>
        <DatePicker value={futureValue} onChange={setFutureValue} disableFuture />
      </div>
    </div>
  );
}
