import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Layers, ArrowRight, TrendingUp } from 'lucide-react';

export default function OverviewPage({ pools = [], transactions = [], setActiveTab }) {
  // 🎛️ DYNAMIC MATHEMATICS CALCULATIONS (Tinatanggal ang hardcoded static values)
  const totalAllocated = pools.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const totalSpent = pools.reduce((acc, curr) => acc + (curr.spent || 0), 0);
  
  // Halimbawa ng static buffer para sa "Total Remitted" base sa iyong lumang code (₱230,000)
  const totalRemitted = Math.max(230000, totalAllocated); 
  const unallocatedFloat = totalRemitted - totalAllocated;

  return (
    <div className="space-y-10 animate-fade-in font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_sans-serif]">
      
      {/* 🌟 PREMIUM HEADER WELCOME SECTION */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 bg-white p-6 rounded-2xl border border-neutral-200/60 shadow-xs">
        <div>
          <h1 className="text-xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-2">
             Remittance Overview
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Subaybayan ang real-time deployment, budget pools allocation, at unallocated crypto-float liquidity.
          </p>
        </div>
        <div className="text-xs font-bold text-neutral-500 bg-neutral-50 px-3.5 py-2 border border-neutral-200/50 rounded-xl w-fit">
          Status: <span className="text-emerald-600">● Live on Ledger</span>
        </div>
      </div>

      {/* 📊 METRICS GRID LAYER */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        {/* Card 1: Total Remitted */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200/70 shadow-xs hover:shadow-md hover:border-neutral-300 transition-all duration-300 flex items-center justify-between group">
          <div className="space-y-2">
            <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Total Remitted</p>
            <h3 className="text-2xl font-black text-neutral-900 tracking-tight">
              ₱{totalRemitted.toLocaleString()}
            </h3>
          </div>
          <div className="bg-blue-50/60 text-blue-600 p-3 rounded-2xl group-hover:scale-105 transition-transform duration-300">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>

        {/* Card 2: Total Disbursed */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200/70 shadow-xs hover:shadow-md hover:border-neutral-300 transition-all duration-300 flex items-center justify-between group">
          <div className="space-y-2">
            <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Total Disbursed</p>
            <h3 className="text-2xl font-black text-neutral-900 tracking-tight">
              ₱{totalSpent.toLocaleString()}
            </h3>
          </div>
          <div className="bg-orange-50/60 text-orange-600 p-3 rounded-2xl group-hover:scale-105 transition-transform duration-300">
            <ArrowDownLeft className="h-5 w-5" />
          </div>
        </div>

        {/* Card 3: Unallocated Float */}
        <div className="bg-gradient-to-br from-white to-emerald-50/20 p-6 rounded-2xl border border-emerald-100 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex items-center justify-between group">
          <div className="space-y-2">
            <p className="text-[11px] font-bold text-emerald-700/70 uppercase tracking-widest">Unallocated Float</p>
            <h3 className="text-2xl font-black text-emerald-600 tracking-tight">
              ₱{unallocatedFloat.toLocaleString()}
            </h3>
          </div>
          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl group-hover:scale-105 transition-transform duration-300">
            <Wallet className="h-5 w-5" />
          </div>
        </div>
        
      </section>

      {/* 🗂️ QUICK ACTIVE ALLOCATIONS POOLS */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
          <h2 className="text-xs font-bold tracking-widest text-neutral-400 uppercase flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-neutral-400" /> Active Pools Deployment
          </h2>
          <button 
            onClick={() => setActiveTab('pools')} 
            className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline transition flex items-center space-x-1 cursor-pointer"
          >
            <span>Manage All Pools</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        
        {/* POOLS GRAPHIC TRACKERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pools.length === 0 ? (
            <div className="col-span-full bg-white border border-dashed border-neutral-200 p-8 rounded-2xl text-center text-sm text-neutral-400 font-medium">
              Walang aktibong budget allocation pools sa kasalukuyan.
            </div>
          ) : (
            pools.slice(0, 3).map((pool) => {
              const allocationPercent = pool.total > 0 ? Math.round((pool.spent / pool.total) * 100) : 0;
              
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
                    <h3 className="text-base font-bold text-neutral-900 leading-tight line-clamp-1">{pool.name}</h3>
                  </div>

                  {/* Smart Progress Bar Indicator */}
                  <div className="space-y-2">
                    <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                          allocationPercent >= 90 ? 'bg-red-500' : 
                          allocationPercent >= 75 ? 'bg-amber-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${Math.min(allocationPercent, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-neutral-400 font-medium">
                        Spent: <span className="text-neutral-800 font-bold">₱{pool.spent.toLocaleString()}</span>
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
                        allocationPercent >= 90 ? 'text-red-600 bg-red-50' : 
                        allocationPercent >= 75 ? 'text-amber-600 bg-amber-50' : 'text-blue-600 bg-blue-50'
                      }`}>
                        {allocationPercent}% Used
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

    </div>
  );
}