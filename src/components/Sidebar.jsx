import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Ginagamit ang router para sa pagbasa at paglipat ng URL
import { 
  Layers, 
  LayoutDashboard, 
  FileSpreadsheet, 
  ShieldCheck, 
  User, 
  LogOut 
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper para malaman kung ano ang kasalukuyang URL para sa active styles (blue highlight)
  const isActive = (path) => {
    // Para sa budgetpools, gagana rin ito kahit pumasok sa loob ng subpage (e.g., /budgetpools/1)
    if (path === '/budgetpools') {
      return location.pathname.startsWith('/budgetpools');
    }
    return location.pathname === path;
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // navigate('/'); // I-uncomment ito para bumalik sa Landing Page pagkatapos mag-logout
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. DESKTOP SIDEBAR VIEW                                                 */}
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

          {/* Navigation Items - Lilipat sa malilinis na URL paths */}
          <nav className="p-4 space-y-1">
            <button 
              onClick={() => navigate('/dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${isActive('/dashboard') ? 'bg-blue-50/80 text-blue-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'}`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
            
            <button 
              onClick={() => navigate('/budgetpools')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${isActive('/budgetpools') ? 'bg-blue-50/80 text-blue-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'}`}
            >
              <Layers className="h-4 w-4" />
              <span>Budget Pools</span>
            </button>
            
            <button 
              onClick={() => navigate('/auditledger')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${isActive('/auditledger') ? 'bg-blue-50/80 text-blue-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'}`}
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span>Audit Ledger</span>
            </button>

            {/* PROFILE BUTTON */}
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
            onClick={() => navigate('/dashboard')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer ${isActive('/dashboard') ? 'text-blue-600 font-bold' : 'text-neutral-400 font-medium'}`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-[10px] mt-1 tracking-tight">Dashboard</span>
          </button>

          <button 
            onClick={() => navigate('/budgetpools')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer ${isActive('/budgetpools') ? 'text-blue-600 font-bold' : 'text-neutral-400 font-medium'}`}
          >
            <Layers className="h-5 w-5" />
            <span className="text-[10px] mt-1 tracking-tight">Pools</span>
          </button>

          <button 
            onClick={() => navigate('/auditledger')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer ${isActive('/auditledger') ? 'text-blue-600 font-bold' : 'text-neutral-400 font-medium'}`}
          >
            <FileSpreadsheet className="h-5 w-5" />
            <span className="text-[10px] mt-1 tracking-tight">Ledger</span>
          </button>

          <button 
            onClick={() => navigate('/profile')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer ${isActive('/profile') ? 'text-blue-600 font-bold' : 'text-neutral-400 font-medium'}`}
          >
            <User className="h-5 w-5" />
            <span className="text-[10px] mt-1 tracking-tight">Profile</span>
          </button>

          <button 
            onClick={handleLogout}
            className="flex flex-col items-center justify-center flex-1 py-1 text-neutral-400 hover:text-red-500 transition-all cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-[10px] mt-1 tracking-tight">Log Out</span>
          </button>

        </div>
      </div>
    </>
  );
}