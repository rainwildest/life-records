import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/client";
// import App from "next/app";
import type { AppProps /* , AppContext */ } from "next/app";
import NextNprogress from "nextjs-progressbar";
import "styles/index.scss";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <NextNprogress />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }
