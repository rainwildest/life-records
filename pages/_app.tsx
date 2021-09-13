// import App from "next/app";
// import NextNprogress from "nextjs-progressbar";
import type { AppProps /* , AppContext */ } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/client";
import Framework7 from "framework7/lite-bundle";
import Framework7React, { App as FrameworkApp } from "framework7-react";
import f7params from "lib/configure/f7params";
import fontSizeBase from "lib/fontSizeBase";
import React, { useEffect } from "react";
import "framework7/framework7-bundle.min.css";
import "styles/index.scss";

import Head from "next/head";

// Init plugin
Framework7.use(Framework7React);

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const apolloClient = useApollo(pageProps.initialApolloState);
  useEffect(() => {
    if (window) fontSizeBase(window, document);
  }, []);
  return (
    <>
      <Head>
        <meta
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;"
          name="viewport"
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <FrameworkApp {...f7params}>
          <Component {...pageProps} />
        </FrameworkApp>
      </ApolloProvider>
    </>
  );
}
