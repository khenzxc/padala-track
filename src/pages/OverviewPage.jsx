import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Layers, ArrowRight } from 'lucide-react';

export default function OverviewPage({ pools, transactions, setActiveTab }) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* BALANCE METRICS CARDS ROW */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Total Remitted</p>
            <h3 className="text-2xl font-extrabold text-neutral-900">₱230,000</h3>
          </div>
          <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Total Disbursed</p>
            <h3 className="text-2xl font-extrabold text-neutral-900">₱122,500</h3>
          </div>
          <div className="bg-orange-50 text-orange-600 p-2.5 rounded-xl">
            <ArrowDownLeft className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Unallocated Float</p>
            <h3 className="text-2xl font-extrabold text-emerald-600">₱107,500</h3>
          </div>
          <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl">
            <Wallet className="h-5 w-5" />
          </div>
        </div>
      </section>

      {/* QUICK ACTIVE ALLOCATIONS */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-extrabold tracking-wider text-neutral-400 uppercase">Active Allocations Summary</h2>
          <button 
            onClick={() => setActiveTab('pools')} 
            className="text-xs font-bold text-blue-600 hover:text-blue-700 transition flex items-center space-x-1 cursor-pointer"
          >
            <span>View All Pools</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pools.slice(0, 3).map((pool) => {
            const allocationPercent = pool.total > 0 ? Math.round((pool.spent / pool.total) * 100) : 0;
            return (
              <div key={pool.id} className="bg-white rounded-2xl border border-neutral-200 shadow-xs p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="bg-neutral-100 text-neutral-500 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {pool.category}
                    </span>
                    <Layers className="h-4 w-4 text-neutral-300" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 leading-snug">{pool.name}</h3>
                </div>

                <div className="space-y-2">
                  <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${allocationPercent > 80 ? 'bg-amber-500' : 'bg-blue-600'}`}
                      style={{ width: `${Math.min(allocationPercent, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-neutral-500">Spent: ₱{pool.spent.toLocaleString()}</span>
                    <span className="text-neutral-900">{allocationPercent}% Used</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}