import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { PACKAGE_ID, MODULE_NAME } from "../constants";

export const useRecallDrop = () => {
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const recallDrop = async ({ dropId, onSuccess, onError }) => {
    try {
      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::recall_drop`,
        arguments: [tx.object(dropId)],
      });

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: (result) => onSuccess && onSuccess(result),
          onError: (err) => onError && onError(err),
        }
      );
    } catch (e) {
      if (onError) onError(e);
    }
  };

  return { recallDrop };
};