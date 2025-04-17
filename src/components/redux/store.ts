import { combineReducers, configureStore } from "@reduxjs/toolkit";

import calendarSlice from "./slices/calendarSlice";

/*import { WinApi } from "./WinApi";
import { CuponsApi } from "./CuponsApi";
import { UsersApi } from "./UserApi";
import { StatisticsApi } from "./StatisticsApi";
import { AuthUserApi } from "./AuthUserApi";
import { tBotApi } from "./TBotApi";
import { IPInfoApi } from "./IPInfoApi";
import oddsSelectSlice from "./slices/oddsSelectSlice";
import authSlice from "./slices/authSlice";
import plaidSlice from "./slices/plaidSlice";*/


const rootReducer = combineReducers({
  calendarSlice,
});

const store = configureStore({
  reducer: {
    rootReducer,
   /* [AuthUserApi.reducerPath]: AuthUserApi.reducer,
    [WinApi.reducerPath]: WinApi.reducer,
    [CuponsApi.reducerPath]: CuponsApi.reducer,
    [UsersApi.reducerPath]: UsersApi.reducer,
    [StatisticsApi.reducerPath]: StatisticsApi.reducer,
    [tBotApi.reducerPath]: tBotApi.reducer,
    [IPInfoApi.reducerPath]: IPInfoApi.reducer,*/
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      /*WinApi.middleware,
      AuthUserApi.middleware,
      CuponsApi.middleware,
      UsersApi.middleware,
      StatisticsApi.middleware,
      tBotApi.middleware,
      IPInfoApi.middleware,*/
    ]),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
