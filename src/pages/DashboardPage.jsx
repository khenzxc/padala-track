import React, { useState } from 'react';
import OverviewPage from './OverviewPage';
import BudgetPoolsPage from './BudgetPoolsPage';
import AuditRegistryPage from './AuditRegistryPage';
import AuditDetailedPage from './AuditDetailedPage';
import ProfileView from './ProfileView';
import DisputeCenterPage from './DisputeCenterPage';
import { Plus, Bell, X, ShieldCheck, Copy, Check, ArrowRight, Users } from 'lucide-react';

export default function DashboardPage({ userRole, currentView }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // FAMILY LINKING STATES
  const [isLinked, setIsLinked] = useState(false);
  const [generatedCode] = useState('PADALA-X7R9');
  const [copied, setCopied] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [linkError, setLinkError] = useState('');
  const [linkLoading, setLinkLoading] = useState(false);

  // DETAILED AUDIT STATE
  const [selectedTxId, setSelectedTxId] = useState(null);

  // BUKOD NA CENTRALIZED CHAT STATE (Nakabukod kada Transaction ID)
  const [allConversations, setAllConversations] = useState({
    'TX-1024': [
      { id: 1, sender: 'system', text: 'AI Flagged: Canva software indicators found in file header.', time: '2:32 PM' },
      { id: 2, sender: 'ofw', text: 'Bakit na-edit sa Canva itong resibo mula sa hardware?', time: '3:00 PM' },
      { id: 3, sender: 'beneficiary', text: 'Nalubog po kasi sa tubig yung resibo, tinype ko lang po ulit para malinaw niyo makita.', time: '3:15 PM' }
    ],
    'TX-1021': [
      { id: 1, sender: 'system', text: 'AI Flagged: Large transfer pool anomaly detected.', time: '1:10 PM' },
      { id: 2, sender: 'ofw', text: 'Na-approve ba ng engineer natin itong bakal?', time: '1:15 PM' }
    ]
  });

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
    { id: 'TX-1023', merchant: 'Puregold Supermarket', pool: 'Monthly Groceries & Utilities', amount: 8450, date: 'June 25, 2026', status: 'Approved' },
    { id: 'TX-1022', merchant: 'National Book Store', pool: 'Tuition & School Supplies', amount: 3200, date: 'June 20, 2026', status: 'Approved' },
    { id: 'TX-1021', merchant: 'Beta Steel Manufacturing', pool: 'House Construction', amount: 43000, date: 'June 18, 2026', status: 'Pending Audit' }
  ]);

  // Handler para magdagdag ng chat nang hindi nabubura ang luma
  const handleAddComment = (txId, commentText) => {
    const freshComment = {
      id: Date.now(),
      sender: 'ofw',
      text: commentText,
      time: 'Just now'
    };

    const currentChatThread = allConversations[txId] || [];
    setAllConversations({
      ...allConversations,
      [txId]: [...currentChatThread, freshComment]
    });
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerifyLink = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    setLinkLoading(true);
    setLinkError('');
    setTimeout(() => {
      if (inputCode.toUpperCase() === 'PADALA-X7R9') {
        setIsLinked(true);
        setLinkLoading(false);
      } else {
        setLinkError('Maling Code. Siguraduhing tugma sa binigay ng iyong kapamilyang OFW.');
        setLinkLoading(false);
      }
    }, 1200);
  };

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

  // DYNAMIC HEADER TITLE ROUTER
  const getHeaderTitle = () => {
    if (currentView === 'audit' && selectedTxId) {
      return 'Forensic Diagnostics';
    }
    
    const titles = {
      overview: 'Financial Hub',
      pools: 'Budget Pools',
      audit: 'Audit Ledger',
      disputes: 'Dispute Center',
      profile: 'User Profile'
    };

    return titles[currentView] || 'Financial Hub';
  };

  // DYNAMIC COMPONENT ROUTER
  const renderActivePage = () => {
    switch (currentView) {
      case 'overview':
        return <OverviewPage pools={pools} transactions={transactions} />;
      case 'pools':
        return <BudgetPoolsPage pools={pools} />;
      case 'audit':
        if (selectedTxId) {
          return (
            <AuditDetailedPage
              transactionId={selectedTxId}
              transactions={transactions}
              comments={allConversations[selectedTxId] || []}
              onSendComment={(text) => handleAddComment(selectedTxId, text)}
              onBack={() => setSelectedTxId(null)}
            />
          );
        }
        return (
          <AuditRegistryPage
            transactions={transactions}
            onSelectTransaction={(id) => setSelectedTxId(id)}
          />
        );

      case 'disputes':
        return (
          <DisputeCenterPage
            transactions={transactions}
            allConversations={allConversations}
            onSendComment={handleAddComment}
          />
        );

      case 'profile':
        return <ProfileView userRole={userRole} setIsLinked={setIsLinked} />;
      default:
        return <OverviewPage pools={pools} transactions={transactions} />;
    }
  };

  if (!isLinked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 font-['-apple-system',BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif]">
        <div className="w-full max-w-md bg-white border border-neutral-200 shadow-xl rounded-3xl p-6 text-center space-y-6">
          <div className="mx-auto bg-blue-50 text-blue-600 p-3.5 rounded-2xl w-fit shadow-xs">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
              {userRole === 'ofw' ? 'Ikonekta ang Iyong Pamilya' : 'I-link ang Account sa OFW'}
            </h2>
            <p className="text-xs text-neutral-400 font-medium mt-1 max-w-xs mx-auto">
              {userRole === 'ofw' ? 'Kailangan mag-link ng pamilya mo.' : 'Humingi ng code sa OFW.'}
            </p>
          </div>
          <hr className="border-neutral-100" />
          {userRole === 'ofw' ? (
            <div className="space-y-4 text-left">
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Invitation Code</span>
                  <p className="text-lg font-mono font-bold text-blue-600 tracking-wide mt-0.5">{generatedCode}</p>
                </div>
                <button onClick={handleCopyCode} className="p-3 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-xl transition cursor-pointer">
                  {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-neutral-400" />}
                </button>
              </div>
              <button onClick={() => setIsLinked(true)} className="w-full mt-2 py-3 bg-neutral-950 text-white font-bold text-sm rounded-2xl transition hover:bg-neutral-800 cursor-pointer">
                Pansamantalang Pumasok (Demo Mode)
              </button>
            </div>
          ) : (
            <form onSubmit={handleVerifyLink} className="space-y-4 text-left">
              <input type="text" required placeholder="e.g., PADALA-X7R9" value={inputCode} onChange={(e) => setInputCode(e.target.value)} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-center font-mono font-bold uppercase" />
              <button type="submit" className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-2xl flex items-center justify-center space-x-2 cursor-pointer text-sm">
                <span>{linkLoading ? 'Sina-synchronize...' : 'Kumonekta sa Ledger'}</span>
                {!linkLoading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-w-0 overflow-hidden text-neutral-900 antialiased font-['-apple-system',BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif]">
      <header className="bg-white border border-neutral-200 h-16 flex-none px-4 sm:px-6 flex items-center justify-between z-20 rounded-2xl mb-6 shadow-xs">
        {/* NAGBABAGO DEPENDE SA KASALUKUYANG VIEW */}
        <h1 className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight truncate">
          {getHeaderTitle()}
        </h1>
        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
          <span className="hidden sm:inline-flex items-center text-xs bg-emerald-50 text-emerald-700 font-bold px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5 mr-1" /> Family Synced
          </span>
          <button className="relative p-2 text-neutral-400 hover:text-neutral-600 transition">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-blue-500 rounded-full" />
          </button>

          {/* RESPONSIVE AT COMPATIBLE CREATE POOL BUTTON */}
          {userRole === 'ofw' && currentView !== 'profile' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center space-x-0 sm:space-x-2 bg-neutral-900 text-white font-semibold p-2.5 sm:px-4 sm:py-2.5 rounded-xl cursor-pointer hover:bg-neutral-800 transition active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline text-xs sm:text-sm">Create Pool</span>
            </button>
          )}
        </div>
      </header>

      <div className="flex-1 max-w-6xl w-full mx-auto px-1 sm:px-0">
        {renderActivePage()}
      </div>

      {/* CREATE POOL MODAL SIDE DRAWER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-neutral-900/30 backdrop-blur-md">
          {/* Backdrop click close handler */}
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />

          <div className="w-full max-w-md h-full bg-white shadow-2xl relative z-10 flex flex-col justify-between border-l border-neutral-100 animate-slide-left font-['-apple-system',BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif]">

            {/* Header Container */}
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-white">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">System Ledger Asset</span>
                <h2 className="text-base font-bold text-neutral-900 tracking-tight">Create Budget Pool</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-neutral-50 rounded-xl text-neutral-400 hover:text-neutral-900 transition-all cursor-pointer border border-transparent hover:border-neutral-200/60"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form Content Controls */}
            <div className="flex-1 overflow-y-auto p-6 bg-neutral-50/40 space-y-6">
              <form id="poolForm" onSubmit={handleCreatePool} className="space-y-5">

                {/* Field 1: Pool Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block px-0.5">
                    Allocation Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., House Construction, Tuition"
                    value={newPoolName}
                    onChange={(e) => setNewPoolName(e.target.value)}
                    className="w-full bg-white border border-neutral-200/80 rounded-xl px-3.5 py-3 text-xs font-medium placeholder-neutral-400 text-neutral-900 transition-all focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 shadow-2xs"
                  />
                </div>

                {/* Field 2: Total Budget Amount with Prefix Custom Container */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block px-0.5">
                    Fund Capacity Allocation
                  </label>
                  <div className="relative rounded-xl shadow-2xs flex items-center">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none border-r border-neutral-100 pr-2.5">
                      <span className="text-xs font-bold text-neutral-400 font-mono">₱</span>
                    </div>
                    <input
                      type="number"
                      required
                      placeholder="0.00"
                      value={newPoolTotal}
                      onChange={(e) => setNewPoolTotal(e.target.value)}
                      className="w-full bg-white border border-neutral-200/80 rounded-xl pl-12 pr-3.5 py-3 text-xs font-mono font-bold placeholder-neutral-400 text-neutral-900 transition-all focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>
                </div>

                {/* Field 3: Select Dropdown Custom Asset Style */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block px-0.5">
                    Category Classification
                  </label>
                  <div className="relative">
                    <select
                      value={newPoolCategory}
                      onChange={(e) => setNewPoolCategory(e.target.value)}
                      className="w-full bg-white border border-neutral-200/80 rounded-xl px-3.5 py-3 text-xs font-bold text-neutral-800 tracking-tight transition-all focus:outline-none focus:border-neutral-900 appearance-none shadow-2xs cursor-pointer"
                    >
                      <option value="Infrastructure">🏗️ Infrastructure & Build</option>
                      <option value="Household">🏡 Household Utilities</option>
                      <option value="Education">🎓 Education & Tuition</option>
                    </select>
                    {/* Custom SVG indicator arrow para palitan ang default browser selector dropdown arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-neutral-400 border-l border-neutral-100">
                      <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

              </form>

              {/* Informational Core System Footer Note inside drawer */}
              <div className="bg-neutral-900 text-neutral-400 rounded-2xl p-4 border border-neutral-800 space-y-1.5 shadow-sm">
                <span className="text-[9px] font-bold tracking-widest text-blue-400 uppercase block">🔐 Smart Contract Guard</span>
                <p className="text-[10px] font-medium leading-relaxed">
                  Ang pag-deploy ng budget pool na ito ay magpapakita nang real-time sa dashboard ng iyong pamilya sa Pilipinas. Lahat ng resibong ia-upload dito ay dadaan sa AI automated forensic scan system natin.
                </p>
              </div>
            </div>

            {/* Action Footer Call To Actions */}
            <div className="p-4 border-t border-neutral-100 bg-white flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50 transition active:scale-98 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="poolForm"
                className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold tracking-wide shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <span>Deploy Allocation</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}