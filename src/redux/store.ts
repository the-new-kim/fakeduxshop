// import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
// import productSlice from "@/redux/slices/productSlice";

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;

// export const selectSearch = (state: RootState) => state.products.search;
// export const selectFilteredProduct = (state: RootState) =>
//   state.products.filteredProducts;

// export let store = null;

// export default function getStore(incomingPreloadState?: RootState) {
//   store = configureStore({
//     reducer: {
//       products: productSlice.reducer,
//     },
//     preloadedState: incomingPreloadState,
//   });

//   return store;
// }
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import productSlice from "@/redux/slices/productSlice";

export interface RootState {
  products: ReturnType<typeof productSlice.reducer>;
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

let store = configureStore({
  reducer: {
    products: productSlice.reducer,
  },
});

const getStore = (incomingPreloadState?: RootState) => {
  if (incomingPreloadState) {
    store = configureStore({
      reducer: {
        products: productSlice.reducer,
      },
      preloadedState: incomingPreloadState,
    });
  }
  return store;
};

export default getStore;
