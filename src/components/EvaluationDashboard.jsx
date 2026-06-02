import { useState, useEffect } from 'react';
import { evaluateSubmission } from '../services/gemini';

export default function EvaluationDashboard({ roleData, submission, apiKey, onRestart }) {
  const [analyzing, setAnalyzing] = useState(true);
  const [scoreCounter, setScoreCounter] = useState(0);
  const [evalData, setEvalData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    async function runEval() {
      try {
        const result = await evaluateSubmission(submission, roleData, apiKey);
        if (isMounted) {
          setEvalData(result);
          setAnalyzing(false);
          
          // Animate the score counting up
          let currentScore = 0;
          const targetScore = result.score || roleData.evaluation.score;
          const interval = setInterval(() => {
            currentScore += 2;
            if (currentScore >= targetScore) {
              setScoreCounter(targetScore);
              clearInterval(interval);
            } else {
              setScoreCounter(currentScore);
            }
          }, 20);
        }
      } catch (e) {
        if (isMounted) {
          console.error(e);
          setErrorMsg("Failed to connect to AI Reviewer. Check API Key.");
          setEvalData(roleData.evaluation); // Fallback
          setAnalyzing(false);
        }
      }
    }
    
    runEval();
    
    return () => { isMounted = false; };
  }, [roleData, submission, apiKey]);

  if (analyzing) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full animate-ping"></div>
          <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 text-gradient">AI Reviewer is analyzing your submission...</h2>
        <p className="text-slate-400 font-mono text-sm animate-pulse-slow">Evaluating architecture, code quality, and adaptability.</p>
      </div>
    );
  }

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scoreCounter / 100) * circumference;
  
  const strengths = evalData?.strengths || roleData.evaluation.strengths;
  const weaknesses = evalData?.weaknesses || roleData.evaluation.weaknesses;

  return (
    <div className="flex-1 overflow-y-auto animate-in fade-in zoom-in-95 duration-700 pb-12">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-white mb-2">Industry Readiness Report</h2>
        <p className="text-slate-400 text-lg">Your performance has been evaluated by the AI Senior Engineer.</p>
        {errorMsg && <p className="text-red-400 text-sm mt-2">{errorMsg}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
        {/* Core Score Card */}
        <div className="glass-panel p-8 rounded-3xl flex flex-col items-center justify-center text-center col-span-1 lg:col-span-1 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px]"></div>
          
          <h3 className="text-lg font-semibold text-slate-300 mb-6">Overall Score</h3>
          
          <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
            <svg className="transform -rotate-90 w-48 h-48">
              <circle cx="96" cy="96" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
              <circle cx="96" cy="96" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="text-indigo-500 transition-all duration-1000 ease-out" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-white">{scoreCounter}</span>
              <span className="text-sm text-slate-400 mt-1">/100</span>
            </div>
          </div>
          
          <div className="bg-indigo-500/20 border border-indigo-500/50 text-indigo-300 px-4 py-2 rounded-xl font-semibold text-sm">
            {evalData?.level || roleData.evaluation.level}
          </div>
        </div>

        {/* Skill Passport Details */}
        <div className="glass-panel p-8 rounded-3xl col-span-1 lg:col-span-2 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-500/10 blur-[60px]"></div>
          
          <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Performance Analysis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-emerald-400 font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Demonstrated Strengths
              </h4>
              <ul className="space-y-3">
                {strengths.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
                    <span className="text-slate-300 text-sm leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-amber-400 font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                Areas for Growth
              </h4>
              <ul className="space-y-3">
                {weaknesses.map((w, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></span>
                    <span className="text-slate-300 text-sm leading-relaxed">{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Next Challenge (Career Coach) */}
        <div className="glass-panel p-8 rounded-3xl col-span-1 lg:col-span-3 bg-gradient-to-r from-slate-900 to-indigo-950/50 border border-indigo-500/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-1">Career Coach Agent</h3>
              <p className="text-xl font-semibold text-white mb-2">Recommended Next Project</p>
              <p className="text-slate-300 text-sm leading-relaxed">{evalData?.nextChallenge || roleData.evaluation.nextChallenge}</p>
            </div>
            <button 
              onClick={onRestart}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl transition-colors whitespace-nowrap font-medium text-sm"
            >
              Start New Simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
