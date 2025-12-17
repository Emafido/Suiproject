import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { PACKAGE_ID, MODULE_NAME } from "../constants";

export const useRecallDrop = () => {
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const recallDrop = async ({ dropId, onSuccess, onError }) => {
    try {
      const tx = new Transaction();

      // Call the Move function: recall_drop(drop_object)
      // Note: We just pass the Object ID, and Sui knows to find the object.
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::recall_drop`,
        arguments: [tx.object(dropId)],
      });

      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: (result) => {
            console.log("Recall Success:", result);
            if (onSuccess) onSuccess(result);
          },
          onError: (err) => {
            console.error("Recall Failed:", err);
            if (onError) onError(err);
          },
        }
      );
    } catch (e) {
      console.error(e);
      if (onError) onError(e);
    }
  };

  return { recallDrop };
};