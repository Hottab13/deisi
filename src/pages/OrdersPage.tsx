import Calendar from "@/components/MultiDateCalendar/MultiDateCalendar";
import {
  setOrdersRangeEnd,
  setOrdersRangeStart,
  setOrdersSelectedDates,
} from "@/components/redux/slices/calendarSlice";
import { useAppDispatch, useAppSelector } from "@/hook";
import { eachDayOfInterval } from "date-fns";

const OrdersPage = () => {
  const { ordersRangeStart, ordersRangeEnd, ordersSelectedDates } =
    useAppSelector((state) => state.rootReducer.calendarSlice);
  const dispatch = useAppDispatch();
  const handleDateClick = (day: Date) => {
    if (!ordersRangeStart || (ordersRangeStart && ordersRangeEnd)) {
      dispatch(setOrdersRangeStart(day));
      dispatch(setOrdersRangeEnd(null));

      dispatch(setOrdersSelectedDates([day]));
    } else if (ordersRangeStart && !ordersRangeEnd) {
      const sortedDates = [ordersRangeStart, day].sort(
        (a, b) => a.getTime() - b.getTime()
      );
      dispatch(setOrdersRangeStart(sortedDates[0]));
      dispatch(setOrdersRangeEnd(sortedDates[1]));

      const rangeDates = eachDayOfInterval({
        start: sortedDates[0],
        end: sortedDates[1],
      });
      dispatch(setOrdersSelectedDates(rangeDates));
    }
  };
  return (
    <Calendar
      type="orders"
      rangeStart={ordersRangeStart}
      rangeEnd={ordersRangeEnd}
      handleDateClick={handleDateClick}
      selectedDates={ordersSelectedDates}
    />
  );
};
export default OrdersPage;
