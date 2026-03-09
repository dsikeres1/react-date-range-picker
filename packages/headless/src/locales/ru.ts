import type { Locale } from "../types";
import { createLocale } from "../locale";

export const ru: Locale = createLocale("ru", {
  confirm: "Подтвердить",
  cancel: "Отмена",
  clear: "Очистить",
  today: "Сегодня",
  placeholder: "Выберите дату",
  rangePlaceholder: "Выберите диапазон дат",
  dateTimePlaceholder: "Выберите дату и время",
  rangeTimePlaceholder: "Выберите диапазон дат и время",
  timePlaceholder: "Выберите время",
  yearLabel: "",
  monthLabel: "",
  hourLabel: "ч",
  minuteLabel: "мин",
  secondLabel: "сек",
  hoursLabel: "Часы",
  minutesLabel: "Минуты",
  secondsLabel: "Секунды",
  startTimeLabel: "Время начала",
  endTimeLabel: "Время окончания",
  prevMonthLabel: "Предыдущий месяц",
  nextMonthLabel: "Следующий месяц",
  selectYearLabel: "Выберите год",
  selectMonthLabel: "Выберите месяц",
});
