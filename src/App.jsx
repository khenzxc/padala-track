import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import GetStartedPage from './pages/GetStartedPage';
import DashboardPage from './pages/DashboardPage'; // Gamit ang orihinal mong file path

function AppLayout({ children, isAuthenticated }) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Listahan ng flat routes kung saan dapat lumabas ang Sidebar mo
  const privateRoutes = ['/dashboard', '/budgetpools', '/auditledger', '/profile'];
  const isPrivateRoute = isAuthenticated && privateRoutes.some(route => currentPath.startsWith(route));

  if (isPrivateRoute) {
    return (
      <div className="flex min-h-screen bg-[#F2F2F7] font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_sans-serif]">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8 transition-all duration-300">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-blue-500/10 selection:text-blue-600 overflow-x-hidden antialiased flex flex-col">
      <Navbar />
      <main className="flex-1 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  const [userRole, setUserRole] = useState('ofw');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <Router>
      <AppLayout isAuthenticated={isAuthenticated}>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<LandingPage userRole={userRole} setUserRole={setUserRole} />} />
          <Route path="/signin" element={<SignInPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/get-started" element={<GetStartedPage />} />

          {/* FLAT ROUTING GAMIT ANG DASHBOARDPAGE AT IBA PANG SUB-VIEWS */}
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <DashboardPage userRole={userRole} currentView="overview" /> : <Navigate to="/signin" replace />} 
          />
          <Route 
            path="/budgetpools/*" 
            element={isAuthenticated ? <DashboardPage userRole={userRole} currentView="pools" /> : <Navigate to="/signin" replace />} 
          />
          <Route 
            path="/auditledger" 
            element={isAuthenticated ? <DashboardPage userRole={userRole} currentView="audit" /> : <Navigate to="/signin" replace />} 
          />
          <Route 
            path="/profile" 
            element={isAuthenticated ? <DashboardPage userRole={userRole} currentView="profile" /> : <Navigate to="/signin" replace />} 
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}