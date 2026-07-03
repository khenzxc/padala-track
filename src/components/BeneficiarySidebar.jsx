import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  User, 
  LogOut,
  MessageSquare 
} from 'lucide-react';

export default function BeneficiarySidebar({ setIsAuthenticated }) { 
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    console.log('Logging out beneficiary...');
    if (setIsAuthenticated) setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. DESKTOP VIEW                                                         */}
      {/* ========================================================================= */}
      <aside className="hidden md:flex flex-col justify-between w-64 flex-shrink-0 h-screen sticky top-0 bg-white border-r border-neutral-200 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_sans-serif]">
        
        <div className="flex flex-col">
          {/* Brand Header */}
          <div 
            onClick={() => navigate('/')} 
            className="p-6 border-b border-neutral-100 flex items-center space-x-2.5 cursor-pointer"
          >
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-xs">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Padala<span className="text-blue-600">Track</span>
            </span>
          </div>

          {/* Beneficiary Navigation Items */}
          <nav className="p-4 space-y-1">
            <button 
              onClick={() => navigate('/beneficiary-dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${isActive('/beneficiary-dashboard') ? 'bg-blue-50/80 text-blue-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'}`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Family Dashboard</span>
            </button>
            
            <button 
              onClick={() => navigate('/disputes')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${isActive('/disputes') ? 'bg-blue-50/80 text-blue-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'}`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Dispute Center</span>
            </button>

            <button 
              onClick={() => navigate('/profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${isActive('/profile') ? 'bg-blue-50/80 text-blue-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'}`}
            >
              <User className="h-4 w-4" />
              <span>My Profile</span>
            </button>
          </nav>
        </div>

        {/* Log Out */}
        <div className="p-4 border-t border-neutral-100 bg-white">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold text-neutral-500 hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MOBILE BOTTOM NAVIGATION                                              */}
      {/* ========================================================================= */}
      <div className="block md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-neutral-200 px-1 py-2 pb-5 shadow-lg font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_sans-serif]">
        <div className="flex items-center justify-around max-w-md mx-auto">
          
          <button 
            onClick={() => navigate('/beneficiary-dashboard')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer ${isActive('/beneficiary-dashboard') ? 'text-blue-600 font-bold' : 'text-neutral-400 font-medium'}`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-[10px] mt-1 tracking-tight">Dashboard</span>
          </button>

          <button 
            onClick={() => navigate('/disputes')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer ${isActive('/disputes') ? 'text-blue-600 font-bold' : 'text-neutral-400 font-medium'}`}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="text-[10px] mt-1 tracking-tight">Disputes</span>
          </button>

          <button 
            onClick={() => navigate('/profile')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer ${isActive('/profile') ? 'text-blue-600 font-bold' : 'text-neutral-400 font-medium'}`}
          >
            <User className="h-5 w-5" />
            <span className="text-[10px] mt-1 tracking-tight">Profile</span>
          </button>

        </div>
      </div>
    </>
  );
}