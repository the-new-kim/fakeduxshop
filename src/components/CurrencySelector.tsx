import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { currencies, setCurrency } from "@/redux/slices/currencySlice";

import type { TCurrency } from "@/redux/slices/currencySlice";
import type { ChangeEvent } from "react";

export default function CurrencySelector() {
  const reduxCurrencyState = useAppSelector((state) => state.currency.currency);
  const dispatch = useAppDispatch();

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    dispatch(setCurrency(value as TCurrency));
    localStorage.setItem("currency", value);
    console.log("ON CHANGE!");
  };

  return (
    <>
      <select
        className="text-black h-6"
        value={reduxCurrencyState}
        onChange={onChange}
      >
        {currencies.map((currency) => (
          <option value={currency} key={currency}>
            {currency}
          </option>
        ))}
      </select>
    </>
  );
}
