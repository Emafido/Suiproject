import React, { useState, useEffect } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";

const MobileGuide = () => {
  const account = useCurrentAccount();
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile && !account) {
      setShowGuide(true);
    }
  }, [account]);

  if (!showGuide) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] p-4 animate-in slide-in-from-bottom-5">
      <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-6 relative max-w-md mx-auto">
        <button
          onClick={() => setShowGuide(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        <div className="flex gap-4 items-start">
          <div className="bg-blue-100 p-3 rounded-xl text-blue-600 text-2xl">
            <i className="fa-solid fa-wallet"></i>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Using a Phone?</h3>
            <p className="text-sm text-gray-500 mt-1">
              Standard browsers (Chrome/Safari) cannot connect to your wallet.
            </p>
          </div>
        </div>

        <button
          onClick={() => (window.location.href = "https://suiwallet.app")}
          className="w-full mt-4 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-lg"
        >
          Open in Sui Wallet App
        </button>
      </div>
    </div>
  );
};

export default MobileGuide;
