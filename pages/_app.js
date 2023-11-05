import { Fragment } from "react";
import Head from "next/head";
import "./global.css";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <ChakraProvider>
        <Head>
          <title>Realm</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </Fragment>
  );
}

export default MyApp;
