import { useSignAndExecuteTransaction, useCurrentAccount } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { PACKAGE_ID, MODULE_NAME } from "../constants";

export const useCreateDrop = () => {
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const account = useCurrentAccount();

  const createDrop = async ({ amount, recipient, pin, selectedItems, onSuccess, onError }) => {
    try {
      if (!amount || !recipient || !pin) throw new Error("Missing fields");

      const tx = new Transaction();

      // 1. Handle Money
      const amountInMist = Math.floor(parseFloat(amount) * 1_000_000_000);
      const [splitCoin] = tx.splitCoins(tx.gas, [tx.pure.u64(amountInMist)]);

      // 2. Prepare PIN
      const pinBytes = Array.from(new TextEncoder().encode(pin));

      // 3. Manual Vector Building (Bypasses SDK bugs)
      const swordType = `${PACKAGE_ID}::${MODULE_NAME}::Sword`;
      const itemVector = tx.moveCall({
        target: `0x1::vector::empty`,
        typeArguments: [swordType],
      });

      (selectedItems || []).forEach(itemId => {
        tx.moveCall({
          target: `0x1::vector::push_back`,
          typeArguments: [swordType],
          arguments: [itemVector, tx.object(itemId)],
        });
      });

      // 4. Create Drop
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::create_drop`,
        arguments: [
          splitCoin,
          tx.pure.u64(amountInMist),
          tx.pure.address(recipient),
          tx.pure.vector("u8", pinBytes),
          itemVector
        ],
      });

      // 5. Cleanup
      tx.transferObjects([splitCoin], account.address);
      tx.setGasBudget(100000000); 

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: (result) => onSuccess && onSuccess(result.digest),
          onError: (err) => onError && onError(err)
        }
      );
    } catch (e) {
      console.error("Create Hook Error:", e);
      if (onError) onError(e);
    }
  };

  return { createDrop };
};