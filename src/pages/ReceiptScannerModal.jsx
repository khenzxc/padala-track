import React, { useState } from 'react';

export default function ReceiptScannerModal({ isOpen, onClose, onUploadSuccess }) {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('Groceries');
  const [notes, setNotes] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!isOpen) return null;

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      // Dito pwedeng i-lock na direkta sa camera para iwas-edit (capture="environment")
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    // Simulating AI-Assisted Transparency verification
    setTimeout(() => {
      setIsAnalyzing(false);
      alert("AI Verification Success: Receipt data extracted and verified!");
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
        <h2 className="text-xl font-bold text-neutral-800 mb-2">I-ulat ang Gastos</h2>
        <p className="text-sm text-neutral-500 mb-4">Mag-kumuha ng malinaw na larawan ng resibo para sa awtomatikong AI verification.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* In-App Camera / Upload Interface */}
          <div className="border-2 border-dashed border-neutral-300 rounded-xl p-4 text-center bg-neutral-50">
            {image ? (
              <img src={image} alt="Receipt Preview" className="max-h-48 mx-auto rounded-lg mb-2" />
            ) : (
              <label className="cursor-pointer block py-6">
                <span className="text-sm text-red-600 font-semibold block">📸 Kumuha ng Larawan</span>
                <span className="text-xs text-neutral-400">Direktang kuha gamit ang camera para sa integridad</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  className="hidden" 
                  onChange={handleCapture} 
                  required 
                />
              </label>
            )}
          </div>

          {/* Constructive Communication Notes */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Para saan ito? (Notes)</label>
            <textarea 
              className="w-full p-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Hal. Pang-matrikula ni Bunso o Pang-grocery ngayong buwan..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              required
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-3 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-600 hover:bg-neutral-50"
            >
              Kanselahin
            </button>
            <button 
              type="submit" 
              disabled={isAnalyzing}
              className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium shadow-sm transition disabled:bg-neutral-400"
            >
              {isAnalyzing ? 'Sinusuri ng AI...' : 'Ipadala ang Ulat'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}