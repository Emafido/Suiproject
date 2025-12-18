import React, { useState } from "react";
import { useCreateDrop } from "../hooks/useCreateDrop";
import { useMyInventory } from "../hooks/useMyInventory"; 
import { useNavigate } from "react-router-dom";

const CreateDrop = () => {
  const { createDrop } = useCreateDrop();
  const { items: myItems } = useMyInventory(); // Fetch your swords
  const navigate = useNavigate();

  // Form States
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [pin, setPin] = useState("");
  
  // This initializes as an empty array, so it is never undefined
  const [selectedItems, setSelectedItems] = useState([]); 
  
  const [isProcessing, setIsProcessing] = useState(false);

  // Logic to handle checking/unchecking items
  const toggleItem = (objectId) => {
    if (selectedItems.includes(objectId)) {
      // Uncheck
      setSelectedItems(selectedItems.filter(id => id !== objectId));
    } else {
      // Check (with limit)
      if (selectedItems.length >= 2) {
        alert("You can only select up to 2 items!");
        return;
      }
      setSelectedItems([...selectedItems, objectId]);
    }
  };

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
      selectedItems, // <--- CRITICAL: Passing the array to the hook
      onSuccess: (digest) => {
        setIsProcessing(false);
        alert(`SecureDrop Created with ${selectedItems.length} items!`);
        navigate("/dashboard"); 
      },
      onError: (err) => {
        setIsProcessing(false);
        alert("Failed. Check console for details.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      
      {/* Back Button */}
      <div className="w-full max-w-md mb-4">
        <button onClick={() => navigate("/dashboard")} className="text-gray-500 hover:text-gray-800 flex items-center gap-2">
          <i className="fa-solid fa-arrow-left"></i> Back to Dashboard
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        
        {/* Header */}
        <div className="bg-green-600 p-6 text-white text-center">
          <i className="fa-solid fa-gift text-4xl mb-2"></i>
          <h1 className="text-2xl font-bold">Create Care Package</h1>
          <p className="opacity-90">Send Cash + Up to 2 Items</p>
        </div>

        {/* Form */}
        <div className="p-8 space-y-6">
          
          {/* Recipient Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Recipient Address</label>
            <input
              type="text"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500 font-mono text-sm"
            />
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Amount (SUI)</label>
            <div className="relative">
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 pr-12 outline-none focus:ring-2 focus:ring-green-500"
              />
              <span className="absolute right-4 top-3 text-gray-400 font-bold">SUI</span>
            </div>
          </div>

          {/* Item Selector (The New Part) */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Select Items <span className="text-gray-400 font-normal">({selectedItems.length}/2)</span>
            </label>
            
            {!myItems || myItems.length === 0 ? (
                <div className="p-3 bg-gray-100 rounded-lg text-center text-sm text-gray-500">
                    You have no items to send. Mint one on the Dashboard!
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1">
                    {myItems.map(item => (
                        <div 
                            key={item.data.objectId}
                            onClick={() => toggleItem(item.data.objectId)}
                            className={`cursor-pointer p-2 rounded-lg border text-sm flex items-center gap-2 transition select-none ${
                                selectedItems.includes(item.data.objectId) 
                                ? "bg-green-50 border-green-500 ring-1 ring-green-500" 
                                : "bg-white border-gray-200 hover:bg-gray-50"
                            }`}
                        >
                            <span>⚔️</span>
                            <span className="truncate font-medium text-gray-700">
                                {item.data.content?.fields?.name || "Game Item"}
                            </span>
                        </div>
                    ))}
                </div>
            )}
          </div>

          {/* PIN Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Secret PIN</label>
            <input
              type="text"
              placeholder="****"
              maxLength="4"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-center text-2xl tracking-widest outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleCreate}
            disabled={isProcessing}
            className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition transform hover:scale-[1.02]
              ${isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
          >
            {isProcessing ? "Packing Box..." : "Encrypt & Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDrop;