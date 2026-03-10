import { useState } from "react";
import { DateRangePicker } from "react-date-range-picker-styled";
import { createLocale } from "react-date-range-picker-headless";
import "react-date-range-picker-styled/rdrp-styles.css";

const koLocale = createLocale("ko-KR", {
  confirm: "확인",
  cancel: "취소",
  clear: "초기화",
  today: "오늘",
  rangePlaceholder: "날짜 범위 선택",
  rangeSeparator: " ~ ",
});

export default function CustomLocale() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return <DateRangePicker value={value} onChange={setValue} locale={koLocale} />;
}
