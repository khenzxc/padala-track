import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import GetStartedPage from './pages/GetStartedPage';
import DashboardPage from './pages/DashboardPage'; 

// 🚨 MGA BAGONG IMPORTS PARA SA BENEFICIARY SIDE
import BeneficiarySidebar from './components/BeneficiarySidebar';
import BeneficiaryDashboardPage from './pages/BeneficiaryDashboardPage'; 

// 🛠️ PINALITAN: Tinatanggap na ang userRole bilang prop para sa tamang pag-render ng sidebar
function AppLayout({ children, isAuthenticated, setIsAuthenticated, userRole }) {
  const location = useLocation();
  const currentPath = location.pathname;

  // PINALITAN: Idinagdag ang '/beneficiary-dashboard' sa listahan ng mga nangangailangan ng private layout
  const privateRoutes = ['/dashboard', '/budgetpools', '/auditledger', '/disputes', '/profile', '/beneficiary-dashboard'];
  const isPrivateRoute = isAuthenticated && privateRoutes.some(route => currentPath.startsWith(route));

  if (isPrivateRoute) {
    return (
      <div className="flex min-h-screen bg-[#F2F2F7] font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_sans-serif]">
        
        {/* 🛠️ AUTOMATIC SIDEBAR SWITCHER: Hiwalay na ang landas ng OFW at Beneficiary Sidebar */}
        {userRole === 'beneficiary' ? (
          <BeneficiarySidebar setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <Sidebar setIsAuthenticated={setIsAuthenticated} />
        )}
        
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
  const [userRole, setUserRole] = useState('ofw'); // Pwedeng 'ofw' o 'beneficiary'
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Naka-default sa true base sa code mo

  return (
    <Router>
      {/* 🛠️ PINALITAN: Ipinasa ang userRole prop dito sa AppLayout wrapper */}
      <AppLayout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userRole={userRole}>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<LandingPage userRole={userRole} setUserRole={setUserRole} />} />
          <Route 
            path="/signin" 
            element={<SignInPage setIsAuthenticated={setIsAuthenticated} userRole={userRole} setUserRole={setUserRole} />} 
          />
          <Route path="/get-started" element={<GetStartedPage />} />

          {/* 🌍 OFW PRIVATE ROUTES */}
          <Route 
            path="/dashboard" 
            element={isAuthenticated && userRole === 'ofw' ? <DashboardPage userRole={userRole} currentView="overview" /> : <Navigate to="/signin" replace />} 
          />
          <Route 
            path="/budgetpools/*" 
            element={isAuthenticated && userRole === 'ofw' ? <DashboardPage userRole={userRole} currentView="pools" /> : <Navigate to="/signin" replace />} 
          />
          <Route 
            path="/auditledger" 
            element={isAuthenticated && userRole === 'ofw' ? <DashboardPage userRole={userRole} currentView="audit" /> : <Navigate to="/signin" replace />} 
          />
          
          {/* SHARED PRIVATE ROUTES (Para sa parehong roles, gagamit ng DashboardPage configuration) */}
          <Route 
            path="/disputes" 
            element={isAuthenticated ? <DashboardPage userRole={userRole} currentView="disputes" /> : <Navigate to="/signin" replace />} 
          />
          <Route 
            path="/profile" 
            element={isAuthenticated ? <DashboardPage userRole={userRole} currentView="profile" /> : <Navigate to="/signin" replace />} 
          />

          {/* 🇵🇭 EXCLUSIVE BENEFICIARY ROUTE (Ganap na magkabukod na ng dashboard page) */}
          <Route 
            path="/beneficiary-dashboard" 
            element={isAuthenticated && userRole === 'beneficiary' ? <BeneficiaryDashboardPage /> : <Navigate to="/signin" replace />} 
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}