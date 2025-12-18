import React, { useState } from "react";
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { Link } from "react-router-dom";
import { PACKAGE_ID, MODULE_NAME } from "../constants";

const History = () => {
  const account = useCurrentAccount();
  const myAddr = account?.address?.toLowerCase();
  const [filter, setFilter] = useState("all");

  const { data: events, isPending } = useSuiClientQuery(
    "queryEvents",
    {
      query: { MoveModule: { package: PACKAGE_ID, module: MODULE_NAME } },
      order: "descending",
    },
    { enabled: !!account, refetchInterval: 5000 }
  );

  const historyItems = events?.data?.map((event) => {
    const type = event.type.split("::").pop(); 
    const data = event.parsedJson;
    const txSigner = event.sender.toLowerCase();
    const sender = data.sender?.toLowerCase();
    const recipient = data.recipient?.toLowerCase();

    const iWasTheSigner = txSigner === myAddr;
    const iWasTheSender = sender === myAddr;
    const iWasTheRecipient = recipient === myAddr;

    if (!iWasTheSigner && !iWasTheSender && !iWasTheRecipient) return null;

    let actionLabel = "";
    let isPositive = false;
    let displayParty = "";

    if (type.includes("Created")) {
        actionLabel = iWasTheSender ? "Sent" : "Received";
        isPositive = !iWasTheSender;
        displayParty = iWasTheSender ? recipient : sender;
    } else if (type.includes("Claimed")) {
        actionLabel = iWasTheSigner ? "Claimed" : "Package Claimed";
        isPositive = iWasTheSigner;
        displayParty = iWasTheSigner ? sender : recipient;
    } else if (type.includes("Recalled")) {
        actionLabel = iWasTheSigner ? "Recalled" : "Sender Recalled";
        isPositive = iWasTheSigner;
        displayParty = iWasTheSigner ? recipient : sender;
    }

    return {
      id: event.id.txDigest,
      timestamp: event.timestampMs,
      type: actionLabel,
      isPositive,
      party: displayParty,
      amount: (parseInt(data.amount || data.balance || 0) / 1_000_000_000).toFixed(2)
    };
  }).filter(Boolean) || [];

  const filteredItems = historyItems.filter(item => {
    if (filter === "sent") return !item.isPositive;
    if (filter === "received") return item.isPositive;
    return true;
  });

  const formatDate = (ms) => new Date(parseInt(ms)).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* --- HEADER & FILTERS --- */}
        <div className="pt-8 pb-6">
          <Link to="/dashboard" className="text-gray-400 font-bold hover:text-green-600 transition flex items-center gap-2 mb-4 text-sm">
            <i className="fa-solid fa-arrow-left"></i> Dashboard
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Activity</h1>
            
            {/* Responsive Filter Tabs */}
            <div className="flex bg-gray-200/50 p-1 rounded-xl w-fit">
              {["all", "sent", "received"].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                    filter === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- HISTORY LIST --- */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {isPending ? (
            <div className="p-20 text-center text-gray-400">
                <i className="fa-solid fa-circle-notch fa-spin text-3xl mb-4"></i>
                <p className="font-medium">Scanning blockchain...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="p-16 text-center">
                <i className="fa-solid fa-clock-rotate-left text-4xl text-gray-200 mb-4 block"></i>
                <p className="text-gray-500 font-medium">No activity found yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filteredItems.map((item, idx) => (
                <div key={idx} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition group">
                  
                  {/* Left: Icon & Info */}
                  <div className="flex items-center gap-4">
                    <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm border ${
                        item.isPositive ? "bg-green-50 text-green-600 border-green-100" : "bg-gray-50 text-gray-400 border-gray-100"
                    }`}>
                      <i className={`fa-solid ${
                          item.type.includes("Sent") ? "fa-paper-plane" : 
                          item.type.includes("Received") || item.type.includes("Claimed") ? "fa-hand-holding-dollar" : "fa-clock-rotate-left"
                      }`}></i>
                    </div>
                    
                    <div className="min-w-0">
                      <p className="font-bold text-gray-800 text-lg truncate">{item.type}</p>
                      <p className="text-xs text-gray-400 font-mono mt-0.5 truncate max-w-[180px] sm:max-w-none">
                        {item.party ? (item.isPositive ? "From: " : "To: ") : ""}
                        {item.party ? `${item.party.slice(0,6)}...${item.party.slice(-4)}` : "Care Package"}
                      </p>
                      <p className="text-[10px] text-gray-300 mt-1 uppercase font-bold tracking-widest">{formatDate(item.timestamp)}</p>
                    </div>
                  </div>
                  
                  {/* Right: Amount & Verify */}
                  <div className="flex flex-row sm:flex-col justify-between items-center sm:items-end border-t sm:border-t-0 pt-3 sm:pt-0">
                    <p className={`text-xl font-black ${item.isPositive ? "text-green-600" : "text-gray-900"}`}>
                      {item.isPositive ? "+" : "-"}{item.amount} <span className="text-sm font-bold">SUI</span>
                    </p>
                    <a 
                        href={`https://suiscan.xyz/devnet/tx/${item.id}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-md sm:mt-2 sm:opacity-0 sm:group-hover:opacity-100 transition"
                    >
                      Verify <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;