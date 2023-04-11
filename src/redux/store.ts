import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import currencyReducer from "./slices/currencySlice";
import exchangeRatesReducer from "./slices/exchangeRatesSlice";
import cartReducer from "./slices/cartSlice";

const reducer = {
  currencySlice: currencyReducer,
  exhcangeRateSlice: exchangeRatesReducer,
  cartSlice: cartReducer,
};

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
