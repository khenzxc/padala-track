import React from 'react';
import { Layers, TrendingUp, PieChart, ShieldAlert } from 'lucide-react';

export default function BudgetPoolsPage({ pools }) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* POOLS PERFORMANCE HIGHLIGHTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-neutral-200 p-4 rounded-xl flex items-center space-x-4">
          <div className="p-2 bg-neutral-100 text-neutral-700 rounded-lg"><Layers className="h-5 w-5" /></div>
          <div>
            <p className="text-xs font-medium text-neutral-400">Total Active Pools</p>
            <p className="text-lg font-bold text-neutral-900">{pools.length}</p>
          </div>
        </div>
        <div className="bg-white border border-neutral-200 p-4 rounded-xl flex items-center space-x-4">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><TrendingUp className="h-5 w-5" /></div>
          <div>
            <p className="text-xs font-medium text-neutral-400">Highest Budget</p>
            <p className="text-lg font-bold text-neutral-900">₱{Math.max(...pools.map(p => p.total)).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* CORE BUDGET POOLS GRID */}
      <div className="space-y-4">
        <h2 className="text-sm font-extrabold tracking-wider text-neutral-400 uppercase">All Financial Budget Pools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pools.map((pool) => {
            const balance = pool.total - pool.spent;
            return (
              <div key={pool.id} className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col justify-between space-y-6 shadow-xs hover:border-neutral-300 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                      {pool.category}
                    </span>
                    <h3 className="text-lg font-bold text-neutral-900 mt-2.5 tracking-tight">{pool.name}</h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-neutral-100">
                    <div>
                      <p className="text-neutral-400 font-medium mb-0.5">Total Cap</p>
                      <p className="font-extrabold text-neutral-900 text-base">₱{pool.total.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-neutral-400 font-medium mb-0.5">Remaining Float</p>
                      <p className={`font-extrabold text-base ${balance < 5000 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        ₱{balance.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}