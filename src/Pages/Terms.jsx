import React, { useState } from "react";
import { Link } from "react-router-dom";

const Terms = () => {
  const [activeClause, setActiveClause] = useState("acceptance");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const clauses = {
    acceptance: {
      id: "acceptance",
      title: "Acceptance of Terms",
      text: "By accessing or using the SuiSecureDrop protocol, interface, or smart contracts (collectively, the 'Protocol'), you agree to be bound by these Terms of Service. The Protocol is a decentralized, non-custodial application running on the Sui blockchain.",
    },
    nonCustodial: {
      id: "nonCustodial",
      title: "Non-Custodial Nature",
      text: "You acknowledge that the Protocol is strictly non-custodial. We do not have access to your private keys, PINs, or assets. You are solely responsible for safeguarding your cryptographic keys and the 4-digit PINs used to secure your drops.",
    },
    risk: {
      id: "risk",
      title: "Assumption of Risk",
      text: "Using blockchain technology involves significant risk. You understand that the Protocol is provided 'AS IS', and we are not liable for any losses resulting from smart contract bugs, network failures, or user error (e.g., forgetting a PIN).",
    },
    prohibited: {
      id: "prohibited",
      title: "Prohibited Activity",
      text: "You agree not to use the Protocol for money laundering, financing terrorism, or interacting with sanctioned addresses. We reserve the right to restrict access to the interface (frontend) if illicit activity is detected.",
    },
  };

  return (
    <div className="min-h-screen bg-white pb-20 font-body text-gray-900 antialiased">
      {/* --- ELITE NAVBAR --- */}
      <nav className="flex items-center px-5 md:px-16 py-6 w-full justify-between z-[100] border-b border-gray-50 fixed top-0 bg-white/80 backdrop-blur-xl">
        <div className="flex gap-3 items-center">
          <div className="bg-gray-900 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg">
            <i className="fa-solid fa-scale-balanced text-white text-lg"></i>
          </div>
          <p className="font-heading font-black text-xl md:text-2xl tracking-tightest text-gray-900 leading-none">
            Protocol<span className="text-gray-400">Terms</span>
          </p>
        </div>
        <div className="flex gap-4 md:gap-8 items-center">
          <Link
            to="/"
            className="hidden sm:block text-[11px] font-black uppercase tracking-widest-xl text-gray-400 hover:text-gray-900 transition"
          >
            Return Home
          </Link>
          <Link
            to="/dashboard"
            className="bg-gray-900 text-white px-5 md:px-8 py-2.5 rounded-xl md:rounded-2xl font-black text-[10px] tracking-widest hover:bg-black transition shadow-xl"
          >
            LAUNCH APP
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-5 md:px-16 pt-40 grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* --- STICKY SIDEBAR --- */}
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-40">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-10">
              Table of Contents
            </p>
            <nav className="flex flex-col gap-6 border-l border-gray-100 pl-6">
              {Object.values(clauses).map((clause) => (
                <button
                  key={clause.id}
                  onClick={() => setActiveSection(clause.id)} // Note: You'd implement smooth scroll here in prod
                  className={`text-left text-sm font-bold transition-all duration-300 ${
                    activeClause === clause.id
                      ? "text-gray-900 translate-x-2"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {clause.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="lg:col-span-8">
          <h1 className="font-heading font-black text-6xl md:text-8xl tracking-tightest leading-none mb-12 text-gray-900">
            Terms of Service<span className="text-gray-300">.</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed mb-20 max-w-2xl">
            Effective Date: December 18, 2025. <br />
            Please read these terms carefully before interacting with the smart
            contracts.
          </p>

          <div className="space-y-24">
            {Object.values(clauses).map((clause, index) => (
              <section key={clause.id} className="group">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-heading font-black text-4xl text-gray-200 group-hover:text-green-500 transition-colors duration-500">
                    0{index + 1}
                  </span>
                  <h2 className="font-heading font-black text-3xl md:text-4xl text-gray-900 tracking-tightest">
                    {clause.title}
                  </h2>
                </div>
                <p className="text-lg text-gray-600 leading-loose font-medium border-l-2 border-gray-100 pl-6 group-hover:border-green-500 transition-all duration-500">
                  {clause.text}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-32 p-12 bg-gray-50 rounded-[3rem] border border-gray-100">
            <p className="font-heading font-black text-2xl mb-4">Agreement</p>
            <p className="text-gray-500 mb-8 leading-relaxed">
              By connecting your wallet, you digitally sign these terms.
            </p>
            <Link
              to="/dashboard"
              className="inline-block bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-xs tracking-widest hover:bg-black transition"
            >
              I AGREE & CONNECT
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Terms;
