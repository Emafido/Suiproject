import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { PACKAGE_ID, MODULE_NAME } from "../constants";

export const useClaimDrop = () => {
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const claimDrop = async ({ dropId, pin, onSuccess, onError }) => {
    try {
      const tx = new Transaction();
      const pinBytes = Array.from(new TextEncoder().encode(pin));

      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::claim_drop`,
        arguments: [
          tx.object(dropId),
          tx.pure.vector("u8", pinBytes),
        ],
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

  return { claimDrop };
};