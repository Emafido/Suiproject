import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { blake2b } from "blakejs"; // <--- THE NEW SIMPLE IMPORT
import { PACKAGE_ID, MODULE_NAME } from "../constants";

export const useCreateDrop = () => {
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const createDrop = async ({ amount, recipient, pin, onSuccess, onError }) => {
    try {
      if (!amount || !recipient || !pin) throw new Error("Missing fields");

      // 1. Hash the PIN using blakejs (Simpler syntax)
      const pinBytes = new TextEncoder().encode(pin);
      // blake2b(input, key, outlen). We need 32 bytes output.
      const pinHash = blake2b(pinBytes, null, 32); 

      const tx = new Transaction();

      // 2. Handle Money
      const amountInMist = BigInt(parseFloat(amount) * 1_000_000_000);
      const [coin] = tx.splitCoins(tx.gas, [amountInMist]);

      // 3. Move Call
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::create_drop`,
        arguments: [
          coin,
          tx.pure.address(recipient),
          tx.pure.vector("u8", pinHash), // Pass the new hash
        ],
      });

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: (result) => {
            console.log("Success:", result);
            if (onSuccess) onSuccess(result.digest);
          },
          onError: (err) => {
            console.error("Error:", err);
            if (onError) onError(err);
          },
        }
      );
    } catch (e) {
      console.error(e);
      if (onError) onError(e);
    }
  };

  return { createDrop };
};