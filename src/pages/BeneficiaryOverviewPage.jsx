import React from 'react';
import { Wallet, ArrowUpRight, FileText, AlertTriangle, CheckCircle2, Clock, Layers, Sparkles } from 'lucide-react';

export default function BeneficiaryOverviewPage({ pools = [], transactions = [], onOpenUploadDrawer, onSelectTransaction }) {
  // Compute basic global telemetry numbers for metrics cards
  const totalAllocated = pools.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const totalSpent = pools.reduce((acc, curr) => acc + (curr.spent || 0), 0);
  const remainingBalance = totalAllocated - totalSpent;

  return (
    <div className="space-y-10 animate-fade-in font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_sans-serif]">
      
      {/* 🌟 PREMIUM APPLE-STYLE HEADER WELCOME SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-200/60 shadow-xs">
        <div className="space-y-1">
          <h1 className="text-xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-2">
            Maligayang Pagdating! 👋
          </h1>
          <p className="text-xs text-neutral-400">
            Narito ang real-time budget tracking ng inyong pamilya mula sa inyong OFW sender.
          </p>
        </div>
        
        {/* 📸 CTA Primary Action Button for Receipt Scanning */}
        <button
          onClick={onOpenUploadDrawer}
          className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all shadow-md shadow-blue-600/10 cursor-pointer active:scale-[0.98]"
        >
          <ArrowUpRight className="h-4 w-4" />
          <span>I-upload ang Bagong Resibo</span>
        </button>
      </div>

      {/* 📊 FINANCIAL TELEMETRY METRICS GRID LAYER */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        {/* Card 1: Kabuuang Pondo */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200/70 shadow-xs hover:shadow-md hover:border-neutral-300 transition-all duration-300 flex items-center justify-between group">
          <div className="space-y-2">
            <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Kabuuang Pondo</p>
            <h3 className="text-2xl font-black text-neutral-900 tracking-tight">₱{totalAllocated.toLocaleString()}</h3>
          </div>
          <div className="bg-blue-50/60 text-blue-600 p-3 rounded-2xl group-hover:scale-105 transition-transform duration-300">
            <Wallet className="h-5 w-5" />
          </div>
        </div>
        
        {/* Card 2: Natitirang Pera */}
        <div className="bg-gradient-to-br from-white to-emerald-50/20 p-6 rounded-2xl border border-emerald-100 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex items-center justify-between group">
          <div className="space-y-2">
            <p className="text-[11px] font-bold text-emerald-700/70 uppercase tracking-widest">Natitirang Pera</p>
            <h3 className="text-2xl font-black text-emerald-600 tracking-tight">₱{remainingBalance.toLocaleString()}</h3>
          </div>
          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl group-hover:scale-105 transition-transform duration-300">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>

        {/* Card 3: Gastos na Nagamit */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200/70 shadow-xs hover:shadow-md hover:border-neutral-300 transition-all duration-300 flex items-center justify-between group">
          <div className="space-y-2">
            <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Gastos na Nagamit</p>
            <h3 className="text-2xl font-black text-neutral-900 tracking-tight">₱{totalSpent.toLocaleString()}</h3>
          </div>
          <div className="bg-orange-50/60 text-orange-600 p-3 rounded-2xl group-hover:scale-105 transition-transform duration-300">
            <FileText className="h-5 w-5" />
          </div>
        </div>

      </div>

      {/* 🗂️ MID SECTION: ACTIVE BUDGET ALLOCATION POOLS TRACKERS */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
          <h2 className="text-xs font-bold tracking-widest text-neutral-400 uppercase flex items-center gap-2">
            <Layers className="h-4 w-4 text-neutral-400" /> Mga Nakalaang Budget Pools
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pools.length === 0 ? (
            <div className="col-span-full bg-white border border-dashed border-neutral-200 p-8 rounded-2xl text-center text-sm text-neutral-400 font-medium">
              Walang nakalaang budget pools sa kasalukuyan.
            </div>
          ) : (
            pools.map((pool) => {
              const usagePercentage = pool.total > 0 ? Math.round((pool.spent / pool.total) * 100) : 0;
              return (
                <div 
                  key={pool.id} 
                  className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-5 flex flex-col justify-between space-y-5 hover:border-neutral-300 hover:shadow-xs transition-all duration-200"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="bg-blue-50 text-blue-600 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {pool.category || 'General'}
                      </span>
                      <Layers className="h-4 w-4 text-neutral-300" />
                    </div>
                    <h4 className="text-base font-bold text-neutral-900 leading-tight line-clamp-1">{pool.name}</h4>
                  </div>
                  
                  {/* Smart Apple-Style Progress Bar */}
                  <div className="space-y-2">
                    <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                          usagePercentage >= 90 ? 'bg-red-500' : 
                          usagePercentage >= 75 ? 'bg-amber-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-neutral-400 font-medium">
                        Nagamit: <span className="text-neutral-800 font-bold">₱{pool.spent.toLocaleString()}</span>
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
                        usagePercentage >= 90 ? 'text-red-600 bg-red-50' : 
                        usagePercentage >= 75 ? 'text-amber-600 bg-amber-50' : 'text-blue-600 bg-blue-50'
                      }`}>
                        {usagePercentage}% Used
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* 🧾 LOWER SECTION: FAMILY FINANCIAL AUDIT LEDGER AREA */}
      <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-neutral-100">
          <h2 className="text-xs font-bold tracking-widest text-neutral-400 uppercase flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-neutral-400" /> Kamakailang mga Gastos at Transaksyon
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-neutral-50/70 text-neutral-400 font-bold text-xs uppercase tracking-wider border-b border-neutral-100">
                <th className="p-4 pl-6">ID Transaksyon</th>
                <th className="p-4">Pinagbilhan (Merchant)</th>
                <th className="p-4">Kategoryang Pool</th>
                <th className="p-4">Halaga</th>
                <th className="p-4 pr-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-medium text-neutral-700">
              {transactions.map((tx) => (
                <tr 
                  key={tx.id} 
                  onClick={() => onSelectTransaction && onSelectTransaction(tx.id)}
                  className="hover:bg-neutral-50/70 transition-colors cursor-pointer group"
                >
                  <td className="p-4 pl-6 font-mono text-xs text-neutral-400 group-hover:text-blue-600 transition-colors">
                    {tx.id}
                  </td>
                  <td className="p-4 text-neutral-900 font-semibold">{tx.merchant}</td>
                  <td className="p-4 text-xs text-neutral-400">{tx.pool}</td>
                  <td className="p-4 font-bold text-neutral-900">₱{tx.amount.toLocaleString()}</td>
                  <td className="p-4 pr-6">
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-tight ${
                      tx.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' :
                      tx.status === 'Flagged' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {tx.status === 'Approved' && <CheckCircle2 className="h-3 w-3" />}
                      {tx.status === 'Flagged' && <AlertTriangle className="h-3 w-3" />}
                      {tx.status === 'Pending' && <Clock className="h-3 w-3" />}
                      <span>{tx.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}