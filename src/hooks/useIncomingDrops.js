import {
  useCurrentAccount,
  useSuiClientQuery,
  useSuiClient,
} from "@mysten/dapp-kit";
import { PACKAGE_ID, MODULE_NAME } from "../constants";
import { useQuery } from "@tanstack/react-query";

export const useIncomingDrops = () => {
  const account = useCurrentAccount();
  const client = useSuiClient();

  const { data: events, refetch: refetchEvents } = useSuiClientQuery(
    "queryEvents",
    {
      query: { MoveModule: { package: PACKAGE_ID, module: MODULE_NAME } },
      order: "descending",
    },
    { enabled: !!account, refetchInterval: 3000 }
  );

  const myIncomingEvents =
    events?.data
      ?.filter((event) => {
        const recipient = event.parsedJson?.recipient?.toLowerCase();
        const myAddress = account?.address?.toLowerCase();
        return recipient === myAddress;
      })
      .map((event) => ({ id: event.parsedJson.id })) || [];

  const {
    data: incomingDrops,
    isPending,
    refetch: refetchLive,
  } = useQuery({
    queryKey: ["checkIncomingDrops", myIncomingEvents.length, account?.address],
    queryFn: async () => {
      if (myIncomingEvents.length === 0) return [];

      const objects = await client.multiGetObjects({
        ids: myIncomingEvents.map((d) => d.id),
        options: { showContent: true },
      });

      return objects
        .filter((obj) => {
          if (obj.error || !obj.data) return false;
          const fields = obj.data.content.fields;
          return parseInt(fields.balance) > 0;
        })
        .map((obj) => {
          const fields = obj.data.content.fields;
          return {
            id: obj.data.objectId,
            sender: fields.sender,
            balance: fields.balance,
            items: fields.items || [],
          };
        });
    },
    enabled: myIncomingEvents.length > 0,
    refetchInterval: 3000,
  });

  return {
    incomingDrops: incomingDrops || [],
    isPending,
    refetch: () => {
      refetchEvents();
      refetchLive();
    },
  };
};
