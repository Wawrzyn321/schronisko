import React from "react";
import Head from "next/head";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./../global-styles/font.css";
import "./../global-styles/main.css";

export default function App({
  Component,
  pageProps,
}: {
  Component: React.FunctionComponent;
  pageProps: Record<string, unknown>;
}) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_1000,
          },
        },
      }),
  );

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
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
      <Footer />
    </main>
  );
}
