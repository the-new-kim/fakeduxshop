import { Middleware } from "redux";
import { RootState } from "../store";
import { TCurrency, setCurrency } from "../slices/currencySlice";

const currencyMiddlware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    console.log("STORE::::", store);
    console.log("ACTION::::", action);

    console.log("ACTION TYPE", action.type);

    const storedCurrency = localStorage.getItem("currency") as
      | TCurrency
      | undefined;

    //👆 ⚠️ Error: Localstorage is not defined on server side (of course...)
    // better try it in client component? not using redux's middlware? 🤔

    if (action.type === setCurrency.type) {
      //   if (
      //     !storedCurrency ||
      //     (storedCurrency && storedCurrency !== action.payload)
      //   ) {
      //     console.log("Update Local storage! from redux state!");
      //     localStorage.setItem("currency", action.payload);
      //   }
      console.log("Update Local storage! from redux state!");
      localStorage.setItem("currency", action.payload);
    }

    if (action.type === "currency/init") {
      console.log("INIT!!!");
    }

    return next(action);
  };

export default currencyMiddlware;
