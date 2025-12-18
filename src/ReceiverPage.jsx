import React, { useState } from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';

export default function ReceiverPage() {
  const account = useCurrentAccount();
  const [pin, setPin] = useState('');

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">📥 Receiver Inbox</h2>
      
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <p className="text-gray-400 mb-4">
          Looking for drops sent to: <span className="text-white font-mono">{account?.address}</span>
        </p>

        {/* We will map through real drops here later */}
        <div className="p-4 bg-gray-700 rounded-lg text-center text-gray-300">
          Scanning the blockchain for your gifts... 🔍
        </div>
      </div>
    </div>
  );
}