import React from "react";
import { Link } from "react-router-dom";

const Security = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-16 font-body pt-32">
        <div className="max-w-4xl mx-auto">
            <Link to="/" className="text-gray-400 font-black text-xs uppercase tracking-widest mb-8 block">← Home</Link>
            <h1 className="font-heading font-black text-5xl md:text-8xl tracking-tightest mb-12">Security Protocol.</h1>
            
            <div className="space-y-12">
                <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100">
                    <h2 className="font-heading font-black text-3xl mb-6">Object-Centric Safety</h2>
                    <p className="text-gray-500 text-lg leading-relaxed">Unlike traditional account-based blockchains, Sui treats assets as unique objects. SuiSecureDrop locks your assets inside a programmable vault object that only recognizes two specific commands: Claim with PIN or Recall by Sender.</p>
                </div>
                
                <div className="bg-gray-900 p-12 rounded-[3rem] text-white shadow-2xl">
                    <h2 className="font-heading font-black text-3xl mb-6 text-green-500">PIN Encryption</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">Your funds are protected by a user-defined 4-digit PIN. This PIN is hashed on-chain, ensuring that even if a recipient's wallet is compromised, the attacker cannot access the funds without the secret code.</p>
                </div>
            </div>
        </div>
    </div>
  );
};
export default Security;