import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { currencies, setCurrency } from "@/redux/slices/currencySlice";

import type { TCurrency } from "@/redux/slices/currencySlice";
import { useEffect, useState } from "react";

export default function CurrencySelector() {
  const [currentCurrency, setCurrentCurrency] = useState<TCurrency>();
  const dispatch = useAppDispatch();

  const currencyState = useAppSelector((state) => state.currency.currency);

  useEffect(() => {
    setCurrentCurrency(currencyState);
  }, [currencyState]);

  console.log(currencyState);

  return (
    <>
      <select
        className="text-black h-6"
        defaultValue={currentCurrency}
        onChange={(e) =>
          dispatch(setCurrency(e.currentTarget.value as TCurrency))
        }
      >
        {currencies.map((currency) => (
          <option
            value={currency}
            key={currency}
            selected={currencyState === currency}
          >
            {currency}
          </option>
        ))}
      </select>
      {currencyState}
    </>
  );
}
