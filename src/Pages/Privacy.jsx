import React from "react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white pb-20 font-body text-gray-900 antialiased">
      <nav className="flex items-center px-5 md:px-16 py-6 w-full justify-between z-100 border-b border-gray-50 fixed top-0 bg-white/80 backdrop-blur-xl">
        <div className="flex gap-3 items-center">
          <div className="bg-green-600 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shadow-green-100">
            <i className="fa-solid fa-shield-cat text-white text-lg"></i>
          </div>
          <p className="font-heading font-black text-xl md:text-2xl tracking-tightest text-gray-900 leading-none">
            Data<span className="text-green-600">Privacy</span>
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

      <div className="max-w-5xl mx-auto px-5 md:px-16 pt-40">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full mb-8">
            <i className="fa-solid fa-check-circle text-green-600 text-xs"></i>
            <span className="text-[10px] font-black uppercase tracking-widest text-green-700">
              Zero-Tracking Policy
            </span>
          </div>
          <h1 className="font-heading font-black text-6xl md:text-9xl tracking-tightest leading-none mb-8 text-gray-900">
            Privacy.
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            We believe privacy is a fundamental human right. Here is how we
            handle (and don't handle) your data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 hover:border-gray-200 transition-colors duration-500">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl mb-8">
              <i className="fa-solid fa-link text-gray-900"></i>
            </div>
            <h3 className="font-heading font-black text-2xl mb-4">
              Public Data
            </h3>
            <p className="text-gray-500 leading-relaxed">
              SuiSecureDrop is a decentralized application. Any transaction you
              sign is broadcast to the public Sui blockchain. This includes your{" "}
              <span className="font-bold text-gray-900">Wallet Address</span>,{" "}
              <span className="font-bold text-gray-900">Drop Amounts</span>, and{" "}
              <span className="font-bold text-gray-900">Timestamps</span>. We
              cannot "delete" this data as it is immutable.
            </p>
          </div>

          <div className="bg-gray-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/10 blur-[80px] -mr-20 -mt-20 group-hover:bg-green-500/20 transition duration-700"></div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-2xl mb-8 backdrop-blur-md">
              <i className="fa-solid fa-user-secret text-green-400"></i>
            </div>
            <h3 className="font-heading font-black text-2xl mb-4 text-green-400">
              Private Data
            </h3>
            <p className="text-gray-300 leading-relaxed relative z-10">
              We do{" "}
              <span className="font-bold text-white underline decoration-green-500">
                NOT
              </span>{" "}
              collect IP addresses, use cookies, or track your session. Your PIN
              is hashed locally on your device before being sent to the network.
              We never see your raw PIN.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-20">
          <h4 className="font-heading font-black text-3xl mb-12 tracking-tightest">
            Data Collection Specifics
          </h4>
          <div className="space-y-8">
            {[
              {
                label: "Cookies",
                status: "Not Used",
                desc: "We do not store session cookies on your device.",
              },
              {
                label: "Analytics",
                status: "Anonymous",
                desc: "We use privacy-preserving, cookieless analytics to count page views.",
              },
              {
                label: "PIN Storage",
                status: "Client-Side Only",
                desc: "Your PIN is hashed (SHA256) in your browser memory and discarded immediately.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-gray-50 group hover:bg-gray-50/50 transition px-4 rounded-xl"
              >
                <div>
                  <p className="font-heading font-black text-xl text-gray-900">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-400 font-medium mt-1">
                    {item.desc}
                  </p>
                </div>
                <span className="mt-4 md:mt-0 bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest self-start md:self-center">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
