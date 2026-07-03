import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, ArrowLeft, Lock, Mail, Eye, EyeOff, Sparkles, User, Users } from 'lucide-react';

// 🛠️ PINALITAN: Tinatanggap na nito ang userRole at setUserRole bilang props mula sa App.jsx
export default function SignInPage({ setIsAuthenticated, userRole, setUserRole }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Gawing true ang auth status sa App.jsx
    if (setIsAuthenticated) setIsAuthenticated(true);
    
    // 2. DYNAMIC REDIRECTION: Dediretso sa tamang url path base sa piniling role
    if (userRole === 'beneficiary') {
      navigate('/beneficiary-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F2F2F7] font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_sans-serif] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      
      {/* 🔮 Premium Apple Ambient Blue Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-500/15 blur-[130px] pointer-events-none" />
      <div className="absolute top-[30%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-sky-400/10 blur-[100px] pointer-events-none" />

      {/* Back to Home Button */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 inline-flex items-center space-x-2 text-sm font-semibold text-neutral-600 hover:text-blue-600 transition-colors group z-10 bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full shadow-xs border border-neutral-200/40 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        <span>Back to Home</span>
      </button>

      {/* 📱 Frosted Blue Glass Container Card */}
      <div className="w-full max-w-[400px] bg-white/75 backdrop-blur-2xl rounded-[28px] p-8 shadow-2xl border border-white flex flex-col items-center text-center relative z-10">
        
        {/* App Logo */}
        <div className="h-12 w-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4">
          <Globe className="h-6 w-6 text-white" />
        </div>

        {/* Headings */}
        <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
          Welcome Back
        </h2>
        <p className="text-sm text-neutral-500 mt-1.5 max-w-[280px]">
          Access your post-remittance dynamic audit ledger.
        </p>

        {/* 🎛️ PREMIUM APPLE-STYLE SEGMENTED TOGGLE CONTROL */}
        <div className="w-full bg-[#F2F2F7]/80 backdrop-blur-md p-1 rounded-xl flex relative mt-6 border border-neutral-200/40 select-none">
          {/* Animated Slidable Background Indicator */}
          <div 
            className={`absolute top-1 bottom-1 rounded-lg bg-white shadow-xs border border-neutral-200/30 transition-all duration-300 ease-out w-[calc(50%-4px)] ${
              userRole === 'beneficiary' ? 'left-[calc(50%+2px)]' : 'left-1'
            }`} 
          />
          
          {/* OFW Option Tab */}
          <button
            type="button"
            onClick={() => setUserRole && setUserRole('ofw')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg relative z-10 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
              userRole === 'ofw' ? 'text-blue-600' : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <User className="h-3.5 w-3.5" />
            <span>OFW Sender</span>
          </button>

          {/* Beneficiary Option Tab */}
          <button
            type="button"
            onClick={() => setUserRole && setUserRole('beneficiary')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg relative z-10 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
              userRole === 'beneficiary' ? 'text-blue-600' : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>Beneficiary</span>
          </button>
        </div>

        {/* Form Controls */}
        <form onSubmit={handleSubmit} className="w-full mt-5 space-y-4 text-left">
          
          {/* Email Input Field */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-neutral-500 uppercase tracking-wider pl-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-blue-500">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#F2F2F7]/50 backdrop-blur-md border border-neutral-200/60 focus:border-blue-500 rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-neutral-900 placeholder-neutral-400 outline-none transition-all focus:bg-white focus:shadow-sm"
              />
            </div>
          </div>

          {/* Password Input Field */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center pl-1">
              <label className="text-[12px] font-bold text-neutral-500 uppercase tracking-wider">
                Password
              </label>
              <button 
                type="button"
                className="text-[12px] font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-blue-500">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F2F2F7]/50 backdrop-blur-md border border-neutral-200/60 focus:border-blue-500 rounded-xl py-3 pl-10 pr-10 text-sm font-medium text-neutral-900 placeholder-neutral-400 outline-none transition-all focus:bg-white focus:shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-blue-500 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Dynamic Sign In Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-md shadow-blue-500/20 transition active:scale-[0.99] mt-2 text-sm flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>
              {userRole === 'ofw' ? 'Sign In as OFW' : 'Sign In with Family Code'}
            </span>
          </button>
        </form>

        {/* Footer Link */}
        <div className="w-full border-t border-neutral-100 mt-6 pt-6 text-center">
          <p className="text-xs text-neutral-500">
            New to the platform?{' '}
            <button 
              onClick={() => navigate('/get-started')}
              className="font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Create dynamic pool
            </button>
          </p>
        </div>

      </div>

      {/* Security Hint */}
      <div className="mt-8 flex items-center space-x-1.5 text-neutral-500 font-semibold text-xs relative z-10 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-xs">
        <Sparkles className="h-3.5 w-3.5 text-blue-500" />
        <span>End-to-End Cryptographic Audit Sync Active</span>
      </div>

    </div>
  );
}