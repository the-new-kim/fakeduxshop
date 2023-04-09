import getStore from "@/redux/store";
import "@/styles/globals.css";
import { AppProps } from "next/app";

import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  const store = getStore(pageProps.initialState);

  console.log("PAGE PROPS:::::", pageProps);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
