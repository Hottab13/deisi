import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addMonths, subMonths } from "date-fns";

interface CalendarState {
  entriesRangeStart: Date | null; 
  entriesRangeEnd: Date | null;
  entriesSelectedDates: Date[];

  ordersRangeStart: Date | null; 
  ordersRangeEnd: Date | null;
  ordersSelectedDates: Date[];

  financeRangeStart: Date | null; 
  financeRangeEnd: Date | null;
  financeSelectedDates: Date[];

  currentMonth: Date;
  months: Date[];
}

const initialState: CalendarState = {
  entriesRangeStart: null,
  entriesRangeEnd: null,
  entriesSelectedDates: [],

  ordersRangeStart: null,
  ordersRangeEnd:  null,
  ordersSelectedDates: [],

  financeRangeStart:null,
  financeRangeEnd: null,
  financeSelectedDates: [],

  currentMonth: new Date(),
  months: [],
};

const calendarSlice = createSlice({
  name: "calendarSlice",
  initialState,
  reducers: {
    setEntriesRangeStart: (state, action: PayloadAction<Date>) => {
      state.entriesRangeStart = action.payload;
    },
    setEntriesRangeEnd: (state, action: PayloadAction<Date | null>) => {
      state.entriesRangeEnd = action.payload;
    },
    setEntriesSelectedDates: (state, action: PayloadAction<Date[]>) => {
      state.entriesSelectedDates = action.payload;
    },
    
    setOrdersRangeStart: (state, action: PayloadAction<Date>) => {
      state.ordersRangeStart = action.payload;
    },
    setOrdersRangeEnd: (state, action: PayloadAction<Date | null>) => {
      state.ordersRangeEnd = action.payload;
    },
    setOrdersSelectedDates: (state, action: PayloadAction<Date[]>) => {
      state.ordersSelectedDates = action.payload;
    },

    setFinanceRangeStart: (state, action: PayloadAction<Date>) => {
      state.financeRangeStart = action.payload;
    },
    setFinanceRangeEnd: (state, action: PayloadAction<Date | null>) => {
      state.financeRangeEnd = action.payload;
    },
    setFinanceSelectedDates: (state, action: PayloadAction<Date[]>) => {
      state.financeSelectedDates = action.payload;
    },

    setCurrentMonth: (state, action: PayloadAction<Date>) => {
      state.currentMonth = action.payload;
    },
    setMonths: (state, action: PayloadAction<Date[]>) => {
      state.entriesSelectedDates = action.payload;
    },
    addMonthToEnd: (state) => {
      if (state.months.length > 0) {
        state.months.push(addMonths(state.months[state.months.length - 1], 1));
      }
    },
    addMonthToStart: (state) => {
      if (state.months.length > 0) {
        state.months.unshift(subMonths(state.months[0], 1));
      }
    }
  },
});

export const {
  setEntriesRangeStart,
  setEntriesRangeEnd,
  setEntriesSelectedDates,
  setOrdersRangeStart,
  setOrdersRangeEnd,
  setOrdersSelectedDates,

  setFinanceRangeStart,
  setFinanceRangeEnd,
  setFinanceSelectedDates,

  setCurrentMonth,
  setMonths,
  addMonthToEnd,
  addMonthToStart
} = calendarSlice.actions;
export default calendarSlice.reducer;
