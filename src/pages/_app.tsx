import Layout from "@/components/Layout";
import "@/styles/globals.css";

import { AppProps } from "next/app";

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
