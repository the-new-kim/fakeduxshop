import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const currencies = ["USD", "JPY", "EUR", "GBP"] as const; //📝 REF:::: https://steveholgado.com/typescript-types-from-arrays/

export type TCurrency = typeof currencies[number];

interface ICurrencyState {
  currency: TCurrency;
}

const initialState: ICurrencyState = { currency: "USD" };

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<ICurrencyState["currency"]>) {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice;
