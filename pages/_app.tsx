import type { AppProps /* , AppContext */ } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/client";
import Framework7 from "framework7/lite-bundle";
import Framework7React, { App as FrameworkApp, View } from "framework7-react";
import f7params from "lib/configure/f7params";
import fontSizeBase from "lib/fontSizeBase";
import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import "framework7/framework7-bundle.min.css";
import "styles/index.scss";

Framework7.use(Framework7React);

const MyApp = function ({ Component, pageProps }: AppProps): JSX.Element {
  const apolloClient = useApollo(pageProps?.initialApolloState);
  // current Next.js route
  const router = useRouter();
  /*
    Here we need to know (mostly on server-side) on what URL user opens our app
  */
  const url = `${process.env.NEXT_PUBLIC_HOST}${router.asPath}`;

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
        <FrameworkApp url={url} {...f7params}>
          <Component initialPage {...pageProps} />
          {/* <View
            main
            browserHistory
            browserHistorySeparator=""
            browserHistoryInitialMatch={true}
            browserHistoryStoreHistory={false}
            url="/"
          >
            <Component initialPage {...pageProps} />
          </View> */}
        </FrameworkApp>
      </ApolloProvider>
    </>
  );
};
export default MyApp;

MyApp.getInitialProps = async ({ ctx }) => {
  const asPath = ctx.asPath;
  const routers = ["/statistics", "/mine"];

  if (routers.includes(asPath)) {
    if (!ctx.res) return Router.push("/");

    // server
    ctx.res.writeHead(302, {
      Location: "/"
    });

    return ctx.res.end();
  }

  if (ctx && ctx.req && ctx.req.headers) {
    return {
      userAgent: ctx.req.headers["user-agent"]
    };
  }

  return {};
};
