"use client";

import { wagmiClient } from "@/configs";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { WagmiProvider } from "wagmi";
import { GeneralLayoutProvider } from "./general-layout.provider";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
export const ClientProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <WagmiProvider config={wagmiClient}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <GeneralLayoutProvider>{children}</GeneralLayoutProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
};
