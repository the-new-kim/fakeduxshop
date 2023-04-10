import Layout from "@/components/Layout";
import "@/styles/globals.css";
import getStore from "@/redux/store";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import Providers from "@/components/Providers";

export default function App({ Component, pageProps }: AppProps) {
  console.log("PAGE PROPS:::::", pageProps);

  return (
    <Providers pageProps={pageProps}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}
