import React, { useState } from 'react';
import BeneficiaryOverviewPage from './BeneficiaryOverviewPage';
import UploadReceiptDrawer from './UploadReceiptDrawer'; // Ayusin ang path base sa structure mo

export default function BeneficiaryDashboardPage() {
  const [isUploadDrawerOpen, setIsUploadDrawerOpen] = useState(false);

  // States para sa real-time synchronization ng data sa client side
  const [pools, setPools] = useState([
    { id: 'P001', name: 'Mga Bilihing Pagkain (Groceries)', category: 'Food', total: 15000, spent: 4500 },
    { id: 'P002', name: 'Tuition ni Bunso', category: 'Education', total: 25000, spent: 25000 },
    { id: 'P003', name: 'Maintenance Meds ni Nanay', category: 'Health', total: 8000, spent: 1200 }
  ]);

  const [transactions, setTransactions] = useState([
    { id: 'TX-9081', merchant: 'Puregold Supermarket', pool: 'Mga Bilihing Pagkain (Groceries)', date: '2026-07-02', amount: 3200, status: 'Approved' },
    { id: 'TX-4412', merchant: 'Mercury Drug', pool: 'Maintenance Meds ni Nanay', date: '2026-07-01', amount: 1200, status: 'Pending' },
    { id: 'TX-1092', merchant: 'Gadget Store', pool: 'Mga Bilihing Pagkain (Groceries)', date: '2026-06-28', amount: 1300, status: 'Flagged', riskReason: 'Out of category boundary pattern discovered.' }
  ]);

  const handleUploadReceipt = (newReceipt) => {
    const generatedId = `TX-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTx = {
      id: generatedId,
      merchant: newReceipt.merchant,
      pool: newReceipt.pool,
      date: new Date().toISOString().split('T')[0],
      amount: newReceipt.amount,
      status: 'Pending'
    };
    
    // I-insert ang bagong transaksyon sa itaas ng listahan
    setTransactions([newTx, ...transactions]);

    // Bawasan/I-update ang spent progress ng pool
    setPools(pools.map(p => p.name === newReceipt.pool ? { ...p, spent: p.spent + newReceipt.amount } : p));
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* 1. Main Content Layout Area */}
      <BeneficiaryOverviewPage 
        pools={pools}
        transactions={transactions}
        onOpenUploadDrawer={() => setIsUploadDrawerOpen(true)}
        onSelectTransaction={(txId) => console.log("Viewing tracking parameters for transaction:", txId)}
      />

      {/* 2. Premium Overlaid Sliding Drawer */}
      <UploadReceiptDrawer 
        isOpen={isUploadDrawerOpen}
        onClose={() => setIsUploadDrawerOpen(false)}
        pools={pools}
        onUploadReceipt={handleUploadReceipt}
      />
    </div>
  );
}