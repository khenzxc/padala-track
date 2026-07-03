import React from 'react';
import { useNavigate } from 'react-router-dom'; // Pinalitan ang setView ng useNavigate
import { ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate(); // Hook para sa routing navigation

  return (
    // 🛠️ FIX: Binabaan ang vertical padding (mula py-3 naging py-2.5) para sa ultra-compact form factor
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-neutral-200/30 px-4 py-2.5 sm:py-3 transition-all select-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo - Fully Clickable with Micro-interactions */}
        <div 
          onClick={() => navigate('/')} // Itatapon ang user sa Landing Page
          className="flex items-center space-x-1.5 cursor-pointer group active:scale-98 transition-all duration-200"
        >
          {/* 🛠️ FIX: Pinaliit ang image block padding at core structure bounds */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-1.5 rounded-lg shadow-xs group-hover:from-blue-600 group-hover:to-blue-700 transition-all">
            <ShieldCheck className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
          </div>
          {/* 🛠️ FIX: Scaled down text size para maging mas premium at elegant tignan */}
          <span className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-neutral-900">
            Padala<span className="text-blue-500 font-semibold group-hover:text-blue-600 transition-colors">Track</span>
          </span>
        </div>

        {/* Action Buttons - Tactile feedback ready */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          
          {/* Sign In Button: Minimalist clickable layout */}
          <button 
            onClick={() => navigate('/signin')} // Babatakin papuntang Sign In page URL
            className="px-2 py-1 text-xs sm:text-sm font-semibold text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-100/60 active:scale-95 transition-all duration-150 cursor-pointer"
          >
            Sign In
          </button>
          
          {/* Get Started Button: Compact pill structure */}
          <button 
            onClick={() => navigate('/get-started')} // Papuntang Get Started registration layout
            className="px-3.5 py-1.5 text-xs sm:text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-full shadow-xs active:scale-95 hover:scale-[1.02] transition-all duration-150 cursor-pointer"
          >
            Get Started
          </button>
        </div>

      </div>
    </nav>
  );
}