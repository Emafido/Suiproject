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

      // 1. Convert Amount to MIST (u64)
      const amountInMist = Math.floor(parseFloat(amount) * 1_000_000_000);
      
      // 2. Split the Coin from Gas
      // This creates a NEW coin object with the specific amount
      const [splitCoin] = tx.splitCoins(tx.gas, [tx.pure.u64(amountInMist)]);

      // 3. Prepare PIN
      const pinBytes = Array.from(new TextEncoder().encode(pin));

      // 4. Manual Vector Building for Items (The Nuclear Option)
      const swordType = `${PACKAGE_ID}::${MODULE_NAME}::Sword`;
      const itemVector = tx.moveCall({
        target: `0x1::vector::empty`,
        typeArguments: [swordType],
      });

      const itemsToPack = selectedItems || [];
      for (const itemId of itemsToPack) {
        tx.moveCall({
          target: `0x1::vector::push_back`,
          typeArguments: [swordType],
          arguments: [itemVector, tx.object(itemId)],
        });
      }

      // 5. THE MOVE CALL (Command 3)
      // Arguments must match: payment, amount, recipient, pin_bytes, items
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::create_drop`,
        arguments: [
          splitCoin,                            // arg 0: The actual coin object
          tx.pure.u64(amountInMist),            // arg 1: The u64 value
          tx.pure.address(recipient),           // arg 2: Recipient address
          tx.pure.vector("u8", pinBytes),       // arg 3: PIN hash source
          itemVector                            // arg 4: Our built vector
        ],
      });

      // 6. Cleanup: Explicitly set gas budget if auto-detect fails
      tx.setGasBudget(100000000); // 0.1 SUI budget

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: (result) => {
            if (onSuccess) onSuccess(result.digest);
          },
          onError: (err) => {
            console.error("Transaction Error Details:", err);
            if (onError) onError(err);
          },
        }
      );
    } catch (e) {
      console.error("Critical Hook Error:", e);
      if (onError) onError(e);
    }
  };

  return { createDrop };
};