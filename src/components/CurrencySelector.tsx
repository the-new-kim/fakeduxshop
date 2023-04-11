import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { currencies, setCurrency } from "@/redux/slices/currencySlice";
import getSymbolFromCurrency from "currency-symbol-map";

import type { TCurrency } from "@/redux/slices/currencySlice";
import type { ChangeEvent } from "react";

export default function CurrencySelector() {
  const currencyState = useAppSelector((state) => state.currencySlice.currency);
  const dispatch = useAppDispatch();

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    dispatch(setCurrency(value as TCurrency));
  };

  return (
    <>
      <select
        className="bg-transparent border-none"
        value={currencyState}
        onChange={onChange}
      >
        {currencies.map((currency) => (
          <option value={currency} key={currency}>
            {getSymbolFromCurrency(currency)} {currency}
          </option>
        ))}
      </select>
    </>
  );
}
