// src/hooks/useMyInventory.js
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { PACKAGE_ID, DEMO_MODULE } from "../constants";

export const useMyInventory = () => {
  const account = useCurrentAccount();

  // 1. Fetch SUI Balance
  const { data: balanceData } = useSuiClientQuery(
    "getBalance",
    { owner: account?.address },
    { enabled: !!account }
  );

  // 2. Fetch "GameSword" Objects
  const { data: objectsData } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address,
      filter: { StructType: `${PACKAGE_ID}::${DEMO_MODULE}::GameSword` },
      options: { showContent: true },
    },
    { enabled: !!account }
  );

  return {
    // Convert MIST to SUI (1 SUI = 1,000,000,000 MIST)
    balance: balanceData ? (Number(balanceData.totalBalance) / 1_000_000_000).toFixed(2) : "0",
    items: objectsData?.data || [],
    isConnected: !!account,
    address: account?.address
  };
};