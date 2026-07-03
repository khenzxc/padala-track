import React, { useState } from 'react';
import { Users, Link2Off, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ProfileView({ userRole, setIsLinked }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDisconnect = () => {
    // 1. Dito sa totoong app, magse-send ng API request para burahin ang link sa DB
    // 2. Para sa Frontend muna: I-reset ang state pabalik sa false
    setIsLinked(false); 
    setShowConfirmModal(false);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto font-sans">
      
      {/* Kasalukuyang Account Info Card (Sample) */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs">
        <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4">Account Settings</h3>
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {userRole === 'ofw' ? 'JD' : 'MD'}
          </div>
          <div>
            <h4 className="font-bold text-neutral-900">{userRole === 'ofw' ? 'Juan Dela Cruz' : 'Maria Dela Cruz'}</h4>
            <p className="text-xs text-neutral-500 capitalize">Role: {userRole === 'ofw' ? 'Sender (OFW)' : 'Beneficiary'}</p>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* CONNECTED FAMILY / MANAGEMENT SECTION                             */}
      {/* ----------------------------------------------------------------- */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-neutral-400" />
            <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wider">Household Connection</h3>
          </div>
          <span className="inline-flex items-center text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-100">
            <ShieldCheck className="h-3.5 w-3.5 mr-1" /> Active
          </span>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-sm font-bold text-neutral-900">
              {userRole === 'ofw' ? 'Konektado kay: Maria (Asawa)' : 'Konektado kay: Juan (OFW)'}
            </p>
            <p className="text-xs text-neutral-400 mt-0.5">Synced via Code: <span className="font-mono font-bold text-blue-600">PADALA-X7R9</span></p>
          </div>

          {/* BUTTON PARA MAG-DISCONNECT / MAGPALIT */}
          <button
            onClick={() => setShowConfirmModal(true)}
            className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-xl transition flex items-center space-x-1.5 cursor-pointer border border-red-200"
          >
            <Link2Off className="h-3.5 w-3.5" />
            <span>{userRole === 'ofw' ? 'Change Beneficiary' : 'Disconnect OFW'}</span>
          </button>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* CONFIRMATION DANGER MODAL                                         */}
      {/* ----------------------------------------------------------------- */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 border border-neutral-200 shadow-2xl animate-scale-in">
            <div className="mx-auto bg-red-50 text-red-600 p-3 rounded-2xl w-fit">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-extrabold text-neutral-900">Sigurado ka ba?</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Kapag pinutol mo ang koneksyon, permanenteng mawawala ang access ng kasalukuyang pamilya sa iyong mga active budget pools at ledger.
              </p>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 border border-neutral-200 text-neutral-600 font-semibold text-xs rounded-xl cursor-pointer"
              >
                I-cancel
              </button>
              <button
                type="button"
                onClick={handleDisconnect}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm"
              >
                Oo, Putulin ang Link
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}