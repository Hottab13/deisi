// Типы
export type DateSelectionHandler = (date: Date) => void;
export type MonthData = {
  date: Date;
  days: Date[];
  weekDays: string[];
};