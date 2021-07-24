import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/client";
// import App from "next/app";
import type { AppProps /* , AppContext */ } from "next/app";
// import NextNprogress from "nextjs-progressbar";
import "styles/index.scss";
import Framework7 from "framework7/lite-bundle";
import Framework7React, { App as FrameworkApp } from "framework7-react";
import "framework7/framework7-bundle.min.css";
import f7params from "lib/configure/f7params";
import React from "react";

import dynamic from "next/dynamic";

const WiredElements = dynamic((): any => import("./WiredElements"));
// Init plugin
Framework7.use(Framework7React);

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <FrameworkApp {...f7params}>
        {/* <NextNprogress /> */}
        <WiredElements></WiredElements>
        <Component {...pageProps} />
      </FrameworkApp>
    </ApolloProvider>
  );
}
