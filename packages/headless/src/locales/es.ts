import type { Locale } from "../types";
import { createLocale } from "../locale";

export const es: Locale = createLocale("es", {
  confirm: "Confirmar",
  cancel: "Cancelar",
  clear: "Limpiar",
  today: "Hoy",
  placeholder: "Seleccionar fecha",
  rangePlaceholder: "Seleccionar rango de fechas",
  dateTimePlaceholder: "Seleccionar fecha y hora",
  rangeTimePlaceholder: "Seleccionar rango de fechas y hora",
  timePlaceholder: "Seleccionar hora",
  yearLabel: "",
  monthLabel: "",
  hourLabel: "h",
  minuteLabel: "min",
  secondLabel: "s",
  hoursLabel: "Horas",
  minutesLabel: "Minutos",
  secondsLabel: "Segundos",
  startTimeLabel: "Hora de inicio",
  endTimeLabel: "Hora de fin",
  prevMonthLabel: "Mes anterior",
  nextMonthLabel: "Mes siguiente",
  selectYearLabel: "Seleccionar año",
  selectMonthLabel: "Seleccionar mes",
});
