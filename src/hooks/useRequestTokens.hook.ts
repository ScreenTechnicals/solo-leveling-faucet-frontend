import { soloLevelingFaucetAbi } from "@/abis";
import { wagmiClient } from "@/configs";
import { useState } from "react";
import toast from "react-hot-toast";
import { Address, getAddress } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export const useRequestTokens = () => {
  const { writeContract, data: hash } = useWriteContract({
    config: wagmiClient,
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: hash!,
    });

  const [isSending, setIsSending] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const requestTokens = (address: Address) => {
    setIsSending(true);
    writeContract(
      {
        abi: soloLevelingFaucetAbi,
        address: getAddress(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!),
        functionName: "requestTokens",
        args: [address],
      },
      {
        onSuccess: () => {
          toast.loading("Processing Please Wait!", {
            id: "loading1",
          });
          setIsSending(false);
          if (setConfirming) {
            setConfirming(true);
          }
        },
        onError: () => {
          setIsSending(false);
          toast.error("Transaction Failed! Try Again.");
        },
      }
    );
  };

  return {
    requestTokens,
    isSending,
    confirming,
    isConfirming,
    isConfirmed,
  };
};
