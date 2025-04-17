
import { eachDayOfInterval } from "date-fns";
import { useAppDispatch, useAppSelector } from "../hook";
import { setEntriesRangeEnd, setEntriesRangeStart, setEntriesSelectedDates } from "../components/redux/slices/calendarSlice";
import Calendar from "../components/MultiDateCalendar/MultiDateCalendar";

const EntriesPage = () => {
  const { entriesRangeStart, entriesRangeEnd, entriesSelectedDates } = useAppSelector(
    (state) => state.rootReducer.calendarSlice
  );
  const dispatch = useAppDispatch();
  const handleDateClick = (day: Date) => {
    if (!entriesRangeStart || (entriesRangeStart && entriesRangeEnd)) {
      dispatch(setEntriesRangeStart(day));
      dispatch(setEntriesRangeEnd(null));

      dispatch(setEntriesSelectedDates([day]));
    } else if (entriesRangeStart && !entriesRangeEnd) {
      const sortedDates = [entriesRangeStart, day].sort(
        (a, b) => a.getTime() - b.getTime()
      );
      dispatch(setEntriesRangeStart(sortedDates[0]));
      dispatch(setEntriesRangeEnd(sortedDates[1]));

      const rangeDates = eachDayOfInterval({
        start: sortedDates[0],
        end: sortedDates[1],
      });
      dispatch(setEntriesSelectedDates(rangeDates));
    }
  };
  return (
    <Calendar
      type="entries"
      rangeStart={entriesRangeStart}
      rangeEnd={entriesRangeEnd}
      handleDateClick={handleDateClick}
      selectedDates={entriesSelectedDates}
    />
  );
};
export default EntriesPage;
