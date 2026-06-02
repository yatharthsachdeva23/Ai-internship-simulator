import { useState } from 'react';
import Onboarding from './components/Onboarding';
import CompanyCreation from './components/CompanyCreation';
import Workspace from './components/Workspace';
import EvaluationDashboard from './components/EvaluationDashboard';
import { rolesData } from './data/rolesData';

function App() {
  const [phase, setPhase] = useState(0);
  const [role, setRole] = useState(null);
  const [level, setLevel] = useState('Intermediate');
  const [submission, setSubmission] = useState(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  const roleData = role ? rolesData[role] : null;

  return (
    <div className={`bg-slate-950 text-slate-100 flex flex-col font-sans relative ${phase > 0 && phase < 3 ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      
      {/* Dynamic Background Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Content Area */}
      <main className={`flex-1 relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col ${phase > 0 && phase < 3 ? 'py-4 md:py-6 h-full overflow-hidden' : 'py-8 md:px-8'}`}>
        {/* Header (Visible after onboarding) */}
        {phase > 0 && (
          <header className="w-full flex justify-between items-center mb-6 glass-panel px-6 py-4 rounded-2xl flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-lg shadow-lg">
                {roleData?.company.name.charAt(0) || "A"}
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white m-0 leading-tight">{roleData?.company.name}</h1>
                <p className="text-xs text-indigo-300 font-medium">Virtual Company Simulator</p>
              </div>
            </div>
            <div className="flex gap-2 text-sm font-medium bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/5">
              <span className="text-slate-400">Role:</span>
              <span className="text-white">{role}</span>
            </div>
          </header>
        )}

        {/* Phase Routing */}
        <div className="flex-1 flex flex-col min-h-0">
          {phase === 0 && (
            <Onboarding 
              onComplete={(selectedRole, selectedLevel) => {
                setRole(selectedRole);
                setLevel(selectedLevel);
                setPhase(1);
              }} 
            />
          )}
          {phase === 1 && (
            <CompanyCreation 
              roleData={roleData} 
              onComplete={() => setPhase(2)} 
            />
          )}
          {phase === 2 && (
            <Workspace 
              roleData={roleData}
              apiKey={apiKey}
              onComplete={(submitData) => {
                setSubmission(submitData);
                setPhase(3);
              }} 
            />
          )}
          {phase === 3 && (
            <EvaluationDashboard 
              roleData={roleData} 
              submission={submission}
              apiKey={apiKey}
              onRestart={() => setPhase(0)}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
