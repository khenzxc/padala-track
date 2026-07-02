import React from 'react';
import { 
  Layers, 
  LayoutDashboard, 
  FileSpreadsheet, 
  ShieldCheck, 
  User, 
  Settings 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <>
      {/* 1. DESKTOP SIDEBAR VIEW (Visible on Desktop screens) */}
      <aside className="w-64 bg-white border-r border-neutral-200 hidden md:flex flex-col h-full font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_sans-serif]">
        {/* Sidebar Brand Header */}
        <div className="p-6 border-b border-neutral-100 flex items-center space-x-2.5">
          <div className="bg-blue-600 text-white p-2 rounded-xl shadow-xs">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Padala<span className="text-blue-600">Track</span>
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 flex-1 space-y-1">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'overview' ? 'bg-blue-50/80 text-blue-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'}`}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('pools')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'pools' ? 'bg-blue-50/80 text-blue-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'}`}
          >
            <Layers className="h-4 w-4" />
            <span>Budget Pools</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('audit')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'audit' ? 'bg-blue-50/80 text-blue-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'}`}
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>Audit Ledger</span>
          </button>
        </nav>

        {/* User Profile Workspace Widget */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-full bg-neutral-200 border border-neutral-300 flex items-center justify-center text-neutral-600 font-bold text-sm">
              <User className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-900">Premium Account</p>
              <p className="text-[11px] text-neutral-400 font-medium">Workspace-OFW</p>
            </div>
          </div>
          <Settings className="h-4 w-4 text-neutral-400 hover:text-neutral-600 cursor-pointer transition" />
        </div>
      </aside>

      {/* 2. MOBILE BOTTOM NAVIGATION TAB VIEW (Visible only on cellphone screens) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-neutral-200/60 px-2 py-2 pb-5 shadow-lg font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_sans-serif]">
        <div className="flex items-center justify-around max-w-md mx-auto">
          
          {/* Mobile Tab 1: Dashboard */}
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${activeTab === 'overview' ? 'text-blue-600 font-bold' : 'text-neutral-400 font-medium'}`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-[10px] mt-1 tracking-tight">Dashboard</span>
          </button>

          {/* Mobile Tab 2: Pools */}
          <button 
            onClick={() => setActiveTab('pools')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${activeTab === 'pools' ? 'text-blue-600 font-bold' : 'text-neutral-400 font-medium'}`}
          >
            <Layers className="h-5 w-5" />
            <span className="text-[10px] mt-1 tracking-tight">Pools</span>
          </button>

          {/* Mobile Tab 3: Ledger */}
          <button 
            onClick={() => setActiveTab('audit')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${activeTab === 'audit' ? 'text-blue-600 font-bold' : 'text-neutral-400 font-medium'}`}
          >
            <FileSpreadsheet className="h-5 w-5" />
            <span className="text-[10px] mt-1 tracking-tight">Ledger</span>
          </button>

        </div>
      </div>
    </>
  );
}