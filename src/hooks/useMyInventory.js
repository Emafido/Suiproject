import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";

export const useMyInventory = () => {
  const account = useCurrentAccount();

  // 1. Fetch SUI Balance
  const { data: balanceData, refetch: refetchBalance } = useSuiClientQuery(
    "getBalance",
    { owner: account?.address },
    { enabled: !!account }
  );

  // 2. Fetch Owned Objects (Items)
  const { data: itemsData, refetch: refetchItems } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address,
      options: { showContent: true },
      filter: { MatchNone: [{ StructType: "0x2::coin::Coin" }] } 
    },
    { enabled: !!account }
  );

  // Helper: Format MIST to SUI
  const balance = balanceData 
    ? (parseInt(balanceData.totalBalance) / 1_000_000_000).toFixed(2) 
    : "0.00";

  return {
    balance,
    items: itemsData?.data || [],
    address: account?.address,
    isConnected: !!account,
    
    // --- THIS IS THE FIX ---
    // We combine both refetch functions into one
    refetch: async () => {
      await refetchBalance();
      await refetchItems();
    }
  };
};