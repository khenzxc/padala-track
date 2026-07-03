import React, { useState, useEffect, useRef } from 'react';
import { Send, AlertTriangle, CheckCircle2, ShieldAlert, ArrowLeft, MessageSquare } from 'lucide-react';

export default function DisputeCenterPage({ transactions, allConversations, onSendComment }) {
  // Kunin lang ang mga transaksyon na kasalukuyang may active thread sa data structure
  const disputeTxList = transactions.filter(tx => allConversations[tx.id]);
  
  // Default active thread ay null sa mobile para ipakita muna ang listahan ng usapan
  const [activeTxId, setActiveTxId] = useState(disputeTxList[0]?.id || null);
  // State para malaman kung aktibo ang chat view sa mobile screen
  const [showChatMobile, setShowChatMobile] = useState(false);
  
  const [typedMessage, setTypedMessage] = useState('');
  const chatEndRef = useRef(null);

  const activeTx = transactions.find(t => t.id === activeTxId);
  const activeChatLog = allConversations[activeTxId] || [];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChatLog, showChatMobile]);

  // Awtomatikong buksan ang chat kapag may default active thread sa desktop screen size
  useEffect(() => {
    if (activeTxId && !showChatMobile) {
      // Hinahayaan lang natin ito para sa desktop view initialization
    }
  }, [activeTxId]);

  const handleSelectThread = (txId) => {
    setActiveTxId(txId);
    setShowChatMobile(true); // Lilipat sa Chat Box view pagdating sa mobile
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!typedMessage.trim() || !activeTxId) return;

    onSendComment(activeTxId, typedMessage);
    setTypedMessage('');
  };

  if (disputeTxList.length === 0) {
    return (
      <div className="bg-white border border-neutral-200 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-3">
        <div className="mx-auto bg-emerald-50 text-emerald-600 p-3 rounded-full w-fit">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-neutral-900">Walang Bukas na Dispute</h3>
        <p className="text-xs text-neutral-400 font-medium">Lahat ng isinumiteng resibo ng iyong pamilya ay ligtas at awtomatikong na-verify ng AI scan engine.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:grid md:grid-cols-3 gap-6 h-[calc(100vh-12rem)] md:h-[600px] items-stretch animate-fade-in font-sans pb-16 md:pb-0">
      
      {/* KALIWANG PANEL: LISTAHAN NG CHAT THREADS */}
      {/* Itatago sa mobile (`hidden md:block`) kapag kasalukuyang binabasa ang chat log */}
      <div className={`${showChatMobile ? 'hidden md:flex' : 'flex'} flex-col bg-white border border-neutral-200 rounded-3xl p-4 space-y-3 overflow-y-auto h-full`}>
        <div className="flex items-center space-x-2 px-2">
          <MessageSquare className="h-4 w-4 text-neutral-400" />
          <h3 className="text-xs font-extrabold text-neutral-400 uppercase tracking-wider">Active Conversations</h3>
        </div>
        <div className="space-y-1 overflow-y-auto flex-1 pr-0.5">
          {disputeTxList.map((tx) => {
            const lastMsg = allConversations[tx.id]?.[allConversations[tx.id].length - 1];
            const isSelected = activeTxId === tx.id;
            return (
              <button
                key={tx.id}
                onClick={() => handleSelectThread(tx.id)}
                className={`w-full text-left p-3.5 rounded-2xl flex flex-col space-y-1 transition-all cursor-pointer ${
                  isSelected ? 'bg-neutral-900 text-white shadow-md' : 'hover:bg-neutral-50 bg-white border border-neutral-100'
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className={`text-[11px] font-mono font-bold ${isSelected ? 'text-blue-400' : 'text-neutral-500'}`}>{tx.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                    isSelected ? 'bg-white/10 text-white' : 'bg-rose-50 text-rose-700'
                  }`}>₱{tx.amount.toLocaleString()}</span>
                </div>
                <h4 className="text-xs font-extrabold truncate w-full">{tx.merchant}</h4>
                {lastMsg && (
                  <p className={`text-[11px] truncate w-full ${isSelected ? 'text-neutral-300' : 'text-neutral-400'}`}>
                    {lastMsg.sender === 'ofw' ? 'Ikaw: ' : lastMsg.sender === 'system' ? '🤖: ' : 'Pamilya: '} {lastMsg.text}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* KANANG PANEL: ACTIVE DISPUTE CHAT BOX */}
      {/* Itatago naman sa mobile screen (`hidden md:flex`) kapag bumalik sa thread lists view */}
      <div className={`${!showChatMobile ? 'hidden md:flex' : 'flex'} md:col-span-2 bg-white border border-neutral-200 rounded-3xl p-4 md:p-5 flex flex-col justify-between h-full relative`}>
        {activeTx ? (
          <>
            {/* Header Informational Banner */}
            <div className="border-b border-neutral-100 pb-3 flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0">
                {/* Back button para sa mobile screens */}
                <button 
                  onClick={() => setShowChatMobile(false)}
                  className="p-2 -ml-2 hover:bg-neutral-100 text-neutral-500 rounded-xl md:hidden block cursor-pointer"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="truncate">
                  <h3 className="font-black text-sm text-neutral-900 truncate">{activeTx.merchant}</h3>
                  <p className="text-[11px] text-neutral-400 font-medium truncate">
                    Pool: <span className="text-neutral-700 font-bold">{activeTx.pool}</span>
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-xs font-mono font-bold text-neutral-400 block">{activeTx.id}</span>
                <span className="text-[10px] text-rose-600 font-semibold inline-flex items-center gap-1">
                  <ShieldAlert className="h-3 w-3" /> {activeTx.status}
                </span>
              </div>
            </div>

            {/* Chat Conversation Logs */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1 text-xs max-h-[calc(100vh-25rem)] md:max-h-full">
              {activeChatLog.map((comment) => (
                <div 
                  key={comment.id} 
                  className={`flex flex-col max-w-[85%] md:max-w-[80%] space-y-1 ${
                    comment.sender === 'ofw' ? 'ml-auto items-end' : comment.sender === 'system' ? 'mx-auto items-center text-center w-full max-w-full' : 'items-start'
                    }`}
                >
                  <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-tight px-1">
                    {comment.sender === 'system' ? '🤖 AI Core Scan' : comment.sender === 'ofw' ? 'Ikaw (OFW)' : 'Pamilya'}
                  </span>
                  <div className={`p-3 rounded-2xl font-medium leading-relaxed ${
                    comment.sender === 'ofw' 
                      ? 'bg-neutral-900 text-white rounded-tr-none' 
                      : comment.sender === 'system'
                      ? 'bg-red-50 text-red-700 border border-red-100 rounded-xl text-center w-full'
                      : 'bg-neutral-100 text-neutral-800 rounded-tl-none'
                  }`}>
                    {comment.text}
                  </div>
                  <span className="text-[9px] text-neutral-400 px-1">{comment.time}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Form Input Messenger Area */}
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2 pt-3 border-t border-neutral-100 bg-white">
              <input 
                type="text"
                placeholder="Magpadala ng mensahe..."
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                className="flex-1 bg-neutral-50 border border-neutral-200 text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white font-medium"
              />
              <button type="submit" className="p-3 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition active:scale-95 cursor-pointer">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="my-auto text-center text-neutral-400 text-xs">Pumili ng thread sa kaliwa upang simulan ang pag-uusap.</div>
        )}
      </div>

    </div>
  );
}