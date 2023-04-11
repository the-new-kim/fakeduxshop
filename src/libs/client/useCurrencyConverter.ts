import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { getCurrencyFormat } from "../utils";

export default function useCurrencyConvert(price: number) {
  const [state, setState] = useState(getCurrencyFormat("USD", price));
  const currencyState = useAppSelector((state) => state.currencySlice.currency);
  const exchangeRatesState = useAppSelector((state) => state.exhcangeRateSlice);

  useEffect(() => {
    if (!exchangeRatesState.exchangeRates)
      return setState(getCurrencyFormat("USD", price));

    switch (currencyState) {
      case "EUR":
        setState(
          getCurrencyFormat(
            "EUR",
            price * exchangeRatesState.exchangeRates.rates.EUR
          )
        );
        break;
      case "JPY":
        setState(
          getCurrencyFormat(
            "JPY",
            price * exchangeRatesState.exchangeRates.rates.JPY
          )
        );
        break;
      case "GBP":
        setState(
          getCurrencyFormat(
            "GBP",
            price * exchangeRatesState.exchangeRates.rates.GBP
          )
        );
        break;
      default:
        setState(getCurrencyFormat("USD", price));
        break;
    }
  }, [currencyState, exchangeRatesState, setState, price]);

  return state;
}
