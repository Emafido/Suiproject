import React, { useState } from "react";
import {
  ConnectButton,
  useSignAndExecuteTransaction,
  useCurrentAccount,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { Link } from "react-router-dom";
import { PACKAGE_ID, MODULE_NAME } from "../constants";

// Import your Custom Hooks
import { useMyInventory } from "../hooks/useMyInventory";
import { useOutgoingDrops } from "../hooks/useOutgoingDrops";
import { useRecallDrop } from "../hooks/useRecallDrop";

const Dashboard = () => {
  const account = useCurrentAccount();
  const isConnected = !!account;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    balance,
    items,
    address,
    refetch: refetchInventory,
  } = useMyInventory();
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
          alert("⚔️ Artifact Securely Minted!");
          setTimeout(() => refetchInventory(), 2000);
        },
        onError: (err) => {
          console.error(err);
          alert("Mint failed: " + err.message);
        },
      }
    );
  };

  const formatAddress = (addr) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

  return (
    <div className="min-h-screen bg-gray-50 pb-16 font-body text-gray-900 antialiased overflow-x-hidden">
      <nav className="flex items-center px-6 md:px-12 py-5 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-60 justify-between">
        <div className="flex gap-3 items-center shrink-0">
          <div className="bg-green-600 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shadow-green-100">
            <i className="fa-solid fa-vault text-white text-lg"></i>
          </div>
          <p className="font-heading font-black text-2xl tracking-tightest text-gray-900 leading-none">
            Sui<span className="text-green-600">SecureDrop</span>
          </p>
        </div>

        <div className="hidden lg:flex gap-10 items-center text-xs font-black uppercase tracking-[0.2em] text-gray-400">
          <Link
            to="/dashboard"
            className="text-green-600 border-b-2 border-green-600 pb-1"
          >
            Dashboard
          </Link>
          <Link to="/claim" className="hover:text-green-600 transition">
            Inbox
          </Link>
          <Link to="/history" className="hover:text-green-600 transition">
            History
          </Link>
          <ConnectButton className="bg-gray-900 text-white rounded-xl px-6 py-2 hover:bg-black transition" />
        </div>

        <button
          onClick={() => setIsMenuOpen(true)}
          className="lg:hidden w-12 h-12 flex items-center justify-center bg-gray-900 rounded-2xl text-white shadow-xl active:scale-90 transition"
        >
          <i className="fa-solid fa-bars-staggered text-lg"></i>
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-100 transition-all duration-500 lg:hidden ${
          isMenuOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity duration-500 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-in-out p-8 flex flex-col ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-12">
            <p className="font-heading font-black text-2xl tracking-tightest text-gray-900">
              Menu
            </p>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-900"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <nav className="flex flex-col gap-8 flex-1">
            <Link
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="text-4xl font-heading font-black text-green-600 tracking-tightest"
            >
              Dashboard
            </Link>
            <Link
              to="/claim"
              onClick={() => setIsMenuOpen(false)}
              className="text-4xl font-heading font-black text-gray-900 tracking-tightest"
            >
              Inbox
            </Link>
            <Link
              to="/history"
              onClick={() => setIsMenuOpen(false)}
              className="text-4xl font-heading font-black text-gray-900 tracking-tightest"
            >
              History
            </Link>
          </nav>

          <div className="mt-auto space-y-6 pt-8 border-t border-gray-100">
            <div className="p-6 bg-gray-50 rounded-4xl border border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Connected Address
              </p>
              <p className="text-xs font-mono text-gray-600 break-all leading-relaxed font-semibold">
                {isConnected ? address : "Not Connected"}
              </p>
            </div>
            <ConnectButton className="w-full !rounded-[1.5rem]" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-12 pt-8 md:pt-12">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center text-center py-16 md:py-24 bg-white rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/40 px-6 animate-in fade-in duration-700">
            <div className="bg-green-50 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-inner">
              <i className="fa-solid fa-shield-halved text-5xl text-green-600"></i>
            </div>
            <h1 className="font-heading text-4xl md:text-7xl font-black text-gray-900 mb-6 tracking-tightest leading-none">
              Privacy is <br className="hidden md:block" /> Essential.
            </h1>
            <p className="text-gray-500 max-w-md mb-12 text-lg md:text-xl font-medium leading-relaxed">
              Connect your wallet to start sending PIN-protected care packages
              and manage your vault.
            </p>

            <div className="w-full max-w-md bg-gray-50 rounded-4xl p-8 text-left border border-gray-100 mb-12">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <i className="fa-solid fa-mobile-screen"></i> Mobile
                Instructions
              </p>
              <ul className="space-y-5 text-sm text-gray-600 font-bold">
                <li className="flex gap-4 items-start">
                  <span className="bg-white text-gray-900 rounded-xl w-8 h-8 flex items-center justify-center shadow-sm shrink-0">
                    1
                  </span>
                  <span className="leading-snug">
                    Open <strong>Sui Wallet App</strong> on your phone.
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="bg-white text-gray-900 rounded-xl w-8 h-8 flex items-center justify-center shadow-sm shrink-0">
                    2
                  </span>
                  <span className="leading-snug">
                    Tap the <strong>Browser (Globe Icon)</strong> at the bottom.
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="bg-white text-gray-900 rounded-xl w-8 h-8 flex items-center justify-center shadow-sm shrink-0">
                    3
                  </span>
                  <span className="leading-snug">
                    Paste this URL and click <strong>Connect</strong>.
                  </span>
                </li>
              </ul>
            </div>

            <ConnectButton className="w-full md:w-auto bg-green-600 text-white px-16 py-5 rounded-[2.5rem] font-black text-xl shadow-xl shadow-green-100 active:scale-95 transition" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in slide-in-from-bottom-8 duration-700">
            <div className="lg:col-span-5 space-y-10">
              <div>
                <p className="mb-4 text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <i className="fa-solid fa-wallet text-gray-400"></i> Portfolio
                  Status
                </p>
                <div className="relative overflow-hidden border border-gray-700 rounded-[2.5rem] shadow-2xl p-10 md:p-12 bg-linear-to-br from-gray-800 to-gray-900 text-white group">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/10 blur-[80px] -mr-24 -mt-24 group-hover:bg-green-500/20 transition duration-700"></div>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">
                    Current Assets
                  </p>
                  <h2 className="font-heading text-5xl md:text-7xl font-black mt-2 mb-10 tracking-tightest leading-none">
                    {balance}{" "}
                    <span className="text-xl md:text-2xl text-green-400 font-bold">
                      SUI
                    </span>
                  </h2>
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 w-fit px-5 py-2.5 rounded-2xl backdrop-blur-md">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                    <p className="text-xs text-gray-300 font-mono font-bold tracking-tight">
                      {formatAddress(address)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center my-6">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                    Vault Artifacts
                  </p>
                  <button
                    onClick={mintDemoItem}
                    className="text-[10px] bg-gray-900 text-white px-5 py-2 rounded-xl font-black tracking-widest shadow-xl active:scale-95 transition"
                  >
                    + MINT
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
                  {items.length === 0 ? (
                    <div className="p-16 text-center border-2 border-dashed border-gray-100 rounded-[2.5rem] bg-white shadow-sm">
                      <p className="text-gray-400 text-sm font-bold italic">
                        No items stored in vault.
                      </p>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div
                        key={item.data.objectId}
                        className="flex border border-gray-100 bg-white rounded-4xl shadow-sm p-6 items-center justify-between hover:border-green-300 transition-all group"
                      >
                        <div className="flex items-center gap-5 overflow-hidden">
                          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform">
                            ⚔️
                          </div>
                          <div className="overflow-hidden">
                            <p className="font-heading font-black text-gray-800 text-lg truncate tracking-tight">
                              {item.data.content?.fields?.name || "Artifact"}
                            </p>
                            <p className="text-[10px] font-mono font-bold text-gray-400 mt-0.5 tracking-tighter uppercase">
                              {item.data.objectId.slice(0, 25)}...
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-10">
              <div className="flex justify-between items-center">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <i className="fa-solid fa-paper-plane text-gray-400 text-lg"></i>{" "}
                  Active Deliveries
                </p>
                <Link
                  to="/create"
                  className="flex items-center gap-3 bg-green-600 text-white px-8 py-3.5 rounded-3xl font-black text-xs shadow-2xl shadow-green-100 active:scale-95 transition transform"
                >
                  <i className="fa-solid fa-plus text-sm"></i>
                  <span className="tracking-widest">NEW DROP</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {isPending ? (
                  <div className="animate-pulse space-y-6">
                    <div className="h-44 bg-white rounded-[3.5rem]"></div>
                    <div className="h-44 bg-white rounded-[3.5rem]"></div>
                  </div>
                ) : myDrops.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-28 border-2 border-dashed border-gray-100 rounded-[3.5rem] bg-white text-center shadow-inner">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-200">
                      <i className="fa-solid fa-ghost text-4xl"></i>
                    </div>
                    <p className="text-gray-400 font-black text-lg mb-2">
                      No active drops found.
                    </p>
                    <Link
                      to="/history"
                      className="text-green-600 font-black text-xs hover:underline uppercase tracking-widest-xl"
                    >
                      View Transaction History →
                    </Link>
                  </div>
                ) : (
                  myDrops.map((drop) => {
                    const itemCount = drop.items?.length || 0;
                    return (
                      <div
                        key={drop.id}
                        className="relative flex flex-col border border-gray-100 bg-white rounded-[3.5rem] p-10 shadow-sm hover:shadow-2xl transition-all duration-700 group"
                      >
                        <div className="flex flex-col xl:flex-row justify-between gap-10 mb-10">
                          <div className="flex gap-8 items-center">
                            <div className="w-24 h-24 bg-yellow-50 text-yellow-600 rounded-[2.5rem] flex items-center justify-center text-4xl border border-yellow-100 group-hover:scale-110 transition shadow-inner">
                              <i className="fa-solid fa-box-archive"></i>
                            </div>
                            <div>
                              <p className="font-heading font-black text-gray-900 text-4xl tracking-tightest leading-none">
                                {(
                                  parseInt(drop.balance || drop.amount) / 1e9
                                ).toFixed(2)}
                              </p>
                              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest-xl mt-2">
                                SUI Locked
                              </p>
                            </div>
                          </div>
                          {itemCount > 0 && (
                            <div className="xl:text-right">
                              <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-xl shadow-blue-100">
                                {itemCount} NFTs Encrypted
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="bg-gray-50 rounded-[2.5rem] p-8 mb-8 border border-gray-100 space-y-4">
                          <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                              Intended Recipient
                            </span>
                            <span className="text-xs font-mono text-gray-600 break-all leading-relaxed font-bold bg-white p-4 rounded-2xl border border-gray-200">
                              {drop.recipient}
                            </span>
                          </div>
                        </div>

                        <div className="mt-auto pt-8 border-t border-gray-50 flex flex-wrap justify-between items-center gap-6">
                          <div className="flex gap-3 items-center text-gray-300 italic text-[10px] font-bold uppercase tracking-widest">
                            <i className="fa-solid fa-lock text-[9px]"></i>
                            <span>Secured by Protocol PIN</span>
                          </div>

                          <button
                            onClick={() => {
                              if (window.confirm("Recall this package?")) {
                                recallDrop({
                                  dropId: drop.id,
                                  onSuccess: () => {
                                    refetchDrops();
                                    refetchInventory();
                                  },
                                  onError: () => refetchDrops(),
                                });
                              }
                            }}
                            className="text-red-600 hover:text-white hover:bg-red-600 font-black text-[10px] bg-red-50 px-8 py-3 rounded-2xl transition-all duration-300 uppercase tracking-widest shadow-sm"
                          >
                            Recall Funds
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
