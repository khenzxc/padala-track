import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Layers, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Search, 
  Bell,
  ArrowRight
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const [pools] = useState([
    { id: 1, name: 'House Construction', total: 150000, spent: 67500, category: 'Infrastructure' },
    { id: 2, name: 'Monthly Groceries & Utilities', total: 35000, spent: 12000, category: 'Household' },
    { id: 3, name: 'Tuition & School Supplies', total: 45000, spent: 41000, category: 'Education' }
  ]);

  const [transactions] = useState([
    { id: 'TX-1024', merchant: 'Alpha Hardware Supply', pool: 'House Construction', amount: 24500, date: 'June 28, 2026', status: 'Flagged', riskReason: 'Canva Metadata Detected' },
    { id: 'TX-1023', merchant: 'Puregold Supermarket', pool: 'Monthly Groceries', amount: 8450, date: 'June 25, 2026', status: 'Approved' },
    { id: 'TX-1022', merchant: 'National Book Store', pool: 'Tuition & Supplies', amount: 3200, date: 'June 20, 2026', status: 'Approved' },
    { id: 'TX-1021', merchant: 'Beta Steel Manufacturing', pool: 'House Construction', amount: 43000, date: 'June 18, 2026', status: 'Pending Audit' }
  ]);

  return (
    /* 1. FIXED VIEWPORT LAYOUT WRAPPER */
    <div className="h-screen w-screen bg-neutral-50 flex overflow-hidden text-neutral-900 antialiased font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_sans-serif]">
      
      {/* 🛠️ FIX: Ito lang dapat ang nasa kaliwa. Siya na mismo ang may 'w-64' sa desktop at magiging bottom bar sa mobile. */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. MAIN WORKSPACE ENGINE AREA */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        
        {/* RUNTIME TOP BAR NAVBAR */}
        <header className="bg-white border-b border-neutral-200 h-16 flex-none px-6 flex items-center justify-between z-20">
          <div>
            <h1 className="text-xl font-extrabold text-neutral-900 tracking-tight capitalize">
              {activeTab === 'overview' ? 'Financial Hub' : `${activeTab} Management`}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-neutral-400 hover:text-neutral-600 transition">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-blue-500 rounded-full ring-2 ring-white" />
            </button>
            
            <button className="inline-flex items-center space-x-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold px-4 py-2.5 rounded-xl shadow-xs text-sm transition active:scale-98">
              <Plus className="h-4 w-4" />
              <span>Create Pool</span>
            </button>
          </div>
        </header>

        {/* 3. ISOLATED INNER SCROLL VIEWPORT */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8 max-w-6xl w-full mx-auto pb-24 md:pb-16">
          
          {/* TAB 1: OVERVIEW SCREEN */}
          {activeTab === 'overview' && (
            <>
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

              {/* ALLOCATION POOLS TRACKER CARDS */}
              <section className="space-y-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-base font-extrabold tracking-tight text-neutral-800 uppercase">Active Allocations</h2>
                  <button onClick={() => setActiveTab('pools')} className="text-xs font-bold text-blue-600 hover:text-blue-700 transition flex items-center space-x-1">
                    <span>Manage Pools</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {pools.map((pool) => {
                    const allocationPercent = Math.round((pool.spent / pool.total) * 100);
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
                              style={{ width: `${allocationPercent}%` }}
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
            </>
          )}

          {/* TAB 2: BUDGET POOLS INDEPENDENT VIEW */}
          {activeTab === 'pools' && (
            <section className="space-y-4">
              <h2 className="text-base font-extrabold tracking-tight text-neutral-800 uppercase">All Budget Pools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {pools.map((pool) => (
                  <div key={pool.id} className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase">{pool.category}</span>
                        <h3 className="text-lg font-bold text-neutral-900 mt-2">{pool.name}</h3>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-neutral-100 text-sm">
                      <div>
                        <p className="text-xs text-neutral-400 font-medium">Total Budget</p>
                        <p className="font-bold text-neutral-900 text-base">₱{pool.total.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-400 font-medium">Remaining</p>
                        <p className="font-bold text-emerald-600 text-base">₱{(pool.total - pool.spent).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TAB 3 & OVERVIEW: REAL-TIME SYSTEM REGISTRY TABLE */}
          {(activeTab === 'overview' || activeTab === 'audit') && (
            <section className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h2 className="text-base font-extrabold tracking-tight text-neutral-800 uppercase">Live Audit Registry</h2>
                
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                  <input 
                    type="text" 
                    placeholder="Filter records..."
                    className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-neutral-50/70 border-b border-neutral-200 text-neutral-400 font-bold uppercase text-[11px] tracking-wider">
                        <th className="px-5 py-3.5">Reference ID</th>
                        <th className="px-5 py-3.5">Merchant / Date</th>
                        <th className="px-5 py-3.5">Budget Pool</th>
                        <th className="px-5 py-3.5">Gross Amount</th>
                        <th className="px-5 py-3.5 text-right">Diagnostic Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 font-medium text-neutral-600">
                      {transactions.map((tx) => (
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
                                <span className="inline-flex items-center space-x-1.5 bg-rose-50 text-rose-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-rose-200/60 cursor-pointer hover:bg-rose-100/80 transition">
                                  <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
                                  <span>Audit Alert</span>
                                </span>
                                <span className="text-[10px] text-rose-600 font-semibold tracking-tight">{tx.riskReason}</span>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  );
}