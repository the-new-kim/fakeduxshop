import { useAppDispatch, useAppSelector } from "@/redux/server/hooks";
import getStore, { RootState } from "@/redux/server/store";
import { SetStateAction, useEffect, useState } from "react";
import { Provider } from "react-redux";

import type { Dispatch, ReactNode } from "react";
import { TCurrency, setCurrency } from "@/redux/server/slices/currencySlice";

interface IProviderProps {
  children: ReactNode;
}

interface ICurrencyProvider extends IProviderProps {
  setInitialState: Dispatch<SetStateAction<RootState>>;
}

function CurrencyProvider({ children, setInitialState }: ICurrencyProvider) {
  const reduxCurrencyState = useAppSelector((state) => state.currency.currency);
  const dispatch = useAppDispatch();

  const [localStorageCurrencyState, setLocalStorageCurrencyState] =
    useState<TCurrency>("USD");

  //1️⃣ Init currency value from localstorage on client side
  //   useEffect(() => {
  //     if (!localStorage) return; // Just to check if is client side..
  //     const localStorageCurrency = localStorage.getItem(
  //       "currency"
  //     ) as TCurrency | null;
  //     if (!localStorageCurrency) {
  //       //1️⃣-1️⃣ Set localStorageCurrency from reduxCurrencyState
  //       localStorage.setItem("currency", reduxCurrencyState);
  //     } else {
  //       //1️⃣-2️⃣ Set reduxCurrencyState from localStorageCurrency

  //       setInitialState((prev) => {
  //         console.log("INITIALIZING...");
  //         return {
  //           ...prev,
  //           currency: { currency: localStorageCurrency },
  //         };
  //       });
  //     }
  //   }, [setInitialState]);

  //   useEffect(() => {
  //     console.log("something changed!");
  //     if (!localStorage) return;

  //     const localStorageCurrency = localStorage.getItem("currency") as TCurrency;

  //     console.log("localStorageCurrency::::", localStorageCurrency);
  //     if (localStorageCurrency) {
  //       setLocalStorageCurrencyState(localStorageCurrency);
  //       dispatch(setCurrency(localStorageCurrency));
  //     }
  //   }, [
  //     localStorageCurrencyState,
  //     setLocalStorageCurrencyState,
  //     reduxCurrencyState,
  //     dispatch,
  //   ]);

  useEffect(() => {
    console.log("reduxCurrencyState:::::", reduxCurrencyState);
    console.log("localstorage:::::", localStorage.getItem("currency"));
    if (!localStorage) return;

    const localStorageCurrency = localStorage.getItem(
      "currency"
    ) as TCurrency | null;

    if (localStorageCurrency) {
      console.log("localStorageCurrency exists;;;;", localStorageCurrency);
      setLocalStorageCurrencyState(reduxCurrencyState);

      dispatch(setCurrency(localStorageCurrency));
    } else {
      localStorage.setItem("currency", reduxCurrencyState);
      setLocalStorageCurrencyState(reduxCurrencyState);
    }
  }, [reduxCurrencyState]);

  useEffect(() => {
    console.log("LOCAL::::", localStorageCurrencyState);
    dispatch(setCurrency(localStorageCurrencyState));
  }, [localStorageCurrencyState]);

  return <>{children}</>;
}

interface IProvidersProps extends IProviderProps {
  pageProps: any;
}

export default function Providers({ children, pageProps }: IProvidersProps) {
  const [initialState, setInitialState] = useState<RootState>(
    pageProps.initialState as RootState
  );

  const store = getStore(initialState);

  return (
    <Provider store={store}>
      <CurrencyProvider setInitialState={setInitialState}>
        {children}
      </CurrencyProvider>
    </Provider>
  );
}
