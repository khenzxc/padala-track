import React from 'react';
import { Sparkles, ArrowRight, Globe, Bell, AlertTriangle, Layers, Camera, Users, CheckCircle } from 'lucide-react';

export default function Hero({ userRole, setUserRole }) {
  return (
    <header className="relative px-4 pt-8 pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Column: Heading and Controls */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">

          {/* Platform Status Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-200 shadow-sm">
            <Sparkles className="h-4 w-4 text-blue-600 fill-blue-600" />
            <span>Platform Update: AI Remittance Audit v2.0 Is Live</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.2] max-w-xl">
            Transparent Spending. <br />
            <span className="text-blue-500">Absolute Family Trust.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-neutral-600 max-w-xl leading-relaxed font-normal">
            A next-generation <strong className="font-bold text-neutral-800">Post-Remittance Audit Ledger</strong> built for modern global families. Track dynamic project allocations, verify real-world merchant receipts via cloud AI diagnostics, and eliminate financial friction.
          </p>

          {/* User Role Split Controller */}
          <div className="w-full space-y-4 pt-2 max-w-md">
            <div className="bg-neutral-200/80 p-1.5 rounded-2xl flex w-full border border-neutral-300/50">
              <button
                type="button"
                onClick={() => setUserRole('ofw')}
                className={`flex-1 py-3 text-sm sm:text-base font-bold rounded-xl transition-all ${userRole === 'ofw' ? 'bg-white text-neutral-900 shadow-md' : 'text-neutral-500'}`}
              >
                Sender (OFW)
              </button>
              <button
                type="button"
                onClick={() => setUserRole('beneficiary')}
                className={`flex-1 py-3 text-sm sm:text-base font-bold rounded-xl transition-all ${userRole === 'beneficiary' ? 'bg-white text-neutral-900 shadow-md' : 'text-neutral-500'}`}
              >
                Beneficiary (Family)
              </button>
            </div>

            {/* Premium CTA Button */}
            <div className="w-full">
              <button className="w-full px-6 py-4 font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-2xl shadow-lg transition active:scale-98 flex items-center justify-center space-x-2 text-base sm:text-lg">
                <span>{userRole === 'ofw' ? 'Create Budget Pool' : 'Connect Family Code'}</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic iOS App UI Preview */}
        <div className="lg:col-span-6 flex justify-center relative mt-4 lg:mt-0">
          
          {/* Compact hardware mockup size setup */}
          <div className="w-[240px] h-[480px] sm:w-[260px] sm:h-[510px] lg:max-w-[260px] lg:h-[510px] bg-neutral-950 rounded-[38px] p-2.5 shadow-2xl border-[3px] border-neutral-800 relative z-10 transition-all">
            
            {/* Dynamic Island Notch */}
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-neutral-950 rounded-full z-30" />

            {/* Phone Inner Screen Content */}
            <div className="w-full h-full bg-[#F2F2F7] rounded-[28px] overflow-hidden flex flex-col relative pt-4 select-none">
              
              <div className="px-3 pt-3 pb-2 flex items-center justify-between bg-white border-b border-neutral-200/50">
                <div className="flex items-center space-x-1">
                  <Globe className="h-3.5 w-3.5 text-blue-500" />
                  <span className="text-[10px] font-extrabold text-neutral-500 uppercase tracking-wider">
                    {userRole === 'ofw' ? 'AED → PHP LIVE' : 'PH-UAE SYNCED'}
                  </span>
                </div>
                <Bell className="h-3.5 w-3.5 text-neutral-500" />
              </div>

              <div className="p-3 space-y-3 flex-1 overflow-y-auto text-left">
                
                {/* Active Budget Pool Widget (Nagbabago depende sa Role) */}
                <div className="bg-white rounded-xl p-3 shadow-sm border border-neutral-200">
                  <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">
                    {userRole === 'ofw' ? 'Remitted Pool Dashboard' : 'Active Pool Ledger'}
                  </p>
                  <h3 className="text-xs sm:text-sm font-bold text-neutral-900 mt-0.5">
                    {userRole === 'ofw' ? 'House Project Fund' : 'House Construction'}
                  </h3>
                  
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-[11px] sm:text-xs">
                      <span className="text-neutral-500">
                        {userRole === 'ofw' ? 'Sent Amount:' : 'Total Capital:'}
                      </span>
                      <span className="font-bold text-neutral-900">
                        {userRole === 'ofw' ? 'د.إ 10,000 (₱150k)' : '₱150,000'}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '45%' }} />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-neutral-500">
                      <span>Spent: ₱67,500</span>
                      <span className="text-blue-600">45% Used</span>
                    </div>
                  </div>
                </div>

                {/* AI Audit / Action Card (Nagbabago depende sa Role) */}
                {userRole === 'ofw' ? (
                  /* KUNG OFW: Ipakita ang AI Audit Alert (Fraud/Canva detection) */
                  <div className="bg-white rounded-xl p-3 shadow-sm border border-neutral-200 space-y-1.5 transition-all animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="bg-amber-100 text-amber-900 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                        <AlertTriangle className="h-2.5 w-2.5 text-amber-600" />
                        <span>AI Audit Flag</span>
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">Official Hardware Receipt</h4>
                      <p className="text-[10px] sm:text-[11px] text-neutral-600 mt-0.5 leading-snug">
                        Warning: Metadata indicates alteration via <span className="text-amber-600 font-bold">Canva</span>.
                      </p>
                    </div>

                    <div className="h-12 w-full rounded-lg overflow-hidden border border-neutral-200 relative">
                      <img 
                        src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80" 
                        alt="Receipt Thumbnail" 
                        className="w-full h-full object-cover blur-[0.5px]"
                      />
                      <div className="absolute inset-0 bg-neutral-900/50 flex items-center justify-center">
                        <span className="text-[9px] text-white font-bold bg-neutral-900/70 px-1.5 py-0.5 rounded-md">Edited Traces Found</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* KUNG BENEFICIARY: Ipakita ang Receipt Upload Success State */
                  <div className="bg-white rounded-xl p-3 shadow-sm border border-neutral-200 space-y-1.5 transition-all animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="bg-emerald-100 text-emerald-900 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                        <CheckCircle className="h-2.5 w-2.5 text-emerald-600" />
                        <span>AI Verified</span>
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">Cement & Hollowblocks</h4>
                      <p className="text-[10px] sm:text-[11px] text-neutral-600 mt-0.5 leading-snug">
                        Receipt matched with real-world store location database.
                      </p>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2 flex justify-between items-center text-[11px]">
                      <span className="text-emerald-800 font-medium">Status: Approved</span>
                      <span className="font-bold text-emerald-700">₱12,400.00</span>
                    </div>
                  </div>
                )}

              </div>

              {/* Native Mobile Tab Navigator inside mockup */}
              <div className="bg-white border-t border-neutral-200 h-12 flex items-center justify-around pb-2 pt-1">
                <div className="flex flex-col items-center text-blue-500">
                  <Layers className="h-3.5 w-3.5" />
                  <span className="text-[9px] font-bold mt-0.5">Ledger</span>
                </div>
                <div className="flex flex-col items-center text-neutral-400">
                  <Camera className="h-3.5 w-3.5" />
                  <span className="text-[9px] font-bold mt-0.5">Capture</span>
                </div>
                <div className="flex flex-col items-center text-neutral-400">
                  <Users className="h-3.5 w-3.5" />
                  <span className="text-[9px] font-bold mt-0.5">Family</span>
                </div>
              </div>

            </div>
          </div>

          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-36 w-36 bg-blue-500/10 rounded-full blur-3xl -z-10" />
        </div>

      </div>
    </header>
  );
}