import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Docs = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Data Structure for Documentation
  const sections = {
    introduction: {
      title: "Introduction",
      content: (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed font-body">
            SuiSecureDrop is a decentralized, non-custodial protocol designed for secure asset transfers on the Sui network. It introduces a "Pending State" for transactions, allowing for PIN-based authentication and sender recall.
          </p>
          <div className="bg-gray-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-3xl -mr-10 -mt-10 group-hover:bg-green-500/20 transition duration-700"></div>
            <h4 className="font-heading font-black text-green-400 uppercase tracking-widest-xl text-[10px] mb-6">The Core Protocol</h4>
            <p className="font-body text-base md:text-lg leading-relaxed relative z-10">
              Every drop is a <span className="font-mono text-green-300 bg-white/5 px-2 py-0.5 rounded italic">Sui Object</span>. 
              By moving assets into a contract-controlled object instead of directly to a recipient's address, we enable conditional logic that traditional transfers lack.
            </p>
          </div>
        </div>
      )
    },
    integration: {
      title: "Integration",
      content: (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-body">
          <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
            To interact with the protocol programmatically, you must call the <span className="font-mono bg-gray-100 px-2 rounded font-bold text-gray-900 text-sm md:text-base">create_drop</span> function.
          </p>
          
          <div className="bg-gray-50 border border-gray-100 rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-8 overflow-hidden">
            <div className="flex gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-300"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-300"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-300"></div>
            </div>
            <div className="overflow-x-auto custom-scrollbar">
                <pre className="font-mono text-[11px] md:text-sm text-gray-700 leading-6 whitespace-pre min-w-[500px] md:min-w-0">
{`// Sui Move function signature
public entry fun create_drop<T: key + store>(
    coin: Coin<SUI>,
    items: vector<T>,
    pin_hash: vector<u8>,
    recipient: address,
    ctx: &mut TxContext
)`}
                </pre>
            </div>
          </div>
          <p className="text-gray-500 leading-relaxed italic border-l-4 border-green-600 pl-6">
            The <span className="font-bold text-gray-900">pin_hash</span> is a SHA2-256 representation. The raw PIN never touches the ledger.
          </p>
        </div>
      )
    },
    security: {
      title: "Safety",
      content: (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed font-body">
            Safety is the protocol's primary directive. The recall mechanism ensures that human error does not result in permanent loss of capital.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 border border-green-100 bg-green-50/30 rounded-[2rem]">
              <h5 className="font-heading font-black text-gray-900 text-xl mb-3 tracking-tighter">Atomic Withdrawal</h5>
              <p className="text-sm text-gray-500 font-body leading-relaxed">Recalling a drop triggers an atomic transaction that destroys the vault and returns all SUI/NFTs in a single block.</p>
            </div>
            <div className="p-8 border border-blue-100 bg-blue-50/30 rounded-[2rem]">
              <h5 className="font-heading font-black text-gray-900 text-xl mb-3 tracking-tighter">Non-Custodial</h5>
              <p className="text-sm text-gray-500 font-body leading-relaxed">Only the original sender or the valid PIN holder can move assets. Admin keys do not exist.</p>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20 font-body text-gray-900 antialiased overflow-x-hidden">
      
      {/* --- RESPONSIVE ELITE NAVBAR --- */}
      <nav className="flex items-center px-5 md:px-16 py-6 w-full justify-between z-[100] border-b border-gray-50 fixed top-0 bg-white/80 backdrop-blur-xl">
        <div className="flex gap-3 items-center">
          <div className="bg-green-600 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shadow-green-100 transform -rotate-3 group cursor-pointer transition">
            <i className="fa-solid fa-vault text-white text-lg"></i>
          </div>
          <p className="font-heading font-black text-xl md:text-2xl tracking-tightest text-gray-900 leading-none">
            Sui<span className="text-green-600">Secure</span>
          </p>
        </div>

        <div className="flex gap-4 md:gap-8 items-center">
            {/* HIDDEN ON MOBILE/TABLET (lg:block) */}
            <Link to="/" className="hidden lg:block text-[11px] font-black uppercase tracking-widest-xl text-gray-400 hover:text-gray-900 transition">Return Home</Link>
            
            {/* HIDDEN ON MOBILE/TABLET (lg:block) */}
            <Link to="/dashboard" className="hidden lg:block bg-gray-900 text-white px-5 md:px-8 py-2.5 rounded-xl md:rounded-2xl font-black text-[10px] tracking-widest hover:bg-black transition shadow-xl">LAUNCH APP</Link>
            
            {/* HAMBURGER (Visible on Mobile) */}
            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden text-gray-900 text-xl"><i className="fa-solid fa-bars-staggered"></i></button>
        </div>
      </nav>

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      <div className={`fixed inset-0 z-[120] lg:hidden transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white p-8 flex flex-col transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <button onClick={() => setIsMenuOpen(false)} className="self-end w-12 h-12 bg-gray-50 rounded-full mb-10"><i className="fa-solid fa-xmark"></i></button>
            <p className="text-[10px] font-black uppercase tracking-widest-xl text-gray-400 mb-8 font-body">Navigate Docs</p>
            <nav className="flex flex-col gap-8">
                {Object.keys(sections).map(key => (
                    <button key={key} onClick={() => { setActiveSection(key); setIsMenuOpen(false); }} className={`text-left font-heading font-black text-4xl tracking-tightest transition ${activeSection === key ? 'text-green-600' : 'text-gray-300'}`}>
                        {sections[key].title}
                    </button>
                ))}
            </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-16 pt-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* --- DESKTOP SIDE NAVIGATION --- */}
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-40">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-10 font-body">Core Documentation</p>
            <nav className="flex flex-col gap-6">
              {Object.keys(sections).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`text-left font-heading font-black text-3xl tracking-tightest transition-all duration-500 ${
                    activeSection === key ? "text-green-600 translate-x-3 scale-105" : "text-gray-200 hover:text-gray-900"
                  }`}
                >
                  {sections[key].title}
                </button>
              ))}
            </nav>

            <div className="mt-20 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:border-green-200 transition">
                <p className="text-xs font-black text-gray-900 mb-2 uppercase tracking-widest font-body">Dev Support</p>
                <p className="text-xs text-gray-500 leading-relaxed font-body font-medium">Have technical questions about Sui Move? Join our engineering hub.</p>
                <a href="#" className="inline-block mt-4 text-[10px] font-black text-green-600 uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform">Discord Community →</a>
            </div>
          </div>
        </aside>

        {/* --- MOBILE HORIZONTAL TABS (Mobile Only) --- */}
        <div className="lg:hidden flex overflow-x-auto gap-8 pb-4 border-b border-gray-100 no-scrollbar sticky top-24 bg-white/80 backdrop-blur-md pt-4 -mx-5 px-5 z-40">
            {Object.keys(sections).map(key => (
                <button key={key} onClick={() => setActiveSection(key)} className={`whitespace-nowrap font-heading font-black text-xl tracking-tightest transition ${activeSection === key ? 'text-green-600' : 'text-gray-300'}`}>
                    {sections[key].title}
                </button>
            ))}
        </div>

        {/* --- MAIN DOCUMENTATION CONTENT --- */}
        <main className="lg:col-span-9">
          <div className="max-w-4xl">
            {/* Title with Fluid Typography */}
            <h1 className="font-heading font-black text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tightest leading-none mb-10 md:mb-16 text-gray-900">
                {sections[activeSection].title}<span className="text-green-600">.</span>
            </h1>
            
            {/* Section Content Rendering */}
            <div className="min-h-[400px]">
                {sections[activeSection].content}
            </div>

            {/* Pagination Controls / Metadata */}
            <div className="mt-20 md:mt-32 pt-12 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center sm:items-start">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] font-body">Protocol Documentation</p>
                    <p className="text-[10px] font-black text-gray-900 uppercase tracking-[0.3em] font-body mt-1">Built for Sui Mainnet v1.0.0</p>
                </div>
                <div className="flex gap-4">
                    <button className="w-14 h-14 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-300 hover:bg-gray-50 transition active:scale-90"><i className="fa-solid fa-chevron-left"></i></button>
                    <button className="w-14 h-14 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-300 hover:bg-gray-50 transition active:scale-90"><i className="fa-solid fa-chevron-right"></i></button>
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Docs;