import { useCurrentAccount, useSuiClientQuery, useSuiClient } from "@mysten/dapp-kit";
import { PACKAGE_ID, MODULE_NAME } from "../constants";
import { useQuery } from "@tanstack/react-query";

export const useOutgoingDrops = () => {
  const account = useCurrentAccount();
  const client = useSuiClient();

  // 1. Fetch "History" (All drops you ever created)
  const { data: events, refetch: refetchEvents } = useSuiClientQuery(
    "queryEvents",
    {
      query: {
        MoveModule: { package: PACKAGE_ID, module: MODULE_NAME },
      },
      order: "descending",
    },
    { enabled: !!account, refetchInterval: 5000 }
  );

  // 2. Filter History to find YOUR drops
  const myEventDrops = events?.data
    ?.filter((event) => event.parsedJson.sender === account?.address)
    .map((event) => ({
      id: event.parsedJson.id,
      recipient: event.parsedJson.recipient,
      amount: event.parsedJson.amount,
    })) || [];

  // 3. CHECK LIVENESS (Are they still valid? Or recalled?)
  const { data: liveDrops, isPending, refetch: refetchLive } = useQuery({
    queryKey: ["checkLiveDrops", myEventDrops.length],
    queryFn: async () => {
      if (myEventDrops.length === 0) return [];
      
      // Ask the blockchain: "Do these objects still exist?"
      const objectIds = myEventDrops.map(d => d.id);
      const objects = await client.multiGetObjects({ 
        ids: objectIds, 
        options: { showOwner: true } 
      });

      // Filter: Keep only objects that are NOT deleted (status === 'VersionFound')
      // and map them back to the event data
      const validIds = new Set(
        objects
          .filter(obj => obj.error == null && obj.data) // If error exists, object is deleted/missing
          .map(obj => obj.data.objectId)
      );

      return myEventDrops.filter(d => validIds.has(d.id));
    },
    enabled: myEventDrops.length > 0,
    refetchInterval: 5000
  });

  return {
    myDrops: liveDrops || [], // Return only the ones that exist
    isPending,
    refetch: () => {
      refetchEvents();
      refetchLive();
    },
  };
};