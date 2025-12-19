import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useIncomingDrops } from "../hooks/useIncomingDrops";
import { useClaimDrop } from "../hooks/useClaimDrop";
import confetti from "canvas-confetti";

const Receiver = () => {
  const account = useCurrentAccount();
  const { incomingDrops, isPending, refetch } = useIncomingDrops();
  const { claimDrop } = useClaimDrop();

  const [pinInputs, setPinInputs] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  const handleClaim = (dropId) => {
    const pin = pinInputs[dropId];
    if (!pin) return alert("Please enter the PIN.");

    setLoadingId(dropId);

    // .trim() removes the invisible mobile space
    claimDrop({
      dropId,
      pin: pin.trim(),
      onSuccess: () => {
        // 1. Victory Animation
        confetti({
          particleCount: 150,
          spread: 70,
          colors: ["#10B981", "#3B82F6"],
        });

        // 2. Alert User
        alert("🎉 Package Unlocked! Funds and items are now in your wallet.");

        // 3. Clear Loading State
        setLoadingId(null);

        // 4. Refresh List (Delay slightly to let blockchain update)
        setTimeout(() => {
          refetch();
        }, 1000);
      },
      onError: (e) => {
        console.error("Claim Error:", e);
        // Detect specific error types if possible, otherwise generic
        alert("❌ Access Denied: Incorrect PIN or Transaction Failed.");
        setLoadingId(null);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/dashboard"
            className="text-gray-500 font-bold hover:text-green-600 transition flex items-center gap-2"
          >
            <i className="fa-solid fa-arrow-left"></i> Back
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">My Inbox</h1>
        </div>

        <div className="space-y-4">
          {/* Loading Indicator */}
          {isPending && (
            <div className="text-center py-12 text-gray-400">
              <i className="fa-solid fa-circle-notch fa-spin text-2xl mb-2"></i>
              <p>Scanning secure packages...</p>
            </div>
          )}

          {/* Empty State */}
          {!isPending && incomingDrops.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center animate-in fade-in">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                📭
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                No pending drops
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                Any packages sent to{" "}
                <span className="font-mono bg-gray-100 px-1 rounded">
                  {account?.address?.slice(0, 6)}...
                </span>{" "}
                will appear here.
              </p>
            </div>
          )}

          {/* Drops List */}
          {incomingDrops.map((drop) => (
            <div
              key={drop.id}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-green-400 transition animate-in slide-in-from-bottom-2"
            >
              {/* Left: Package Info */}
              <div className="flex gap-4 items-center w-full md:w-auto">
                <div className="bg-green-100 w-14 h-14 rounded-2xl flex items-center justify-center text-green-600 text-2xl shadow-sm">
                  <i className="fa-solid fa-gift"></i>
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-lg">
                    Secure Package
                  </p>
                  <p className="text-green-600 font-black text-xl">
                    {(parseInt(drop.balance) / 1e9).toFixed(2)} SUI
                  </p>
                  {drop.items.length > 0 && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold inline-block mt-1">
                      + {drop.items.length} Items
                    </span>
                  )}
                </div>
              </div>

              {/* Right: Unlock Action */}
              <div className="flex gap-2 w-full md:w-auto bg-gray-50 p-2 rounded-xl">
                <input
                  type="password"
                  maxLength="4"
                  value={pinInputs[drop.id] || ""}
                  onChange={(e) =>
                    setPinInputs({ ...pinInputs, [drop.id]: e.target.value })
                  }
                  className="bg-white border border-gray-200 rounded-lg w-full md:w-28 text-center font-bold tracking-[0.5em] text-lg outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-300"
                  placeholder="PIN"
                />
                <button
                  onClick={() => handleClaim(drop.id)}
                  disabled={loadingId === drop.id}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold transition disabled:bg-gray-300 shadow-md min-w-[100px]"
                >
                  {loadingId === drop.id ? (
                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                  ) : (
                    "Unlock"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Receiver;
