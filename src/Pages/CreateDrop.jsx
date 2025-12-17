import React, { useState } from "react";
import { useCreateDrop } from "../hooks/useCreateDrop";
import { useNavigate } from "react-router-dom";

const CreateDrop = () => {
  const { createDrop } = useCreateDrop();
  const navigate = useNavigate();

  // Form States
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [pin, setPin] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCreate = () => {
    if (!amount || !recipient || !pin) {
      alert("Please fill in all fields");
      return;
    }

    if (pin.length < 4) {
      alert("PIN must be at least 4 digits");
      return;
    }

    setIsProcessing(true);

    createDrop({
      amount,
      recipient,
      pin,
      onSuccess: (digest) => {
        setIsProcessing(false);
        alert(`SecureDrop Created! \nTx ID: ${digest.slice(0, 10)}...`);
        // Redirect back to dashboard to see the new drop
        navigate("/"); 
      },
      onError: (err) => {
        setIsProcessing(false);
        console.error(err);
        alert("Failed to create drop. See console for details.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      
      {/* Back Button */}
      <div className="w-full max-w-md mb-4">
        <button 
          onClick={() => navigate("/")}
          className="text-gray-500 hover:text-gray-800 flex items-center gap-2"
        >
          <i className="fa-solid fa-arrow-left"></i> Back to Dashboard
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        
        {/* Header */}
        <div className="bg-green-600 p-6 text-white text-center">
          <i className="fa-solid fa-vault text-4xl mb-2"></i>
          <h1 className="text-2xl font-bold">Create Secure Drop</h1>
          <p className="opacity-90">Pack money & lock it with a PIN</p>
        </div>

        {/* Form */}
        <div className="p-8 space-y-6">
          
          {/* Input: Recipient */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Recipient Address</label>
            <input
              type="text"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none font-mono text-sm"
            />
          </div>

          {/* Input: Amount */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Amount (SUI)</label>
            <div className="relative">
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <span className="absolute right-4 top-3 text-gray-400 font-bold">SUI</span>
            </div>
          </div>

          {/* Input: PIN */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Secret PIN <span className="text-red-400 text-xs">(Don't lose this!)</span>
            </label>
            <div className="relative">
              <input
                type="text" 
                placeholder="****"
                maxLength="4"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-center text-2xl tracking-widest focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              You will need to share this PIN with the receiver.
            </p>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleCreate}
            disabled={isProcessing}
            className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all transform hover:scale-[1.02] shadow-lg
              ${isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <i className="fa-solid fa-circle-notch fa-spin"></i> Processing...
              </span>
            ) : (
              "Encrypt & Send"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDrop;