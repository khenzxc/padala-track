import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage'; // Siguraduhing tama ang import path nito
import SignInPage from './pages/SignInPage';
import GetStartedPage from './pages/GetStartedPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const [view, setView] = useState('landing'); 
  const [userRole, setUserRole] = useState('ofw'); // 'ofw' o 'beneficiary'

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-blue-500/10 selection:text-blue-600 overflow-x-hidden antialiased flex flex-col">
      
      {/* Navbar ay nakatago kapag nasa dashboard */}
      {view !== 'dashboard' && <Navbar setView={setView} />}
      
      {/* Core Routing Logic */}
      <main className="flex-1 transition-all duration-300">
        {view === 'landing' && (
          <LandingPage 
            setView={setView} 
            userRole={userRole} 
            setUserRole={setUserRole} 
          />
        )}
        
        {view === 'signin' && (
          <SignInPage setView={setView} />
        )}
        
        {view === 'getstarted' && (
          <GetStartedPage setView={setView} />
        )}
        
        {view === 'dashboard' && (
          <DashboardPage userRole={userRole} setView={setView} />
        )}
      </main>

    </div>
  );
}