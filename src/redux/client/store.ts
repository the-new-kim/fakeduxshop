import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
// import productSlice from "@/redux/server/slices/productSlice";
// import categorySlice from "@/redux/server/slices/categorySlice";
// import currencySlice from "./slices/currencySlice";
// import currencyMiddlware from "./middlewares/currencyMiddleware";

export interface ClientRootState {
  //   currency: ReturnType<typeof currencySlice.reducer>;
}

export type ClientAppDispatch = typeof store.dispatch;
export type ClientAppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ClientRootState,
  unknown,
  Action<string>
>;

const reducer = {
  //   currency: currencySlice.reducer,
};

const store = configureStore({
  reducer,
  //   middleware: (getDefaultMiddlware) => getDefaultMiddlware(),
});

export default store;
