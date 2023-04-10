import { useAppDispatch, useAppSelector } from "@/redux/server/hooks";
import { currencies, setCurrency } from "@/redux/server/slices/currencySlice";

import type { TCurrency } from "@/redux/server/slices/currencySlice";
import { ChangeEvent, useEffect, useState } from "react";

export default function CurrencySelector() {
  const reduxCurrencyState = useAppSelector((state) => state.currency.currency);

  const [selectedCurrency, setSelectedCurrency] =
    useState<TCurrency>(reduxCurrencyState);

  const dispatch = useAppDispatch();

  // console.log("SELECTED CURRENCY:::::", selectedCurrency);

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedCurrency(value as TCurrency);
    dispatch(setCurrency(value as TCurrency));
    localStorage.setItem("currency", value);
    console.log("ON CHANGE!");
  };

  useEffect(() => {
    setSelectedCurrency(reduxCurrencyState);
    console.log("reduxCurrencyState+++++++", reduxCurrencyState);
  }, [reduxCurrencyState, setSelectedCurrency, selectedCurrency]);

  return (
    <>
      <select
        className="text-black h-6"
        defaultValue={selectedCurrency}
        onChange={onChange}
      >
        {currencies.map((currency) => (
          <option value={currency} key={currency}>
            {currency}
          </option>
        ))}
      </select>
      {selectedCurrency}
      {reduxCurrencyState}
    </>
  );
}
