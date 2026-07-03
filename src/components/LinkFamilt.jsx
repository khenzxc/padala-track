import React, { useState } from 'react';
import { ShieldCheck, Copy, Check, ArrowRight } from 'lucide-react';

export default function LinkFamily({ userRole, onVerificationSuccess }) {
  // Simulating states for frontend demo
  const [generatedCode, setGeneratedCode] = useState('PADALA-X7R9');
  const [copied, setCopied] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. Para sa OFW: Copy Code to Clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset icon after 2s
  };

  // 2. Para sa Beneficiary: I-verify ang tinipang code
  const handleConnect = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    setLoading(true);
    setError('');

    // Simulated API Request (Frontend Demo)
    setTimeout(() => {
      if (inputCode.toUpperCase() === 'PADALA-X7R9') {
        setLoading(false);
        onVerificationSuccess(); // Lalatag na ang Dashboard view
      } else {
        setLoading(false);
        setError('Maling Code. Paki-check ang spacing o letters sa OFW mo.');
      }
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl p-6 shadow-xl border border-neutral-200 font-sans">
      <div className="flex flex-col items-center text-center space-y-4">
        
        {/* Icon Header */}
        <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl">
          <ShieldCheck className="h-6 w-6" />
        </div>

        <h2 className="text-xl font-bold text-neutral-900">
          {userRole === 'ofw' ? 'Ikonekta ang Pamilya' : 'I-link ang OFW Account'}
        </h2>
        
        <p className="text-sm text-neutral-500 max-w-xs">
          {userRole === 'ofw' 
            ? 'I-share ang code na ito sa iyong pamilya sa Pilipinas para makita nila ang budget pools.' 
            : 'Ilagay ang 11-character code na isend ng iyong kapamilyang OFW.'}
        </p>

        <hr className="w-full border-neutral-100" />

        {/* ----------------- VIEW KUNG OFW (SENDER) ----------------- */}
        {userRole === 'ofw' && (
          <div className="w-full space-y-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Your Family Code</span>
                <p className="text-lg font-mono font-bold text-blue-600 tracking-wide">{generatedCode}</p>
              </div>
              <button 
                onClick={handleCopy}
                className="p-3 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-xl transition active:scale-95 cursor-pointer"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-neutral-500" />}
              </button>
            </div>
            
            {copied && (
              <p className="text-xs text-emerald-600 font-semibold animate-fadeIn">
                Copied to clipboard! I-send mo na ito sa Messenger.
              </p>
            )}
          </div>
        )}

        {/* ----------- VIEW KUNG BENEFICIARY (FAMILY) ----------- */}
        {userRole === 'beneficiary' && (
          <form onSubmit={handleConnect} className="w-full space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-neutral-600 px-1">Enter Invitation Code</label>
              <input 
                type="text"
                placeholder="e.g. PADALA-X7R9"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl text-center font-mono text-base font-bold uppercase tracking-wider focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 font-medium bg-red-50 py-2 rounded-xl">
                {error}
              </p>
            )}

            <button 
              type="submit"
              disabled={loading || !inputCode}
              className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-2xl shadow-lg transition active:scale-98 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{loading ? 'Verifying Code...' : 'Connect to Ledger'}</span>
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}