import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import getStore, { RootState } from "@/redux/store";
import { useCallback, useEffect } from "react";
import { Provider } from "react-redux";
import { setCurrency } from "@/redux/slices/currencySlice";

import type { ReactNode } from "react";
import type { TCurrency } from "@/redux/slices/currencySlice";

interface IProviderProps {
  children: ReactNode;
}

function CurrencyProvider({ children }: IProviderProps) {
  const reduxCurrencyState = useAppSelector((state) => state.currency.currency);
  const dispatch = useAppDispatch();

  const initCurrency = useCallback(() => {
    if (!localStorage) return;
    const localStorageCurrency = localStorage.getItem(
      "currency"
    ) as TCurrency | null;

    if (localStorageCurrency) {
      dispatch(setCurrency(localStorageCurrency));
    } else {
      localStorage.setItem("currency", reduxCurrencyState);
    }
  }, [reduxCurrencyState, dispatch]);

  useEffect(() => {
    initCurrency();
  }, [reduxCurrencyState, dispatch, initCurrency]);

  return <>{children}</>;
}

interface IProvidersProps extends IProviderProps {
  initialState?: RootState;
}

export default function Providers({ children, initialState }: IProvidersProps) {
  const store = getStore(initialState);

  return (
    <Provider store={store} serverState={initialState}>
      <CurrencyProvider>{children}</CurrencyProvider>
    </Provider>
  );
}
