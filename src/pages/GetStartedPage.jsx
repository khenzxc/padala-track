import React, { useState } from 'react';
import { ShieldCheck, User, Users, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function GetStartedPage() {
  const [role, setRole] = useState('ofw'); // Default setup
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Registering user:', { role, fullName, email, password });
  };

  return (
    <div className="h-screen w-screen flex bg-neutral-50 overflow-hidden text-neutral-900 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_sans-serif] antialiased">
      
      {/* LEFT COLUMN: REGISTRATION FLOW AND SELECTOR */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 md:max-w-xl bg-white z-10 shadow-xl border-r border-neutral-200/50 overflow-y-auto">
        
        {/* Logo Brand Header */}
        <div className="flex items-center space-x-2 flex-none">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-1.5 rounded-xl shadow-xs">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Padala<span className="text-blue-500">Track</span>
          </span>
        </div>

        {/* Form Container Wrapper */}
        <div className="w-full max-w-sm mx-auto space-y-5 my-auto py-6">
          <div className="space-y-1 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">Create workspace</h2>
            <p className="text-sm text-neutral-500 font-medium">Select your dynamic platform operation archetype.</p>
          </div>

          {/* DUAL ROLE SWITCH PANEL */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <button 
              type="button"
              onClick={() => setRole('ofw')}
              className={`p-3.5 text-left rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${role === 'ofw' ? 'border-blue-500 bg-blue-50/40 ring-1 ring-blue-500' : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100'}`}
            >
              <div className={`p-2 rounded-xl w-8 h-8 flex items-center justify-center ${role === 'ofw' ? 'bg-blue-500 text-white' : 'bg-neutral-200 text-neutral-500'}`}>
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-900 leading-none">Sender</p>
                <p className="text-[10px] text-neutral-400 font-medium mt-1 leading-tight">OFW managing remittance pools</p>
              </div>
            </button>

            <button 
              type="button"
              onClick={() => setRole('beneficiary')}
              className={`p-3.5 text-left rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${role === 'beneficiary' ? 'border-blue-500 bg-blue-50/40 ring-1 ring-blue-500' : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100'}`}
            >
              <div className={`p-2 rounded-xl w-8 h-8 flex items-center justify-center ${role === 'beneficiary' ? 'bg-blue-500 text-white' : 'bg-neutral-200 text-neutral-500'}`}>
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-900 leading-none">Beneficiary</p>
                <p className="text-[10px] text-neutral-400 font-medium mt-1 leading-tight">Family uploading spend proofs</p>
              </div>
            </button>
          </div>

          {/* SYSTEM INPUT REGISTRATION */}
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Full Name</label>
              <input 
                type="text" 
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Juan Dela Cruz"
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail}
                  placeholder="juan@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Security Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <button type="submit" className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold rounded-xl shadow-md flex items-center justify-center space-x-2 transition active:scale-98 mt-3">
              <span>{role === 'ofw' ? 'Initialize OFW Account' : 'Link Family Account'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="text-center text-xs font-semibold text-neutral-500">
            Already registered?{' '}
            <a href="#login" className="text-blue-500 hover:text-blue-600 font-bold">Sign in</a>
          </p>
        </div>

        {/* Bottom Legal Notice */}
        <div className="text-center text-[11px] text-neutral-400 font-medium flex-none">
          By signing up, you accept our standard System Audit Guidelines.
        </div>
      </div>

      {/* RIGHT COLUMN: REVENUE & SECURITY GRAPHICS SCREEN (Hidden on Mobile) */}
      <div className="hidden md:flex flex-1 relative bg-neutral-950 items-center justify-center p-12">
        <div className="absolute inset-0 bg-radial from-neutral-900 via-neutral-950 to-black z-0 opacity-80" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl z-0" />

        <div className="max-w-md space-y-6 relative z-10 text-left text-white">
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-neutral-200 tracking-tight">Standard Ledger Engine</h4>
            <div className="space-y-3">
              {[
                'Tamper-proof itemized resource allocation',
                'Real-time automated metadata trace scans',
                'Structured push alert warnings across devices'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center space-x-3 bg-neutral-900/40 p-3 rounded-xl border border-neutral-800/60">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 flex-none" />
                  <p className="text-xs text-neutral-300 font-medium">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}