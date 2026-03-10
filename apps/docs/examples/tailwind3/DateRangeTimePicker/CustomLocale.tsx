import { useState } from "react";
import { DateRangeTimePicker } from "react-date-range-picker-tailwind3";
import { createLocale } from "react-date-range-picker-headless";

const koLocale = createLocale("ko-KR", {
  confirm: "확인",
  cancel: "취소",
  clear: "초기화",
  today: "오늘",
  rangePlaceholder: "날짜·시간 범위 선택",
  rangeSeparator: " ~ ",
});

export default function CustomLocale() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return (
    <DateRangeTimePicker
      value={value}
      onChange={setValue}
      locale={koLocale}
      time={{ minuteStep: 5 }}
    />
  );
}
