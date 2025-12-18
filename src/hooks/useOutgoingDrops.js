import { useCurrentAccount, useSuiClientQuery, useSuiClient } from "@mysten/dapp-kit";
import { PACKAGE_ID, MODULE_NAME } from "../constants";
import { useQuery } from "@tanstack/react-query";

export const useOutgoingDrops = () => {
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

  const myEventDrops = events?.data
    ?.filter((event) => event.parsedJson?.sender === account?.address)
    .map((event) => ({ id: event.parsedJson.id })) || [];

  const { data: liveDrops, isPending, refetch: refetchLive } = useQuery({
    queryKey: ["checkLiveDrops", myEventDrops.length, account?.address],
    queryFn: async () => {
      if (myEventDrops.length === 0) return [];
      
      const objects = await client.multiGetObjects({ 
        ids: myEventDrops.map(d => d.id), 
        options: { showContent: true } 
      });

      return objects
        .filter(obj => {
          if (obj.error || !obj.data) return false;
          const fields = obj.data.content.fields;
          // --- THE CRITICAL FIX ---
          // If balance is 0, the package is empty/claimed. Hide it!
          return parseInt(fields.balance) > 0;
        })
        .map(obj => {
          const fields = obj.data.content.fields;
          return {
            id: obj.data.objectId,
            recipient: fields.recipient,
            balance: fields.balance, 
            items: fields.items || [] 
          };
        });
    },
    enabled: myEventDrops.length > 0,
    refetchInterval: 3000
  });

  return { myDrops: liveDrops || [], isPending, refetch: () => { refetchEvents(); refetchLive(); } };
};