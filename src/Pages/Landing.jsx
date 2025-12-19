import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * LANDING PAGE - SuiSecureDrop
 * Principles:
 * - High-Tech Financial Security (Space Grotesk)
 * - Calming & Reassuring (Inter + Smooth Blurs)
 * - Interactive & Responsive
 */
const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-body text-gray-900 antialiased overflow-x-hidden">
      {/* --- ELITE NAVBAR --- */}
      <nav className="flex items-center px-6 md:px-16 py-6 w-full justify-between z-[100] border-b border-gray-50 fixed top-0 bg-white/80 backdrop-blur-xl">
        <div className="flex gap-3 items-center">
          <div className="bg-green-600 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shadow-green-100">
            <i className="fa-solid fa-vault text-white text-lg"></i>
          </div>
          <p className="font-heading font-black text-2xl tracking-tightest text-gray-900 leading-none">
            Sui<span className="text-green-600">SecureDrop</span>
          </p>
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-12 text-[11px] font-black uppercase tracking-widest-xl text-gray-400">
          <li className="hover:text-green-600 transition">
            <Link to="/how-it-works">How it works</Link>
          </li>
          <li className="hover:text-green-600 transition">
            <Link to="/security">Security</Link>
          </li>
          <li className="hover:text-green-600 transition">
            <Link to="/docs">Documentation</Link>
          </li>
        </ul>

        <div className="hidden lg:block">
          <Link
            to="/dashboard"
            className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-black text-xs tracking-widest hover:bg-black transition shadow-xl"
          >
            LAUNCH APP
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-gray-900 text-2xl"
        >
          <i
            className={`fa-solid ${
              isMenuOpen ? "fa-xmark" : "fa-bars-staggered"
            }`}
          ></i>
        </button>
      </nav>

      {/* --- MOBILE DRAWER --- */}
      <div
        className={`fixed inset-0 z-[90] bg-white transition-transform duration-500 lg:hidden ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10">
          <Link
            to="/how-it-works"
            onClick={() => setIsMenuOpen(false)}
            className="font-heading font-black text-5xl tracking-tightest"
          >
            How it works
          </Link>
          <Link
            to="/security"
            onClick={() => setIsMenuOpen(false)}
            className="font-heading font-black text-5xl tracking-tightest"
          >
            Security
          </Link>
          <Link
            to="/docs"
            onClick={() => setIsMenuOpen(false)}
            className="font-heading font-black text-5xl tracking-tightest"
          >
            Docs
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setIsMenuOpen(false)}
            className="bg-green-600 text-white px-12 py-5 rounded-[2rem] font-black text-xl"
          >
            LAUNCH APP
          </Link>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32  lg:h-screen flex items-center px-6 md:px-16 overflow-hidden">
        {/* Abstract Background Blur */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-green-100 rounded-full blur-[120px] opacity-50 -z-10"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-50 rounded-full blur-[120px] opacity-50 -z-10"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto w-full">
          <div>
            <div className="inline-flex items-center gap-3 bg-gray-50 border border-gray-100 px-4 py-2 rounded-full mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                Protocol v1.0 Live on Sui
              </p>
            </div>

            <h1 className="font-heading text-6xl md:text-8xl font-black text-gray-900 tracking-tightest leading-[0.9] mb-8">
              Send Assets. <br />{" "}
              <span className="text-green-600">With Control.</span>
            </h1>

            <p className="font-body text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-lg mb-12">
              The first reversible, PIN-protected transfer protocol designed for
              total peace of mind.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                to="/dashboard"
                className="bg-gray-900 text-white px-10 py-5 rounded-[2rem] font-black text-lg shadow-2xl hover:bg-black transition flex items-center justify-center gap-3 group"
              >
                Launch Application
                <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition"></i>
              </Link>
              <Link
                to="/docs"
                className="bg-white border border-gray-100 text-gray-900 px-10 py-5 rounded-[2rem] font-black text-lg shadow-sm hover:bg-gray-50 transition flex items-center justify-center"
              >
                Read Documentation
              </Link>
            </div>

            <div className="mt-16 flex items-center gap-8 border-l-4 border-green-600 pl-8">
              <div>
                <p className="font-heading font-black text-2xl text-gray-900">
                  100% Secure
                </p>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">
                  Sui Move Powered
                </p>
              </div>
              <div className="w-px h-10 bg-gray-100"></div>
              <div>
                <p className="font-heading font-black text-2xl text-gray-900">
                  Reversible
                </p>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">
                  Instant Recall
                </p>
              </div>
            </div>
          </div>

          {/* Hero Visual Mockup */}
          <div className="hidden lg:block relative">
            <div className="bg-gray-900 rounded-[4rem] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] rotate-2 border border-white/10">
              <div className="flex justify-between items-center mb-12">
                <i className="fa-solid fa-vault text-3xl text-green-500"></i>
                <div className="bg-white/10 px-4 py-1 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Protocol UI
                </div>
              </div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">
                Transfer Encrypted
              </p>
              <h2 className="font-heading text-6xl font-black text-white tracking-tightest mb-8">
                1,250.00 <span className="text-xl text-white/20">SUI</span>
              </h2>
              <div className="space-y-4">
                <div className="h-4 w-full bg-white/5 rounded-full"></div>
                <div className="h-4 w-3/4 bg-white/5 rounded-full"></div>
              </div>
              <div className="mt-12 bg-green-600 h-16 rounded-3xl flex items-center justify-center font-black text-white text-xl">
                LOCKED
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="bg-gray-50 py-32 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              icon: "fa-link",
              title: "100% On-Chain",
              text: "Every transaction is verifiable on the Sui explorer with complete transparency.",
            },
            {
              icon: "fa-gavel",
              title: "Audited Move",
              text: "Built on Move, the world's most secure smart contract language for digital assets.",
            },
            {
              icon: "fa-bolt-lightning",
              title: "High Speed",
              text: "Leverage Sui's object-centric architecture for near-instant transaction finality.",
            },
          ].map((feat, i) => (
            <div
              key={i}
              className="bg-white p-12 rounded-[3rem] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-gray-900 text-2xl">
                <i className={`fa-solid ${feat.icon}`}></i>
              </div>
              <h3 className="font-heading font-black text-2xl text-gray-900 mb-4 tracking-tightest">
                {feat.title}
              </h3>
              <p className="font-body font-medium text-gray-500 leading-relaxed">
                {feat.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="px-6 md:px-16 py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start">
            <p className="font-heading font-black text-2xl tracking-tightest mb-2">
              SuiSecureDrop
            </p>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
              &copy; 2025 Protocol. All rights reserved.
            </p>
          </div>

          <div className="flex gap-8">
            <a
              href="#"
              className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition"
            >
              <i className="fa-brands fa-x-twitter text-lg"></i>
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition"
            >
              <i className="fa-brands fa-github text-lg"></i>
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition"
            >
              <i className="fa-brands fa-discord text-lg"></i>
            </a>
          </div>

          <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <Link to="/privacy" className="hover:text-gray-900 transition">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-gray-900 transition">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
