import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { PACKAGE_ID, MODULE_NAME } from "../constants";

export const useMyInventory = () => {
  const account = useCurrentAccount();
  
  // 1. Get SUI Balance
  const { data: balanceData } = useSuiClientQuery("getBalance", {
    owner: account?.address,
  }, { enabled: !!account });

  // 2. Get Swords (Owned Objects)
  const { data: items, refetch } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address,
      filter: { StructType: `${PACKAGE_ID}::${MODULE_NAME}::Sword` },
      options: { showContent: true },
    },
    { enabled: !!account, refetchInterval: 5000 }
  );

  return {
    balance: (parseInt(balanceData?.totalBalance || 0) / 1_000_000_000).toFixed(2),
    items: items?.data || [],
    address: account?.address,
    isConnected: !!account,
    refetch
  };
};