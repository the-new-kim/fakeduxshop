import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const currencies = ["USD", "JPY", "EUR", "GBP"] as const; //📝 REF:::: https://steveholgado.com/typescript-types-from-arrays/

export type TCurrency = typeof currencies[number];

const CURRENCY = "currency";

interface ICurrencyState {
  currency: TCurrency;
}

const initialState: ICurrencyState = { currency: "USD" };

const currencySlice = createSlice({
  name: "currencySlice",
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<ICurrencyState["currency"]>) {
      state.currency = action.payload;
      localStorage.setItem(CURRENCY, action.payload);
    },
    initCurrency(state) {
      const localStorageCurrency = localStorage.getItem(CURRENCY) as TCurrency;
      if (localStorageCurrency) {
        state.currency = localStorageCurrency;
      } else {
        localStorage.setItem(CURRENCY, state.currency);
      }
    },
  },
});

export const { setCurrency, initCurrency } = currencySlice.actions;
export default currencySlice.reducer;
