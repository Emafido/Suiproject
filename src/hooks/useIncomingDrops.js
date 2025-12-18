import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { PACKAGE_ID, MODULE_NAME } from "../constants";

export const useIncomingDrops = () => {
  const account = useCurrentAccount();

  // 1. Fetch ALL Drop Events
  const { data, isPending, refetch } = useSuiClientQuery(
    "queryEvents",
    {
      query: { MoveModule: { package: PACKAGE_ID, module: MODULE_NAME } },
      order: "descending",
    },
    { enabled: !!account }
  );

  // 2. Filter: Keep only drops where recipient == ME
  const incomingDrops = data?.data
    .map((event) => event.parsedJson)
    .filter((json) => json.recipient === account?.address) || [];

  return { incomingDrops, isPending, refetch };
};