import React, { useState } from 'react';
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { PACKAGE_ID, MODULE_NAME } from './constants';

export default function SenderPage() {
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  
  // Form State
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  // --- 1. Helper to Convert PIN to Bytes ---
  const getPinBytes = (pinString) => {
    return new TextEncoder().encode(pinString); 
  };

  // --- 2. The Create Drop Function ---
  const createDrop = async () => {
    if (!amount || !recipient || !pin) return;
    setLoading(true);

    try {
      const tx = new Transaction();
      
      // Convert SUI to MIST (1 SUI = 1,000,000,000 MIST)
      const amountInMist = BigInt(parseFloat(amount) * 1_000_000_000);

      // 1. Split the coin from your gas (wallet)
      const [coin] = tx.splitCoins(tx.gas, [amountInMist]);

      // 2. Call the Smart Contract
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::create_drop`,
        arguments: [
          coin, // The money object
          tx.pure.u64(amountInMist), // The amount number
          tx.pure.address(recipient), // The receiver
          tx.pure.vector('u8', getPinBytes(pin)) // The PIN (hidden as bytes)
        ],
      });

      // 3. Send to Blockchain
      signAndExecuteTransaction(
        { transaction: tx },
        {
          onSuccess: (result) => {
            alert(`✅ Success! Drop Sent. Digest: ${result.digest}`);
            setLoading(false);
            // Reset form
            setAmount('');
            setRecipient('');
            setPin('');
          },
          onError: (err) => {
            console.error(err);
            alert('❌ Failed: ' + err.message);
            setLoading(false);
          }
        }
      );
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Create New Drop 💧
        </h2>

        <div className="space-y-6">
          
          {/* Recipient Input */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Recipient Address</label>
            <input 
              type="text" 
              placeholder="0x..."
              className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>

          {/* Amount and PIN Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Amount (SUI)</label>
              <input 
                type="number" 
                placeholder="1.0"
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Secret PIN</label>
              <input 
                type="text" 
                placeholder="1234"
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            onClick={createDrop}
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              loading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {loading ? 'Processing on Blockchain...' : '🔒 Encrypt & Send Drop'}
          </button>

        </div>
      </div>
    </div>
  );
}