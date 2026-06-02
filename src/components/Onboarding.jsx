import { useState } from 'react';
import { rolesData } from '../data/rolesData';

export default function Onboarding({ onComplete }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('AI Engineer');
  const [level, setLevel] = useState('Intermediate');
  const [animating, setAnimating] = useState(false);

  const roles = Object.keys(rolesData);

  const handleStart = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setAnimating(true);
    setTimeout(() => {
      onComplete(role, level);
    }, 600);
  };

  return (
    <div className={`flex-1 flex flex-col items-center justify-center transition-all duration-500 ease-in-out py-8 ${animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      <div className="text-center mb-8 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          AI Employment Simulator
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
          Experience a job <br/>
          <span className="text-gradient">before getting a job.</span>
        </h1>
        <p className="text-slate-400 text-lg">Join an AI-generated virtual company. Chat dynamically with AI managers and get your code reviewed by real intelligence.</p>
      </div>

      <form onSubmit={handleStart} className="glass-panel w-full max-w-md rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative corner glows inside the card */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-[40px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 blur-[40px] pointer-events-none"></div>

        <div className="relative z-10 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="e.g. Alex Johnson"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Target Career Role</label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
            >
              {roles.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Experience Level</label>
            <div className="grid grid-cols-3 gap-2">
              {['Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={`py-2 px-1 text-sm font-medium rounded-lg border transition-all ${
                    level === lvl 
                    ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' 
                    : 'bg-slate-900/30 border-slate-700 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform transition-all active:scale-95 mt-4"
          >
            Join Virtual Company
          </button>
        </div>
      </form>
    </div>
  );
}

