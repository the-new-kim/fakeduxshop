import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const EXCHANGE_RATES = "exchageRates";

export interface IExchangeRates {
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

interface IExchangeRatesState {
  exchangeRates: IExchangeRates | null;
  pending: boolean;
  error: boolean;
}

const initialState: IExchangeRatesState = {
  exchangeRates: null,
  pending: false,
  error: false,
};

export const getExchangeRates = createAsyncThunk(
  "exchangeRateSlice/getExchangeRates",
  async (_, { rejectWithValue }) => {
    const { data, ok, error } = await (
      await fetch("/api/exchange-rates")
    ).json();

    if (!ok || error) {
      return rejectWithValue(null);
    }
    localStorage.setItem(EXCHANGE_RATES, JSON.stringify(data));
    return data;
  },
  {
    condition: () => {
      const localStorageExchangeRates = JSON.parse(
        localStorage.getItem(EXCHANGE_RATES) || "null"
      ) as IExchangeRates | null;

      if (localStorageExchangeRates) {
        const currentTimestamp = Math.floor(new Date().getTime() / 1000);

        const min = 60;
        const hour = min * 60;
        const day = hour * 24;

        const isExpired =
          currentTimestamp - localStorageExchangeRates.timestamp > day;

        return isExpired ? true : false;
      } else {
        return true;
      }
    },
  }
);

const exchangeRatesSlice = createSlice({
  name: "exchangeRateSlice",
  initialState,
  reducers: {
    setExchangeRates(state) {
      const localStorageExchangeRates = JSON.parse(
        localStorage.getItem(EXCHANGE_RATES) || "null"
      ) as IExchangeRates | null;
      state.exchangeRates = localStorageExchangeRates;
    },
  },
  extraReducers(builder) {
    builder.addCase(getExchangeRates.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getExchangeRates.fulfilled, (state, action) => {
      state.pending = false;
      state.error = false;
      state.exchangeRates = action.payload;
    });

    builder.addCase(getExchangeRates.rejected, (state) => {
      state.error = true;
      state.pending = false;
      state.exchangeRates = null;
    });
  },
});

export const { setExchangeRates } = exchangeRatesSlice.actions;
export default exchangeRatesSlice.reducer;

// {
//   ok: true,
//   data: {
//   success: true,
//   timestamp: 1681176963,
//   base: "USD",
//   date: "2023-04-11",
//   rates: {
//   GBP: 0.80718,
//   JPY: 133.620993,
//   EUR: 0.92011
//   }
//   }
//   }
