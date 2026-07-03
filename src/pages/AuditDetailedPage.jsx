import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ShieldAlert, FileText, Send, MessageSquare, X } from 'lucide-react';

export default function AuditDetailedPage({ transactionId, transactions, comments, onSendComment, onBack }) {
  const chatEndRef = useRef(null);
  const [typedMessage, setTypedMessage] = useState('');
  
  // Mobile Floating Chat Window State
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  
  const matchedTx = transactions?.find(t => t.id === transactionId);

  const [txDetails] = useState({
    id: transactionId || 'TX-1024',
    merchant: matchedTx ? matchedTx.merchant : 'Alpha Hardware Supply',
    pool: matchedTx ? matchedTx.pool : 'House Construction',
    amount: matchedTx ? matchedTx.amount : 24500,
    date: matchedTx ? matchedTx.date : 'June 28, 2026',
    status: matchedTx ? matchedTx.status : 'Flagged',
    riskScore: matchedTx?.status === 'Approved' ? 12 : matchedTx?.status === 'Pending Audit' ? 45 : 88, 
    aiAnalysis: {
      issue: matchedTx?.status === 'Approved' 
        ? 'No anomalies detected. Metadata and structure analysis match criteria.' 
        : matchedTx?.status === 'Pending Audit'
        ? 'Running automated system models. Looking for structural anomalies.'
        : 'Image Metadata Discrepancy & Edited Elements Detected',
    }
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments, isMobileChatOpen]);

  const handleSubmitChat = (e) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;
    
    onSendComment(typedMessage); 
    setTypedMessage(''); 
  };

  return (
    <div className="space-y-6 font-sans pb-24 md:pb-12 animate-fade-in px-1 sm:px-0 relative min-h-[calc(100vh-10rem)]">
      
      {/* HEADER ACTIONS */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-2 md:border-none md:pb-0">
        <button onClick={onBack} className="flex items-center space-x-2 text-sm font-semibold text-neutral-500 hover:text-neutral-800 transition cursor-pointer">
          <ArrowLeft className="h-4 w-4" />
          <span>Bumalik sa Registry</span>
        </button>
        <span className="text-xs text-neutral-400 font-mono font-bold bg-neutral-100 px-2 py-1 rounded-md">ID: {txDetails.id}</span>
      </div>

      {/* RESPONSIVE LAYOUT GRID */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 items-stretch">
        
        {/* LEFT & CENTER PANEL: DIAGNOSTICS & RECEIPT DATA */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          
          {/* AI RISK BANNER */}
          <div className={`border rounded-2xl p-4 md:p-5 flex items-start space-x-3.5 ${txDetails.riskScore > 50 ? 'bg-red-50 border-red-200' : 'bg-neutral-50 border-neutral-200'}`}>
            <div className={`p-2.5 rounded-xl flex-shrink-0 ${txDetails.riskScore > 50 ? 'bg-red-100 text-red-600' : 'bg-neutral-100 text-neutral-600'}`}>
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className={`font-extrabold text-xs uppercase tracking-wide truncate ${txDetails.riskScore > 50 ? 'text-red-900' : 'text-neutral-900'}`}>
                  {txDetails.riskScore > 50 ? 'High Risk Audit Detected' : 'Audit Diagnostics Report'}
                </h3>
                <span className={`px-2 py-0.5 font-mono font-bold text-[11px] rounded-md flex-shrink-0 ${txDetails.riskScore > 50 ? 'bg-red-600 text-white' : 'bg-neutral-800 text-white'}`}>
                  Risk: {txDetails.riskScore}%
                </span>
              </div>
              <p className="text-xs font-medium text-neutral-700 leading-relaxed break-words">{txDetails.aiAnalysis.issue}</p>
            </div>
          </div>

          {/* RECEIPT IMAGE AND OCR CONTENT CARD */}
          <div className="bg-white border border-neutral-200 rounded-3xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 shadow-xs">
            {/* Left Box: Image Frame Preview */}
            <div className="bg-neutral-900 p-6 flex flex-col justify-between items-center text-center min-h-[260px] sm:min-h-[320px] relative">
              <span className="absolute top-3 left-3 bg-neutral-800 text-neutral-400 font-mono text-[9px] px-2 py-1 rounded-md">SUBMITTED_IMAGE.JPG</span>
              <FileText className="h-14 w-14 text-neutral-600 mx-auto my-auto" />
              {txDetails.riskScore > 50 && (
                <div className="w-full bg-red-500/20 text-red-400 border border-red-500/30 py-2 rounded-xl text-[11px] font-bold backdrop-blur-xs">
                  ⚠️ Edited Region Detected at Bottom
                </div>
              )}
            </div>

            {/* Right Box: Extracted Data Content */}
            <div className="p-5 md:p-6 space-y-5 flex flex-col justify-between bg-white border-t sm:border-t-0 sm:border-l border-neutral-100">
              <div>
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">AI OCR Extracted Data</span>
                <h4 className="text-lg font-black text-neutral-900 mt-1 truncate">{txDetails.merchant}</h4>
                <p className="text-xs text-neutral-400 font-medium mt-0.5">Pool: <span className="text-neutral-700 font-bold">{txDetails.pool}</span></p>
              </div>
              
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-neutral-100 pb-2">
                  <span className="text-neutral-400">Date</span> 
                  <span className="font-semibold text-neutral-800">{txDetails.date}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-2">
                  <span className="text-neutral-400">Location Sync</span> 
                  <span className={`font-semibold ${txDetails.riskScore > 50 ? 'text-red-600' : 'text-emerald-600'}`}>
                    {txDetails.riskScore > 50 ? 'Failed' : 'Passed'}
                  </span>
                </div>
              </div>

              <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200/60 mt-2">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tight block">Total Amount</span>
                <p className="text-xl font-black text-neutral-900 mt-0.5">₱{txDetails.amount.toLocaleString()}</p>
              </div>
            </div>
          </div>

        </div>

        {/* ================= DESKTOP SIDE PANEL CHAT (Hidden on Mobile) ================= */}
        <div className="hidden lg:flex bg-white border border-neutral-200 rounded-3xl p-5 flex-col justify-between h-[540px] shadow-xs">
          <div className="space-y-4 flex flex-col h-[calc(100%-60px)]">
            <div className="border-b border-neutral-100 pb-3">
              <h3 className="font-extrabold text-xs text-neutral-900 uppercase tracking-wide">Dispute & Clarification</h3>
              <p className="text-[11px] text-neutral-400 font-medium mt-0.5">Kausapin ang pamilya ukol sa {txDetails.id}.</p>
            </div>
            <div className="space-y-3 flex-1 overflow-y-auto pr-1 text-xs">
              <ChatMessagesList comments={comments} chatEndRef={chatEndRef} />
            </div>
          </div>
          <ChatInputField typedMessage={typedMessage} setTypedMessage={setTypedMessage} handleSubmitChat={handleSubmitChat} placeholder="Mag-iwan ng mensahe..." />
        </div>

      </div>

      {/* ================= MOBILE CHATHEAD EXPERIENCE ================= */}
      <div className="lg:hidden block">
        {/* Floating Chathead Trigger Button */}
        {!isMobileChatOpen && (
          <button 
            onClick={() => setIsMobileChatOpen(true)}
            className="fixed right-6 bottom-24 z-50 p-4 bg-neutral-900 text-white rounded-full shadow-2xl transition-all active:scale-95 border border-neutral-800 flex items-center justify-center animate-bounce"
          >
            <MessageSquare className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white text-[9px] font-bold flex items-center justify-center text-white">1</span>
          </button>
        )}

        {/* Floating Chat Window Modal Overlay */}
        {isMobileChatOpen && (
          <div className="fixed inset-x-4 bottom-24 z-50 bg-white border border-neutral-200 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-up h-[400px]">
            {/* Modal Header */}
            <div className="bg-neutral-900 text-white p-3.5 flex items-center justify-between">
              <div>
                <h3 className="font-black text-xs truncate">Dispute Chat ({txDetails.id})</h3>
                <p className="text-[10px] text-neutral-400 truncate">{txDetails.merchant}</p>
              </div>
              <button onClick={() => setIsMobileChatOpen(false)} className="p-1.5 hover:bg-white/10 rounded-full text-neutral-400 hover:text-white transition cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs bg-neutral-50/50">
              <ChatMessagesList comments={comments} chatEndRef={chatEndRef} />
            </div>

            {/* Modal Input Form */}
            <div className="p-2 bg-white border-t border-neutral-100">
              <ChatInputField typedMessage={typedMessage} setTypedMessage={setTypedMessage} handleSubmitChat={handleSubmitChat} placeholder="Sumulat ng tugon..." />
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

// Sub-component para sa Listahan ng Mensahe (Maiiwasan ang duplication ng code)
function ChatMessagesList({ comments, chatEndRef }) {
  if (comments.length === 0) {
    return (
      <div className="text-center text-neutral-400 py-12 text-[11px] font-medium">
        Walang nakaraang usapan sa transaksyong ito. Magsimula ng chat sa ibaba.
      </div>
    );
  }
  return (
    <>
      {comments.map((comment) => (
        <div 
          key={comment.id} 
          className={`flex flex-col max-w-[85%] space-y-1 ${comment.sender === 'ofw' ? 'ml-auto items-end' : 'items-start'}`}
        >
          <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-tight px-1">
            {comment.sender === 'system' ? '🤖 AI Auditor' : comment.sender === 'ofw' ? 'Ikaw' : 'Pamilya'}
          </span>
          <div className={`p-2.5 rounded-2xl font-medium leading-relaxed ${
            comment.sender === 'ofw' 
              ? 'bg-neutral-900 text-white rounded-tr-none' 
              : 'bg-neutral-100 text-neutral-800 rounded-tl-none'
          }`}>
            {comment.text}
          </div>
        </div>
      ))}
      <div ref={chatEndRef} />
    </>
  );
}

// Sub-component para sa Input Box area
function ChatInputField({ typedMessage, setTypedMessage, handleSubmitChat, placeholder }) {
  return (
    <form onSubmit={handleSubmitChat} className="flex items-center space-x-2 w-full">
      <input 
        type="text"
        placeholder={placeholder}
        value={typedMessage}
        onChange={(e) => setTypedMessage(e.target.value)}
        className="flex-1 bg-neutral-50 border border-neutral-200 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white font-medium"
      />
      <button type="submit" className="p-2.5 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition active:scale-95 cursor-pointer flex-shrink-0">
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}