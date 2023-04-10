import Layout from "@/components/Layout";
import "@/styles/globals.css";
import getStore from "@/redux/store";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [count, setCount] = useState(0);
  const store = getStore(pageProps.initialState);

  useEffect(() => {
    localStorage.setItem("hi", count + "");
  }, [count]);

  useEffect(() => {
    const lsCount = localStorage.getItem("hi");
    if (!lsCount) return;
    setCount((prev) => +lsCount + 1);
  }, []);

  console.log("PAGE PROPS:::::", pageProps);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
