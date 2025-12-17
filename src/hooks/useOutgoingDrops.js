// src/hooks/useOutgoingDrops.js
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { PACKAGE_ID, MODULE_NAME } from "../constants";

export const useOutgoingDrops = () => {
  const account = useCurrentAccount();

  // Query ALL "DropCreated" events from the blockchain
  const { data, isPending } = useSuiClientQuery(
    "queryEvents",
    {
      query: { MoveModule: { package: PACKAGE_ID, module: MODULE_NAME } },
      order: "descending", // Newest first
    },
    { enabled: !!account }
  );

  // Filter in Javascript: Only keep drops where Sender == Me
  const myDrops = data?.data
    .map((event) => event.parsedJson)
    .filter((json) => json.sender === account?.address) || [];

  return { myDrops, isPending };
};