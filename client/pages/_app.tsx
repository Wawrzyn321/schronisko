import React from "react";
import Head from "next/head";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import "./../global-styles/font.css";
import "./../global-styles/main.css";

export default function App({
  Component,
  pageProps,
}: {
  Component: React.FunctionComponent;
  pageProps: any;
}) {
  return (
    <main>
      <Head>
        <title>
          Schronisko dla zwierząt Miejskiego Zakładu Usług Komunalnych w
          Sosnowcu
        </title>
        <meta
          name="description"
          content="Schronisko dla zwierząt Miejskiego Zakładu Usług Komunalnych w Sosnowcu"
        ></meta>
        <link rel="icon" type="image/png" href="/site/favicon.ico"></link>
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
}
