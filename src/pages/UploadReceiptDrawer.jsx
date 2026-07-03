import React, { useState } from 'react';
import { X, Camera, Store, Coins, HelpCircle } from 'lucide-react';

export default function UploadReceiptDrawer({ isOpen, onClose, pools, onUploadReceipt }) {
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedPool, setSelectedPool] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!merchant || !amount || !selectedPool) return;

    onUploadReceipt({
      merchant,
      amount: parseFloat(amount),
      pool: selectedPool
    });

    // Reset fields and close panel drawer
    setMerchant('');
    setAmount('');
    setSelectedPool('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_sans-serif]">
      {/* Smooth Dark Blurred Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Sliding Sheet Panel Content */}
      <div className="w-full max-w-[460px] bg-white h-screen relative shadow-2xl flex flex-col justify-between z-10 border-l border-neutral-200 animate-slide-in">
        
        {/* Upper Fixed Header Configuration */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-neutral-900 tracking-tight">I-upload ang Resibo</h3>
            <p className="text-xs text-neutral-400 mt-0.5">I-sync ang nagastos na pondo sa cryptographic ledger.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-full text-neutral-400 hover:text-neutral-600 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Center Form Container */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 text-left">
          
          {/* Mock Camera Upload Interactive Placeholder */}
          <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-neutral-50/50 hover:bg-neutral-50 transition cursor-pointer group">
            <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-xs mb-3 group-hover:scale-105 transition-transform">
              <Camera className="h-5 w-5" />
            </div>
            <p className="text-sm font-bold text-neutral-800">Kununan o Pumili ng Larawan</p>
            <p className="text-xs text-neutral-400 mt-1">Sinusuportahan ang PNG, JPG na may OCR scanning filter</p>
          </div>

          {/* Input Control: Merchant Store Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider pl-0.5">Pangalan ng Tindahan (Merchant)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-neutral-400"><Store className="h-4 w-4" /></span>
              <input 
                type="text" 
                required
                placeholder="Hal. SM Supermarket, Mercury Drug"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-neutral-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Input Control: Amount Expense */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider pl-0.5">Kabuuang Halaga (Amount)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-neutral-400"><Coins className="h-4 w-4" /></span>
              <input 
                type="number" 
                required
                min="1"
                step="any"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-neutral-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Input Control: Linked Target Budget Pool */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider pl-0.5">I-konekta sa Budget Pool</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-neutral-400"><HelpCircle className="h-4 w-4" /></span>
              <select
                required
                value={selectedPool}
                onChange={(e) => setSelectedPool(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-neutral-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled hidden>Pumili ng nakalaang pondo...</option>
                {pools.map(p => (
                  <option key={p.id} value={p.name}>{p.name} (Natitira: ₱{(p.total - p.spent).toLocaleString()})</option>
                ))}
              </select>
            </div>
          </div>

        </form>

        {/* Lower Fixed Drawer Action Sheet Footer */}
        <div className="p-6 border-t border-neutral-100 bg-neutral-50/50 flex space-x-3">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 bg-white border border-neutral-200 text-neutral-700 font-bold py-3.5 rounded-xl text-sm transition hover:bg-neutral-50 cursor-pointer active:scale-[0.99]"
          >
            I-cancel
          </button>
          <button 
            onClick={handleSubmit}
            type="submit"
            className="flex-1 bg-blue-600 text-white font-bold py-3.5 rounded-xl text-sm transition hover:bg-blue-700 shadow-md shadow-blue-600/10 cursor-pointer active:scale-[0.99]"
          >
            I-save ang Resibo
          </button>
        </div>

      </div>
    </div>
  );
}