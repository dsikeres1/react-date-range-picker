import type { Locale } from "../types";
import { createLocale } from "../locale";

export const it: Locale = createLocale("it", {
  confirm: "Conferma",
  cancel: "Annulla",
  clear: "Pulisci",
  today: "Oggi",
  placeholder: "Seleziona data",
  rangePlaceholder: "Seleziona intervallo di date",
  dateTimePlaceholder: "Seleziona data e ora",
  rangeTimePlaceholder: "Seleziona intervallo di date e ora",
  timePlaceholder: "Seleziona ora",
  yearLabel: "",
  monthLabel: "",
  hourLabel: "ora",
  minuteLabel: "min",
  secondLabel: "sec",
  hoursLabel: "Ore",
  minutesLabel: "Minuti",
  secondsLabel: "Secondi",
  startTimeLabel: "Ora di inizio",
  endTimeLabel: "Ora di fine",
  prevMonthLabel: "Mese precedente",
  nextMonthLabel: "Mese successivo",
  selectYearLabel: "Seleziona anno",
  selectMonthLabel: "Seleziona mese",
});
