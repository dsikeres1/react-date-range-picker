import type { Locale } from "../types";
import { createLocale } from "../locale";

export const pl: Locale = createLocale("pl", {
  confirm: "Zatwierdź",
  cancel: "Anuluj",
  clear: "Wyczyść",
  today: "Dzisiaj",
  placeholder: "Wybierz datę",
  rangePlaceholder: "Wybierz zakres dat",
  dateTimePlaceholder: "Wybierz datę i godzinę",
  rangeTimePlaceholder: "Wybierz zakres dat i godziny",
  timePlaceholder: "Wybierz godzinę",
  yearLabel: "",
  monthLabel: "",
  hourLabel: "godz.",
  minuteLabel: "min",
  secondLabel: "sek",
  hoursLabel: "Godziny",
  minutesLabel: "Minuty",
  secondsLabel: "Sekundy",
  startTimeLabel: "Czas rozpoczęcia",
  endTimeLabel: "Czas zakończenia",
  prevMonthLabel: "Poprzedni miesiąc",
  nextMonthLabel: "Następny miesiąc",
  selectYearLabel: "Wybierz rok",
  selectMonthLabel: "Wybierz miesiąc",
});
