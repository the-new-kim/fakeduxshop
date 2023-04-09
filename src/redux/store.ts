import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import productSlice from "@/redux/slices/productSlice";
import categorySlice from "@/redux/slices/categorySlice";
import currencySlice from "./slices/currencySlice";

export interface RootState {
  products: ReturnType<typeof productSlice.reducer>;
  categories: ReturnType<typeof categorySlice.reducer>;
  currency: ReturnType<typeof currencySlice.reducer>;
  incomingPreloadState?: RootState;
}

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const selectSearch = (state: RootState) => state.products.search;
export const selectFilteredProduct = (state: RootState) =>
  state.products.filteredProducts;

const reducer = {
  products: productSlice.reducer,
  categories: categorySlice.reducer,
  currency: currencySlice.reducer,
};

let store = configureStore({
  reducer,
});

const getStore = (incomingPreloadState?: RootState) => {
  console.log("INCOMING PRELOAD STATE::::", incomingPreloadState);
  if (incomingPreloadState) {
    store = configureStore({
      reducer,
      preloadedState: incomingPreloadState,
    });
  }
  return store;
};

export default getStore;
