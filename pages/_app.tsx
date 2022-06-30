import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";

import Header from "@components/sections/Header";
import WagmiProvider from "@lib/hooks/wagmi-provider";

const ProgressBar = dynamic(() => import("@components/ui/ProgressBar"), {
  ssr: false,
});
import customTheme from "@styles/theme";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [showBuyForm, setShowBuyForm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <ChakraProvider theme={customTheme}>
        <WagmiProvider>
          <Header value={{ showDropdown, setShowDropdown }} />
          <Component
            {...pageProps}
            value={{
              showDropdown,
              setShowDropdown,
              showBuyForm,
              setShowBuyForm,
            }}
          />
        </WagmiProvider>
      </ChakraProvider>
      <ProgressBar />
    </>
  );
}

export default MyApp;
