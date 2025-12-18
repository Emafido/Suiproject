import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentAccount, useSuiClientQuery, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { PACKAGE_ID, MODULE_NAME } from "../constants";

const Receiver = () => {
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  
  const [pinInputs, setPinInputs] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  // 1. Fetch Drops Sent to Me (The "Gifts")
  const { data: drops, refetch, isPending } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address,
      filter: { StructType: `${PACKAGE_ID}::${MODULE_NAME}::Drop` },
      options: { showContent: true },
    },
    { 
      enabled: !!account,
      refetchInterval: 5000 
    }
  );

  const handlePinChange = (id, value) => {
    setPinInputs(prev => ({ ...prev, [id]: value }));
  };

  // 2. Claim Function (Now matches the Care Package logic)
  const handleClaim = (dropId) => {
    const pin = pinInputs[dropId];
    if (!pin) return alert("Please enter the PIN!");

    setLoadingId(dropId);

    try {
      const tx = new Transaction();
      
      // Use Array.from for consistent serialization across SDK versions
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
          onSuccess: () => {
            alert("🎉 Care Package Unlocked! Check your inventory.");
            setLoadingId(null);
            refetch(); 
          },
          onError: (err) => {
            console.error(err);
            setLoadingId(null);
            alert("❌ Incorrect PIN or the sender recalled this package.");
          },
        }
      );
    } catch (err) {
      console.error(err);
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
            <Link to="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-green-600 font-bold transition">
                <i className="fa-solid fa-arrow-left"></i>
                Back
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">My Inbox</h1>
        </div>

        <div className="space-y-4">
            {isPending && (
                <div className="p-12 text-center text-gray-400">
                    <i className="fa-solid fa-circle-notch fa-spin text-2xl mb-2"></i>
                    <p>Scanning blockchain for gifts...</p>
                </div>
            )}

            {!isPending && drops?.data?.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                    <p className="text-3xl mb-4">📭</p>
                    <h3 className="text-lg font-bold text-gray-800">No care packages yet</h3>
                    <p className="text-gray-500">Gifts sent to your address will appear here.</p>
                </div>
            )}

            {drops?.data?.map((drop) => {
                const fields = drop.data.content?.fields;
                const itemCount = fields?.items?.length || 0;

                return (
                    <div key={drop.data.objectId} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-green-400 transition">
                        
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex flex-col items-center justify-center shadow-inner">
                                <i className="fa-solid fa-gift text-xl"></i>
                                {itemCount > 0 && <span className="text-[10px] font-bold">+{itemCount}</span>}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">Secure Care Package</h3>
                                {fields?.balance && (
                                    <p className="text-lg font-black text-green-600">
                                        {(parseInt(fields.balance) / 1_000_000_000).toFixed(2)} SUI
                                    </p>
                                )}
                                {itemCount > 0 && (
                                    <p className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full w-fit font-bold mt-1">
                                        Contains {itemCount} NFT{itemCount > 1 ? 's' : ''}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-2 w-full md:w-auto">
                            <input 
                                type="text" 
                                placeholder="4-digit PIN"
                                maxLength="4"
                                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 w-full md:w-32 text-center font-bold tracking-[0.2em]"
                                value={pinInputs[drop.data.objectId] || ''}
                                onChange={(e) => handlePinChange(drop.data.objectId, e.target.value)}
                            />
                            <button 
                                onClick={() => handleClaim(drop.data.objectId)}
                                disabled={loadingId === drop.data.objectId}
                                className={`px-6 py-3 rounded-xl font-bold text-white shadow-lg transition transform active:scale-95 ${
                                    loadingId === drop.data.objectId 
                                    ? 'bg-gray-400 cursor-wait' 
                                    : 'bg-green-600 hover:bg-green-700'
                                }`}
                            >
                                {loadingId === drop.data.objectId ? 'Unlocking...' : 'Unlock'}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default Receiver;