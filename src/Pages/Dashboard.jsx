import React, { useState } from "react";
import { ConnectButton } from "@mysten/dapp-kit";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { Link } from "react-router-dom"; 
import { PACKAGE_ID, MODULE_NAME } from "../constants";

// Import your Custom Hooks
import { useMyInventory } from "../hooks/useMyInventory";
import { useOutgoingDrops } from "../hooks/useOutgoingDrops";
import { useRecallDrop } from "../hooks/useRecallDrop";

const Dashboard = () => {
  const { balance, items, address, isConnected, refetch: refetchInventory } = useMyInventory();
  const { myDrops, isPending, refetch: refetchDrops } = useOutgoingDrops();
  const { recallDrop } = useRecallDrop();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  
  const mintDemoItem = () => {
    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::mint_sword`,
      arguments: [], 
    });

    signAndExecute(
      { transaction: tx },
      { 
        onSuccess: () => { 
            alert("⚔️ Sword Minted Successfully!"); 
            setTimeout(() => refetchInventory(), 2000);
        },
        onError: (err) => {
            console.error(err);
            alert("Mint failed: " + err.message);
        }
      }
    );
  };

  const formatAddress = (addr) => 
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      
      {/* --- NAVBAR --- */}
      <nav className="flex items-center px-6 py-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 justify-between">
        <div className="flex gap-2 items-center text-gray-800">
          <i className="fa-solid fa-vault text-2xl text-green-600"></i>
          <p className="font-bold text-xl tracking-tight">SuiSecureDrop</p>
        </div>
        
        <div className="hidden md:flex gap-8">
            <span className="text-green-600 font-bold border-b-2 border-green-600 cursor-default">
                Dashboard
            </span>
            <Link to="/claim" className="text-gray-500 hover:text-green-600 font-medium transition flex items-center gap-2">
                <i className="fa-solid fa-envelope-open-text"></i>
                Inbox (Receive)
            </Link>
        </div>

        <div>
          <ConnectButton className="bg-gray-900 text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition" />
        </div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 pt-8 max-w-7xl mx-auto">
        
        {/* --- LEFT COLUMN: WALLET & INVENTORY --- */}
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-xl font-bold text-gray-800">My Wallet</p>
            <div className="relative overflow-hidden border border-gray-700 rounded-2xl shadow-xl p-6 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Balance</p>
              <p className="text-4xl font-bold mt-1 mb-4">
                {balance} <span className="text-lg text-green-400">SUI</span>
              </p>
              <div className="flex items-center gap-2 bg-gray-700/50 w-fit px-3 py-1 rounded-full border border-gray-600">
                <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"}`}></div>
                <p className="text-xs text-gray-300 font-mono">{isConnected ? formatAddress(address) : "Not Connected"}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center my-3">
              <p className="text-xl font-bold text-gray-800">My Items</p>
              <button onClick={mintDemoItem} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium hover:bg-blue-200 transition">+ Mint Demo Sword</button>
            </div>
            <div className="flex flex-col gap-3">
              {!isConnected ? (
                <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                   <p className="text-gray-500">Connect wallet to see items</p>
                </div>
              ) : items.length === 0 ? (
                <div className="p-8 text-center border border-gray-200 rounded-xl bg-white shadow-sm">
                   <p className="text-gray-500">No items found. Mint one above!</p>
                </div>
              ) : (
                items.map((item) => (
                    <div key={item.data.objectId} className="flex border border-gray-100 bg-white rounded-xl shadow-sm p-4 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">⚔️</div>
                            <div>
                                <p className="font-bold text-gray-800 text-sm">{item.data.content?.fields?.name || "SecureDrop Item"}</p>
                                <p className="text-xs text-gray-400 font-mono">{formatAddress(item.data.objectId)}</p>
                            </div>
                        </div>
                    </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: ACTIVE DROPS --- */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold text-gray-800">Outgoing Drops</p>
            <Link to="/create" className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-full font-bold shadow-lg hover:bg-green-600 transition">
              <i className="fa-solid fa-plus"></i>
              <span>New Drop</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {isPending ? (
                 <div className="animate-pulse space-y-4">
                    <div className="h-32 bg-gray-200 rounded-2xl"></div>
                 </div>
            ) : myDrops.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50">
                    <p className="text-gray-500 font-medium text-center">No active drops found.<br/><span className="text-sm text-gray-400">Items you sent will appear here.</span></p>
                </div>
            ) : (
                myDrops.map((drop) => {
                  // NEW: Calculate how many items are inside the drop vector
                  const itemCount = drop.items?.length || 0;

                  return (
                    <div key={drop.id} className="relative flex flex-col border border-gray-200 bg-white rounded-2xl shadow-sm p-5 hover:border-green-300 transition">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                              <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
                                  <i className="fa-solid fa-box-archive text-xl"></i>
                              </div>
                              <div>
                                  <p className="text-lg font-bold text-gray-800">Care Package</p>
                                  <p className="text-xs text-gray-400 font-mono">{formatAddress(drop.id)}</p>
                              </div>
                          </div>
                          {/* SHOW ITEM COUNT TAG */}
                          {itemCount > 0 && (
                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                                {itemCount} {itemCount === 1 ? 'NFT' : 'NFTs'}
                            </span>
                          )}
                        </div>

                        <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100 space-y-2">
                          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">SUI Balance</span>
                              <span className="text-sm font-bold text-green-600">
                                  {(parseInt(drop.balance || drop.amount) / 1_000_000_000).toFixed(2)} SUI
                              </span>
                          </div>
                          <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Recipient</span>
                              <span className="text-sm font-mono text-gray-700">{formatAddress(drop.recipient)}</span>
                          </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
                          <div className="flex gap-2 items-center text-gray-500 italic text-xs">
                              <i className="fa-solid fa-lock"></i>
                              <span>Encrypted with PIN</span>
                          </div>
                          
                          <button 
                              onClick={() => {
                                  if(window.confirm("Recall this package? Items & SUI will be returned to you.")) {
                                      recallDrop({
                                          dropId: drop.id,
                                          onSuccess: () => {
                                              alert("Recall Successful!");
                                              refetchDrops(); 
                                              refetchInventory(); 
                                          },
                                          onError: (e) => refetchDrops()
                                      });
                                  }
                              }}
                              className="text-red-500 hover:text-red-700 font-bold bg-red-50 px-3 py-1.5 rounded-lg transition"
                          >
                              Recall
                          </button>
                        </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;