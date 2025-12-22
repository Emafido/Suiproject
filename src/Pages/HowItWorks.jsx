import React from "react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-white font-body text-gray-900 antialiased overflow-x-hidden pt-32 pb-20">
      <nav className="flex items-center px-6 md:px-16 py-6 w-full justify-between z-100 border-b border-gray-50 fixed top-0 bg-white/80 backdrop-blur-xl">
        <div className="flex gap-3 items-center">
          <div className="bg-green-600 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shadow-green-100">
            <i className="fa-solid fa-vault text-white text-lg"></i>
          </div>
          <p className="font-heading font-black text-2xl tracking-tightest text-gray-900 leading-none">
            Sui<span className="text-green-600">SecureDrop</span>
          </p>
        </div>
        <Link
          to="/"
          className="text-[11px] font-black uppercase tracking-widest-xl text-gray-400 hover:text-gray-900 transition"
        >
          Return Home
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-24 text-center lg:text-left">
          <h1 className="font-heading text-6xl md:text-8xl font-black text-gray-900 tracking-tightest leading-[0.9] mb-8">
            The Protocol <br />{" "}
            <span className="text-green-600">Mechanics.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-2xl">
            SuiSecureDrop leverages Sui's object-centric architecture to create
            a secure, intermediate "Vault" for your assets.
          </p>
        </header>

        <div className="space-y-32">
          {/* Step 1 */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-heading font-black text-7xl md:text-9xl text-gray-100 leading-none">
                01
              </span>
              <h2 className="font-heading font-black text-4xl text-gray-900 tracking-tightest -mt-8 mb-6">
                Vault Encapsulation
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                When you create a "Drop," you aren't just sending money to an
                address. You are interacting with a **Sui Move Smart Contract**
                that creates a new, independent **Vault Object**.
              </p>
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <p className="text-xs font-black uppercase tracking-widest text-green-600 mb-2">
                  Technical Insight
                </p>
                <p className="text-sm text-gray-600 font-bold italic">
                  "Your SUI and NFTs are moved out of your wallet and wrapped
                  inside this object. The object holds the PIN hash, but no
                  one—not even the validators—can see the raw PIN."
                </p>
              </div>
            </div>
            <div className="bg-gray-900 h-80 rounded-[3rem] shadow-2xl flex items-center justify-center border border-white/5">
              <i className="fa-solid fa-cube text-7xl text-green-500 animate-pulse"></i>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-2">
              <span className="font-heading font-black text-7xl md:text-9xl text-gray-100 leading-none">
                02
              </span>
              <h2 className="font-heading font-black text-4xl text-gray-900 tracking-tightest -mt-8 mb-6">
                Conditional Ownership
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                The Vault Object exists on the blockchain with two "Keys." One
                key belongs to the **Recipient** (activated only by the PIN).
                The other key stays with **You** (the Sender).
              </p>
              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-2">
                  The Safety Net
                </p>
                <p className="text-sm text-blue-800 font-bold italic">
                  "As long as the package hasn't been claimed, you retain the
                  right to 'Recall' it. This instantly destroys the Vault and
                  returns 100% of the contents to your wallet."
                </p>
              </div>
            </div>
            <div className="bg-green-600 h-80 rounded-[3rem] shadow-2xl flex items-center justify-center lg:order-1">
              <i className="fa-solid fa-arrows-left-right text-7xl text-white"></i>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-heading font-black text-7xl md:text-9xl text-gray-100 leading-none">
                03
              </span>
              <h2 className="font-heading font-black text-4xl text-gray-900 tracking-tightest -mt-8 mb-6">
                Atomic Resolution
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                Once the recipient enters the correct PIN, the contract executes
                an **Atomic Swap**. In a single transaction block, the Vault is
                dissolved, and the assets are pushed into the recipient's
                wallet.
              </p>
              <div className="bg-yellow-50 p-6 rounded-3xl border border-yellow-100">
                <p className="text-xs font-black uppercase tracking-widest text-yellow-600 mb-2">
                  The Final Step
                </p>
                <p className="text-sm text-yellow-800 font-bold italic">
                  "After resolution, the object is 'deleted' from the global
                  state, ensuring no ghost data remains and the transaction is
                  finalized forever."
                </p>
              </div>
            </div>
            <div className="bg-gray-100 h-80 rounded-[3rem] flex items-center justify-center border border-gray-200">
              <i className="fa-solid fa-circle-check text-7xl text-gray-300"></i>
            </div>
          </section>
        </div>

        <div className="mt-40 text-center">
          <h3 className="font-heading font-black text-4xl mb-10">
            Ready to secure your first drop?
          </h3>
          <Link
            to="/dashboard"
            className="bg-gray-900 text-white px-12 py-5 rounded-4xl font-black text-xl shadow-2xl hover:bg-black transition transform hover:scale-105 active:scale-95 inline-block"
          >
            Launch Application
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
