import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function AuditRegistryPage({ transactions }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(tx => 
    tx.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.pool.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* RISK ASSESSMENT BANNER WIDGET */}
      <div className="bg-linear-to-r from-neutral-900 to-neutral-800 text-white p-5 rounded-2xl flex items-center justify-between shadow-xs">
        <div className="space-y-1">
          <h3 className="text-base font-bold flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            Automated Ledger Scanning Active
          </h3>
          <p className="text-xs text-neutral-300 max-w-xl">
            Our system real-time audit engine inspects document structural hashes and metadata triggers to block unverified claims instantly.
          </p>
        </div>
      </div>

      {/* FILTER CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-sm font-extrabold tracking-wider text-neutral-400 uppercase">Live Audit Ledger</h2>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input 
            type="text" 
            placeholder="Search reference ID, merchant, pool..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
        </div>
      </div>

      {/* DATA TABLE CONTAINER */}
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-neutral-50/70 border-b border-neutral-200 text-neutral-400 font-bold uppercase text-[11px] tracking-wider">
                <th className="px-5 py-4">Reference ID</th>
                <th className="px-5 py-4">Merchant / Record Date</th>
                <th className="px-5 py-4">Budget Pool Target</th>
                <th className="px-5 py-4">Gross Amount</th>
                <th className="px-5 py-4 text-right">Diagnostic Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-medium text-neutral-600">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-neutral-50/40 transition-colors">
                    <td className="px-5 py-4 font-mono text-neutral-900 font-bold text-xs">{tx.id}</td>
                    <td className="px-5 py-4">
                      <div>
                        <div className="text-neutral-900 font-bold text-sm">{tx.merchant}</div>
                        <div className="text-[11px] text-neutral-400 font-normal mt-0.5">{tx.date}</div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs font-semibold text-neutral-500">{tx.pool}</td>
                    <td className="px-5 py-4 text-neutral-900 font-bold">₱{tx.amount.toLocaleString()}</td>
                    <td className="px-5 py-4 text-right">
                      {tx.status === 'Approved' && (
                        <span className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-emerald-200/50">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Verified Clean</span>
                        </span>
                      )}
                      {tx.status === 'Pending Audit' && (
                        <span className="inline-flex items-center space-x-1.5 bg-neutral-50 text-neutral-500 px-2.5 py-1 rounded-lg text-xs font-bold border border-neutral-200">
                          <Clock className="h-3.5 w-3.5 text-neutral-400" />
                          <span>Running ML</span>
                        </span>
                      )}
                      {tx.status === 'Flagged' && (
                        <div className="inline-flex flex-col items-end space-y-1">
                          <span className="inline-flex items-center space-x-1.5 bg-rose-50 text-rose-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-rose-200/60">
                            <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
                            <span>Audit Alert</span>
                          </span>
                          <span className="text-[10px] text-rose-600 font-semibold tracking-tight">{tx.riskReason}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-5 py-10 text-center text-xs text-neutral-400 font-medium">
                    No records found matching specified filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}