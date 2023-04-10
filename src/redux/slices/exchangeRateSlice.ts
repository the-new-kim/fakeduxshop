import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IExchangeRate {
  base: string;
  date: string;
  rates: {
    EUR: number;
    GBP: number;
    JPY: number;
  };
  success: boolean;
  timestamp: number;
}

interface IExchangeRateState {
  exchangeRate: IExchangeRate | null;
}

const initialState: IExchangeRateState = {
  exchangeRate: null,
};

const exchangeRateSlice = createSlice({
  name: "exchangeRateSlice",
  initialState,
  reducers: {
    setExchangeRate(state, action: PayloadAction<IExchangeRate>) {
      state.exchangeRate = action.payload;
    },
  },
});

export const { setExchangeRate } = exchangeRateSlice.actions;
export default exchangeRateSlice;
