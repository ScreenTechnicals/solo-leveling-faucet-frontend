"use client";

import { wagmiClient } from "@/configs";
import { useRequestTokens } from "@/hooks";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Tilty from "react-tilty";
import { Address } from "viem";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";

export default function Home() {
  const {
    address: walletAddress,
    isConnected,
    chainId,
  } = useAccount({
    config: wagmiClient,
  });
  const [address, setAddress] = useState<Address>();

  const { requestTokens, confirming, isConfirmed, isSending } =
    useRequestTokens();

  const connected = isConnected && chainId === sepolia.id;

  useEffect(() => {
    if (isConnected) {
      setAddress(walletAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress, isConnected]);

  useEffect(() => {
    if (isConfirmed) {
      toast.dismiss("loading1");
      toast.success("50 Tokens Claimed Successfully");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmed]);

  return (
    <div className="min-h-[50svh] flex place-content-center place-items-center">
      <Tilty
        style={{ transformStyle: "preserve-3d" }}
        className="m-5 rounded-xl bg-gradient-to-tr from-[#ff00a6] to-[#520dff] shadow-xl shadow-[#d000ff64]"
      >
        <div
          style={{ transform: "translateZ(60px)" }}
          className="w-full md:w-[600px] mx-auto p-5 md:p-10 shadow rounded-md bg-[#212121]"
        >
          {connected && (
            <>
              <h2 className="text-center text-3xl font-bold pb-5">
                Claim 50{" "}
                <span className=" text-transparent bg-clip-text bg-gradient-to-r from-[#39ffc0] to-[#ddff00]">
                  Solo Leveling Token (SLT)
                </span>{" "}
                per minute
              </h2>
              <input
                type="text"
                className="w-full p-2 bg-white/20 uppercase rounded-md outline-none text-base"
                placeholder="0xbsw34...6r7t"
                onChange={(e) => {
                  setAddress(e.target.value as Address);
                }}
                value={address}
              />
              <button
                onClick={() => {
                  requestTokens(address!);
                }}
                type="button"
                disabled={confirming || isSending}
                className="transition-colors w-full text-black bg-[#39ffc0] p-3 my-5 border-none rounded-md hover:bg-[#ddff00] font-semibold"
              >
                {confirming || isSending ? "Processing ..." : "Claim 50 SLT"}
              </button>
              <hr />
              <p className="text-sm text-center mt-5">
                import SLT tokens to your metamask walltet
              </p>
              <p className="text-sm text-center">
                0x260E1279d3f7Ca3364875a29a33b73AE79Aac4f3
              </p>
            </>
          )}
          {!connected && (
            <p className="text-xl font-bold text-center">
              Please Connect To Wallet
            </p>
          )}
        </div>
      </Tilty>
    </div>
  );
}
