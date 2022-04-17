import type { AppProps /* , AppContext */ } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "apollo/client";
import fontSizeBase from "lib/fontSizeBase";
import React, { useEffect } from "react";
import Head from "next/head";
// import { getTokenCookie } from "lib/apis/auth-cookies";
import store from "lib/store";
import Framework7 from "components/Framework7";
import "framework7/framework7-bundle.min.css";
import "styles/index.scss";
import "framework7-icons";

const MyApp = function ({ Component, pageProps, token }: AppProps & { token: string }): JSX.Element {
  // store.dispatch("setToken", token);
  const apolloClient = useApollo(pageProps?.initialApolloState);

  useEffect(() => {
    if (window) fontSizeBase(window, document);
  }, []);

  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
      </Head>
      <ApolloProvider client={apolloClient}>
        {/* <FrameworkApp {...f7params} store={store}>
          <Component {...pageProps} />
        </FrameworkApp> */}
        <Framework7>
          <Component {...pageProps} />
        </Framework7>
      </ApolloProvider>
    </>
  );
};
export default MyApp;

MyApp.getInitialProps = async ({ ctx }) => {
  if (ctx && ctx.req && ctx.req.headers) {
    const { getTokenCookie } = require("lib/apis/auth-cookies");
    return {
      pageProps: {
        token: getTokenCookie(ctx.req) || null
      }
    };
  }
  return {};
};
