import { useState, useEffect } from 'react';

export default function CompanyCreation({ roleData, onComplete }) {
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState('');
  
  // Simulated steps of company setup
  const steps = [
    "Initializing Career Agent...",
    `Analyzing target role: ${roleData?.company?.industry} industry...`,
    `Generating Virtual Company: ${roleData?.company?.name}`,
    "Booting AI CEO, AI Product Manager, and AI Tech Lead...",
    "Setup Complete."
  ];

  useEffect(() => {
    if (step < steps.length) {
      let currentText = steps[step];
      let i = 0;
      setTyping('');
      
      const interval = setInterval(() => {
        setTyping(prev => prev + currentText.charAt(i));
        i++;
        if (i >= currentText.length) {
          clearInterval(interval);
          setTimeout(() => setStep(s => s + 1), 800);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [step]);

  if (!roleData) return null;

  return (
    <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
      
      {step < steps.length ? (
        <div className="glass-panel w-full max-w-2xl rounded-2xl p-8 shadow-2xl font-mono text-sm text-emerald-400">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-slate-500">system_init.sh</span>
          </div>
          
          <div className="space-y-3 min-h-[150px]">
            {steps.slice(0, step).map((s, idx) => (
              <div key={idx} className="flex gap-3 text-slate-300">
                <span className="text-emerald-500">➜</span>
                <span>{s}</span>
              </div>
            ))}
            {step < steps.length && (
              <div className="flex gap-3">
                <span className="text-emerald-500 animate-pulse">➜</span>
                <span>{typing}<span className="animate-pulse">_</span></span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl space-y-6 animate-in slide-in-from-bottom-8 fade-in duration-700">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome to {roleData.company.name}</h2>
            <p className="text-slate-400">Here is your project kickoff brief.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CEO Card */}
            <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">CEO</div>
                <h3 className="font-semibold text-lg text-white">Mission</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                "{roleData.company.mission}"
              </p>
            </div>

            {/* PM Card */}
            <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400">PM</div>
                <h3 className="font-semibold text-lg text-white">Requirements</h3>
              </div>
              <ul className="text-sm text-slate-300 space-y-2">
                {roleData.pmRequirements.map((req, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-violet-400 mt-0.5">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Lead Card */}
            <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400">Tech</div>
                <h3 className="font-semibold text-lg text-white">Constraints</h3>
              </div>
              <ul className="text-sm text-slate-300 space-y-2">
                {roleData.techConstraints.map((con, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-teal-400 mt-0.5">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="mt-10 flex justify-center">
            <button 
              onClick={onComplete}
              className="bg-white text-slate-900 hover:bg-slate-200 font-bold py-3 px-8 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all transform active:scale-95 flex items-center gap-2"
            >
              Acknowledge & Enter Workspace
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
