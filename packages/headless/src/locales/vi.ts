import type { Locale } from "../types";
import { createLocale } from "../locale";

export const vi: Locale = createLocale("vi", {
  confirm: "Xác nhận",
  cancel: "Hủy",
  clear: "Xóa",
  today: "Hôm nay",
  placeholder: "Chọn ngày",
  rangePlaceholder: "Chọn khoảng ngày",
  dateTimePlaceholder: "Chọn ngày và giờ",
  rangeTimePlaceholder: "Chọn khoảng ngày và giờ",
  timePlaceholder: "Chọn giờ",
  yearLabel: "Năm",
  monthLabel: "Tháng",
  hourLabel: "giờ",
  minuteLabel: "phút",
  secondLabel: "giây",
  hoursLabel: "Giờ",
  minutesLabel: "Phút",
  secondsLabel: "Giây",
  startTimeLabel: "Thời gian bắt đầu",
  endTimeLabel: "Thời gian kết thúc",
  prevMonthLabel: "Tháng trước",
  nextMonthLabel: "Tháng sau",
  selectYearLabel: "Chọn năm",
  selectMonthLabel: "Chọn tháng",
});
