import { Fragment } from "react";
import Head from "next/head";
import "./global.css";
import { ChakraProvider } from "@chakra-ui/react";
import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { polygonMumbai } from "viem/chains";
// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [
    publicProvider(),
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY }),
  ]
);

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={config}>
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
    </WagmiConfig>
  );
}

export default MyApp;
