import React, { useState } from 'react';
import OverviewPage from './OverviewPage';
import BudgetPoolsPage from './BudgetPoolsPage';
import AuditRegistryPage from './AuditRegistryPage';
import ProfileView from './ProfileView';
import { Plus, Bell, X } from 'lucide-react';

export default function DashboardPage({ userRole, currentView }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newPoolName, setNewPoolName] = useState('');
  const [newPoolTotal, setNewPoolTotal] = useState('');
  const [newPoolCategory, setNewPoolCategory] = useState('Infrastructure');

  const [pools, setPools] = useState([
    { id: 1, name: 'House Construction', total: 150000, spent: 67500, category: 'Infrastructure' },
    { id: 2, name: 'Monthly Groceries & Utilities', total: 35000, spent: 12000, category: 'Household' },
    { id: 3, name: 'Tuition & School Supplies', total: 45000, spent: 41000, category: 'Education' }
  ]);

  const [transactions] = useState([
    { id: 'TX-1024', merchant: 'Alpha Hardware Supply', pool: 'House Construction', amount: 24500, date: 'June 28, 2026', status: 'Flagged', riskReason: 'Canva Metadata Detected' },
    { id: 'TX-1023', merchant: 'Puregold Supermarket', pool: 'Monthly Groceries', amount: 8450, date: 'June 25, 2026', status: 'Approved' },
    { id: 'TX-1022', merchant: 'National Book Store', pool: 'Tuition & Supplies', amount: 3200, date: 'June 20, 2026', status: 'Approved' },
    { id: 'TX-1021', merchant: 'Beta Steel Manufacturing', pool: 'House Construction', amount: 43000, date: 'June 18, 2026', status: 'Pending Audit' }
  ]);

  const handleCreatePool = (e) => {
    e.preventDefault();
    if (!newPoolName || !newPoolTotal) return;

    setPools([{
      id: Date.now(), 
      name: newPoolName,
      total: parseFloat(newPoolTotal),
      spent: 0, 
      category: newPoolCategory
    }, ...pools]);
    
    setNewPoolName('');
    setNewPoolTotal('');
    setIsModalOpen(false);
  };

  const renderActivePage = () => {
    switch (currentView) {
      case 'overview':
        return <OverviewPage pools={pools} transactions={transactions} />;
      case 'pools':
        return <BudgetPoolsPage pools={pools} />;
      case 'audit':
        return <AuditRegistryPage transactions={transactions} />;
      case 'profile':
        return <ProfileView userRole={userRole} />;
      default:
        return <OverviewPage pools={pools} transactions={transactions} />;
    }
  };

  return (
    <div className="flex flex-col h-full min-w-0 overflow-hidden text-neutral-900 antialiased">
      
      {/* GLOBAL HEADER BAR */}
      <header className="bg-white border border-neutral-200 h-16 flex-none px-6 flex items-center justify-between z-20 rounded-2xl mb-6 shadow-xs">
        <h1 className="text-xl font-extrabold text-neutral-900 tracking-tight capitalize">
          {currentView === 'overview' ? 'Financial Hub' : `${currentView} Dashboard`}
        </h1>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-neutral-400 hover:text-neutral-600 transition">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-blue-500 rounded-full ring-2 ring-white" />
          </button>
          
          {/* DESKTOP ONLY BUTTON: Nakatago sa mobile (md:inline-flex) */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="hidden md:inline-flex items-center space-x-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold px-4 py-2.5 rounded-xl shadow-xs text-sm transition active:scale-98 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Create Pool</span>
          </button>
        </div>
      </header>

      {/* MOBILE ONLY FLOATING ACTION BUTTON: Lalabas lang sa mobile screen (md:hidden) */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="md:hidden fixed bottom-24 right-5 z-40 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl transition active:scale-95 flex items-center justify-center cursor-pointer ring-4 ring-white"
      >
        <Plus className="h-6 w-6" />
      </button>

      {/* COMPONENT VIEWPORT MOUNT POINT */}
      <div className="flex-1 max-w-6xl w-full mx-auto">
        {renderActivePage()}
      </div>

      {/* MODAL SLIDE-OVER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-neutral-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md h-full bg-white shadow-2xl p-6 flex flex-col justify-between border-l border-neutral-200 animate-slide-in">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <div>
                  <h2 className="text-lg font-extrabold text-neutral-900">Create Budget Pool</h2>
                  <p className="text-xs text-neutral-400 font-medium">Setup a distinct core budget pool.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-neutral-400 hover:text-neutral-600 rounded-lg cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form id="poolForm" onSubmit={handleCreatePool} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Pool Name</label>
                  <input type="text" required placeholder="e.g., Office Supplies" value={newPoolName} onChange={(e) => setNewPoolName(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl font-medium" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Total Capital (PHP)</label>
                  <input type="number" required placeholder="₱ 0.00" value={newPoolTotal} onChange={(e) => setNewPoolTotal(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl font-bold" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Category</label>
                  <select value={newPoolCategory} onChange={(e) => setNewPoolCategory(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl font-semibold text-neutral-700">
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Household">Household</option>
                    <option value="Education">Education</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>
              </form>
            </div>

            <div className="border-t border-neutral-100 pt-4 flex items-center space-x-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 border border-neutral-200 text-neutral-600 font-semibold text-sm rounded-xl cursor-pointer">Cancel</button>
              <button type="submit" form="poolForm" className="flex-1 py-2.5 bg-neutral-900 text-white font-semibold text-sm rounded-xl cursor-pointer shadow-xs">Deploy Allocation</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}