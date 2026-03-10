import type { Locale } from "../types";
import { createLocale } from "../locale";

export const ptBR: Locale = createLocale("pt-BR", {
  confirm: "Confirmar",
  cancel: "Cancelar",
  clear: "Limpar",
  today: "Hoje",
  placeholder: "Selecionar data",
  rangePlaceholder: "Selecionar período",
  dateTimePlaceholder: "Selecionar data e hora",
  rangeTimePlaceholder: "Selecionar período e hora",
  timePlaceholder: "Selecionar hora",
  yearLabel: "",
  monthLabel: "",
  hourLabel: "h",
  minuteLabel: "min",
  secondLabel: "s",
  hoursLabel: "Horas",
  minutesLabel: "Minutos",
  secondsLabel: "Segundos",
  startTimeLabel: "Hora de início",
  endTimeLabel: "Hora de término",
  prevMonthLabel: "Mês anterior",
  nextMonthLabel: "Próximo mês",
  selectYearLabel: "Selecionar ano",
  selectMonthLabel: "Selecionar mês",
});
