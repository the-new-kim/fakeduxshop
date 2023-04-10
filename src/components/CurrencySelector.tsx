import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { currencies, setCurrency } from "@/redux/slices/currencySlice";

import type { TCurrency } from "@/redux/slices/currencySlice";
import { ChangeEvent, useEffect, useState } from "react";

export default function CurrencySelector() {
  // const [selectedCurrency, setSelectedCurrency] = useState<TCurrency>(
  //   () => (localStorage?.getItem("currency") as TCurrency) || "USD"
  // );
  const dispatch = useAppDispatch();

  const currencyState = useAppSelector((state) => state.currency.currency);

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    // setSelectedCurrency(value as TCurrency);
    dispatch(setCurrency(value as TCurrency));
  };

  return (
    <>
      <select
        className="text-black h-6"
        defaultValue={currencyState}
        onChange={onChange}
      >
        {currencies.map((currency) => (
          <option value={currency} key={currency}>
            {currency}
          </option>
        ))}
      </select>
      {currencyState}
    </>
  );
}
