import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { initCurrency } from "@/redux/slices/currencySlice";
import type { ReactNode } from "react";
import store from "@/redux/store";
import {
  getExchangeRates,
  setExchangeRates,
} from "@/redux/slices/exchangeRatesSlice";
import { initCart } from "@/redux/slices/cartSlice";

interface IProviderProps {
  children: ReactNode;
}

function StateInitializer({ children }: IProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initCurrency());
    dispatch(getExchangeRates());
    dispatch(setExchangeRates());
    dispatch(initCart());
  }, [dispatch]);

  return <>{children}</>;
}

export default function Providers({ children }: IProviderProps) {
  return (
    <Provider store={store}>
      <StateInitializer>{children}</StateInitializer>
    </Provider>
  );
}
