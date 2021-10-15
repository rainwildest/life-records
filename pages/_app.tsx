import type { AppProps /* , AppContext */ } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "apollo/client";
import Framework7 from "framework7/lite-bundle";
import Framework7React, { App as FrameworkApp } from "framework7-react";
import f7params from "lib/configure/f7params";
import fontSizeBase from "lib/fontSizeBase";
import React, { useEffect } from "react";
import Head from "next/head";
import { getTokenCookie } from "lib/api/auth-cookies";
import { getLoginSession } from "lib/api/auth";
import store from "lib/store";
import "framework7/framework7-bundle.min.css";
import "styles/index.scss";

Framework7.use(Framework7React);

const MyApp = function ({
  Component,
  pageProps,
  token
}: AppProps & { token: string; user: { [key: string]: any } }): JSX.Element {
  store.dispatch("setToken", token);
  const apolloClient = useApollo(pageProps?.initialApolloState);

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
        <FrameworkApp {...f7params} store={store}>
          <Component {...pageProps} />
        </FrameworkApp>
      </ApolloProvider>
    </>
  );
};
export default MyApp;

MyApp.getInitialProps = async ({ ctx }) => {
  if (ctx && ctx.req && ctx.req.headers) {
    return {
      token: (await getTokenCookie(ctx.req)) || null,
      user: (await getLoginSession(ctx.req)) || null
    };
  }
  return {};
};
