import type { Locale } from "../types";
import { createLocale } from "../locale";

export const th: Locale = createLocale("th", {
  confirm: "ยืนยัน",
  cancel: "ยกเลิก",
  clear: "ล้าง",
  today: "วันนี้",
  placeholder: "เลือกวันที่",
  rangePlaceholder: "เลือกช่วงวันที่",
  dateTimePlaceholder: "เลือกวันที่และเวลา",
  rangeTimePlaceholder: "เลือกช่วงวันที่และเวลา",
  timePlaceholder: "เลือกเวลา",
  yearLabel: "",
  monthLabel: "",
  hourLabel: "ชม.",
  minuteLabel: "น.",
  secondLabel: "วิ.",
  hoursLabel: "ชั่วโมง",
  minutesLabel: "นาที",
  secondsLabel: "วินาที",
  startTimeLabel: "เวลาเริ่มต้น",
  endTimeLabel: "เวลาสิ้นสุด",
  prevMonthLabel: "เดือนก่อนหน้า",
  nextMonthLabel: "เดือนถัดไป",
  selectYearLabel: "เลือกปี",
  selectMonthLabel: "เลือกเดือน",
});
