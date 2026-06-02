import { useState, useEffect, useRef } from 'react';
import { generateChatResponse } from '../services/gemini';

export default function Workspace({ roleData, apiKey, onComplete }) {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'files', 'submit'
  const [messages, setMessages] = useState([
    { sender: 'AI PM', text: `Welcome to the team! I've pinned the requirements in the files tab.`, time: '09:00 AM', isSystem: false },
    { sender: 'AI Tech Lead', text: `Let me know if you need help with the architecture constraints.`, time: '09:05 AM', isSystem: false }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [twistActive, setTwistActive] = useState(false);
  const [twistDismissed, setTwistDismissed] = useState(false);
  const chatContainerRef = useRef(null);

  // File Submission State
  const [codeUrl, setCodeUrl] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTwistActive(true);
      setMessages(prev => [
        ...prev,
        { sender: roleData.midwayTwist.from, text: roleData.midwayTwist.message, time: 'URGENT', isSystem: true, isTwist: true }
      ]);
    }, 15000);
    return () => clearTimeout(timer);
  }, [roleData]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const newMsg = { sender: 'You', text: chatInput, time: 'Now', isSystem: false };
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setChatInput('');
    setIsTyping(true);
    
    const reply = await generateChatResponse(updatedMessages, roleData, apiKey);
    
    setMessages(prev => [...prev, { 
      sender: reply.sender, 
      text: reply.text, 
      time: 'Now', 
      isSystem: false 
    }]);
    setIsTyping(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete({ codeUrl, comments });
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row gap-6 animate-in slide-in-from-bottom-4 duration-500 h-full min-h-0 pb-2 md:pb-4">
      
      {/* Twist Modal Overlay */}
      {twistActive && !twistDismissed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-red-500/50 p-8 rounded-2xl max-w-lg w-full shadow-[0_0_50px_rgba(239,68,68,0.2)] animate-in zoom-in duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 animate-pulse">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Client Requirement Change!</h2>
            </div>
            <p className="text-slate-300 mb-6 italic border-l-4 border-red-500 pl-4 py-2 bg-red-500/5 rounded-r-lg">
              "{roleData.midwayTwist.message}"
            </p>
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-slate-400 mb-2">Impacts:</h4>
              <ul className="list-disc pl-5 text-sm text-slate-300">
                {roleData.midwayTwist.impacts.map((imp, idx) => (
                  <li key={idx}>{imp}</li>
                ))}
              </ul>
            </div>
            <button 
              onClick={() => setTwistDismissed(true)}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl transition-colors"
            >
              Acknowledge & Adapt
            </button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="w-full md:w-64 flex flex-col gap-2 h-full">
        <button onClick={() => setActiveTab('chat')} className={`text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'chat' ? 'bg-indigo-500/20 border border-indigo-500/50 text-indigo-300' : 'hover:bg-slate-800/50 text-slate-400'}`}>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
            Team Chat {twistActive && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse ml-auto"></span>}
          </div>
        </button>
        <button onClick={() => setActiveTab('files')} className={`text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'files' ? 'bg-indigo-500/20 border border-indigo-500/50 text-indigo-300' : 'hover:bg-slate-800/50 text-slate-400'}`}>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Project Brief
          </div>
        </button>
        <button onClick={() => setActiveTab('submit')} className={`text-left px-4 py-3 rounded-xl transition-all mt-auto ${activeTab === 'submit' ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300' : 'hover:bg-slate-800/50 text-slate-400 border border-slate-700/50'}`}>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            Submit Work
          </div>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 glass-panel rounded-2xl overflow-hidden flex flex-col h-full">
        
        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <>
            <div className="border-b border-white/10 p-4 bg-slate-900/50">
              <h2 className="font-semibold text-white flex items-center gap-2">
                <span className="text-slate-400">#</span> project-general
              </h2>
            </div>
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-4 ${msg.sender === 'You' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm ${msg.sender === 'You' ? 'bg-indigo-500 text-white' : msg.isTwist ? 'bg-red-500/20 text-red-500' : 'bg-slate-700 text-slate-300'}`}>
                    {msg.sender.substring(0,2).toUpperCase()}
                  </div>
                  <div className={`flex flex-col max-w-[80%] ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-baseline gap-2 mb-1">
                       <span className="font-medium text-sm text-slate-300">{msg.sender}</span>
                       <span className="text-xs text-slate-500">{msg.time}</span>
                    </div>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'You' ? 'bg-indigo-600 text-white rounded-tr-none' : msg.isTwist ? 'bg-red-500/10 border border-red-500/30 text-white rounded-tl-none' : 'bg-slate-800 text-slate-200 rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm bg-slate-700 text-slate-300">
                    AI
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-slate-800 text-slate-200 rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 bg-slate-900/50 border-t border-white/5 flex gap-2">
              <input 
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                disabled={isTyping || !apiKey}
                placeholder={apiKey ? "Message #project-general..." : "API Key Required to Chat"}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
              />
              <button type="submit" disabled={isTyping || !apiKey} className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white p-2.5 rounded-xl transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </button>
            </form>
          </>
        )}

        {/* Files Tab */}
        {activeTab === 'files' && (
          <div className="p-8 overflow-y-auto h-full">
            <h2 className="text-2xl font-bold text-white mb-6">Project Specifications</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-indigo-400 mb-3 border-b border-white/10 pb-2">Product Requirements</h3>
                <ul className="space-y-3">
                  {roleData.pmRequirements.map((req, i) => (
                    <li key={i} className="flex gap-3 text-slate-300 bg-slate-800/30 p-3 rounded-lg border border-white/5">
                      <svg className="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      {req}
                    </li>
                  ))}
                  {twistDismissed && (
                     <li className="flex gap-3 text-white bg-red-500/10 p-3 rounded-lg border border-red-500/30">
                     <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                     <span className="font-medium text-red-200">NEW:</span> {roleData.midwayTwist.impacts.join(', ')}
                   </li>
                  )}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-teal-400 mb-3 border-b border-white/10 pb-2">Technical Constraints</h3>
                <ul className="space-y-3">
                  {roleData.techConstraints.map((con, i) => (
                    <li key={i} className="flex gap-3 text-slate-300 bg-slate-800/30 p-3 rounded-lg border border-white/5">
                      <svg className="w-5 h-5 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Submit Tab */}
        {activeTab === 'submit' && (
          <div className="p-8 h-full flex flex-col justify-center w-full overflow-y-auto">
            <div className="text-center mb-6 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-2">Ready to submit?</h2>
              <p className="text-slate-400 text-sm">The AI Reviewer Agent will read your code snippets and evaluate your project based on the constraints and requirements.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5 flex-1 max-w-3xl mx-auto w-full">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Repository / App URL (Optional)</label>
                <input 
                  type="url" 
                  value={codeUrl}
                  onChange={e => setCodeUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                />
              </div>
              
              <div className="flex-1 flex flex-col">
                <label className="block text-sm font-medium text-slate-300 mb-1">Implementation Notes & Code Snippets</label>
                <textarea 
                  required
                  value={comments}
                  onChange={e => setComments(e.target.value)}
                  placeholder="Paste your core logic here or explain your architecture so the AI Reviewer can evaluate it..."
                  className="w-full flex-1 min-h-[200px] bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none font-mono text-xs"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] transform transition-all active:scale-95"
              >
                Submit for AI Evaluation
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
