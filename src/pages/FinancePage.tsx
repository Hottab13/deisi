import { eachDayOfInterval } from "date-fns";

import Calendar from "@/components/MultiDateCalendar/MultiDateCalendar";
import {
  setFinanceRangeEnd,
  setFinanceRangeStart,
  setFinanceSelectedDates,
} from "@/components/redux/slices/calendarSlice";
import { useAppDispatch, useAppSelector } from "@/hook";

const FinancePage = () => {
  const { financeRangeStart, financeRangeEnd, financeSelectedDates } =
    useAppSelector((state) => state.rootReducer.calendarSlice);
  const dispatch = useAppDispatch();

  const handleDateClick = (day: Date) => {
    if (!financeRangeStart || (financeRangeStart && financeRangeEnd)) {
      dispatch(setFinanceRangeStart(day));
      dispatch(setFinanceRangeEnd(null));

      dispatch(setFinanceSelectedDates([day]));
    } else if (financeRangeStart && !financeRangeEnd) {
      const sortedDates = [financeRangeStart, day].sort(
        (a, b) => a.getTime() - b.getTime()
      );
      dispatch(setFinanceRangeStart(sortedDates[0]));
      dispatch(setFinanceRangeEnd(sortedDates[1]));

      const rangeDates = eachDayOfInterval({
        start: sortedDates[0],
        end: sortedDates[1],
      });
      dispatch(setFinanceSelectedDates(rangeDates));
    }
  };
  return (
    <Calendar
      type="finance"
      rangeStart={financeRangeStart}
      rangeEnd={financeRangeEnd}
      handleDateClick={handleDateClick}
      selectedDates={financeSelectedDates}
    />
  );
};
export default FinancePage;
