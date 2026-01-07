
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { 
  Zap, LayoutDashboard, Home, Settings, 
  Video, Share2, Target, BrainCircuit, GitBranch, 
  ArrowRight, Sparkles, TrendingUp, Sun, Moon, Shield, Cpu, Globe, 
  Image as ImageIcon, X, Activity, BarChart3, Clock, Play, Terminal,
  Layers, Database, MessageSquare, ZapOff, FileText, Wand2, Instagram, Twitter, Music2
} from 'lucide-react';

import StatsOverview from './components/StatsOverview';
import ProjectTaskRow from './components/ProjectTaskRow';
import WorkflowCard from './components/WorkflowCard';

interface Agent {
  name: string;
  role: string;
  mission: string;
  icon: React.ReactNode;
  color: string;
  performance: number;
  tasks: string[];
}

interface Workflow {
  name: string;
  type: string;
  status: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  steps: string[];
  logs?: string[];
}

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<'home' | 'dashboard' | 'tasks' | 'agents' | 'workflows' | 'settings'>('home');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('app-theme');
    return (saved as 'light' | 'dark') || 'dark';
  });
  
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const agentDrawerRef = useRef<HTMLDivElement>(null);
  const workflowDrawerRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', theme === 'light');
  }, [theme]);

  const activeWorkflows: Workflow[] = [
    { 
      name: 'Create Doc Tool', 
      type: 'Automation Document', 
      status: 'active', 
      icon: <FileText />, 
      color: '#4285F4', 
      description: 'Génération automatique de Google Docs à partir de titres et contenus dynamiques.',
      steps: ['Trigger Workflow', 'Google Docs: Create document', 'Google Docs: Update document', 'Set: Edit Fields'],
      logs: ['[n8n] Workflow KWsy9aPUNkLxzMPV triggered', '[GoogleDocs] Document ID created: 1dgxFHK...', '[Set] Response field mapping complete']
    },
    { 
      name: 'Create Image Tool', 
      type: 'AI Visual Generation', 
      status: 'active', 
      icon: <ImageIcon />, 
      color: '#10B981', 
      description: 'Génération d\'images via DALL-E/OpenAI avec conversion binaire et upload Drive/Telegram.',
      steps: ['Trigger Workflow', 'HTTP: Generate Image (OpenAI)', 'Convert to File', 'Upload file (Drive)', 'Telegram: Send Photo'],
      logs: ['[OpenAI] Model gpt-image-1 processing prompt', '[Binary] Converting b64_json to image/png', '[Telegram] Media sent to chatID']
    },
    { 
      name: 'Create Video Tool', 
      type: 'AI Video Generation', 
      status: 'active', 
      icon: <Video />, 
      color: '#3B82F6', 
      description: 'Production vidéo via Fal.ai Veo3 avec gestion d\'aspect ratio et polling de résultat.',
      steps: ['Trigger Workflow', 'HTTP: Generate Video (Fal.ai)', 'Wait: 1 Minute', 'HTTP: Get Result', 'Download File', 'Telegram: Send Video'],
      logs: ['[Fal.ai] Request ID: veo3-fast-123', '[Wait] Polling for generation complete...', '[Drive] Uploading mp4 to Media folder']
    },
    { 
      name: 'Instagram Post', 
      type: 'Social Distribution', 
      status: 'active', 
      icon: <Instagram />, 
      color: '#E4405F', 
      description: 'Upload de médias via Blotato et publication directe sur Instagram.',
      steps: ['Trigger Workflow', 'Blotato: Upload media', 'Blotato: Instagram Post'],
      logs: ['[Blotato] Uploading drive-id: 1dgxFH...', '[Instagram] Posting to account: the_plaiground', '[Success] Post live at 14:02']
    },
    { 
      name: 'Edit Image Tool', 
      type: 'AI Visual Editing', 
      status: 'active', 
      icon: <Wand2 />, 
      color: '#F59E0B', 
      description: 'Modification d\'images existantes via OpenAI (Image Edits) avec téléchargement source Drive.',
      steps: ['Trigger Workflow', 'Drive: Download', 'HTTP: Edit Image (OpenAI)', 'Convert to File', 'Telegram: Send Photo'],
      logs: ['[Drive] Fetching source image...', '[OpenAI] Applying prompt-based edit', '[System] Image reconstructed']
    },
    { 
      name: 'Image to Video Tool', 
      type: 'AI Motion Production', 
      status: 'active', 
      icon: <Zap />, 
      color: '#8B5CF6', 
      description: 'Transformation d\'une image statique en vidéo cinématique via Fal.ai.',
      steps: ['Trigger Workflow', 'Drive: Share file', 'Drive: Download file', 'HTTP: Get URL (ImgBB)', 'HTTP: Generate Video'],
      logs: ['[ImgBB] Generating public URL for Fal.ai', '[Fal.ai] Processing Image-to-Video', '[Wait] Finalizing VFX rendering']
    },
    { 
      name: 'X Post', 
      type: 'Social Distribution', 
      status: 'active', 
      icon: <Twitter />, 
      color: '#1DA1F2', 
      description: 'Distribution de contenu sur la plateforme X (Twitter) via Blotato.',
      steps: ['Trigger Workflow', 'Blotato: Upload media', 'Blotato: X (Twitter) Post'],
      logs: ['[Blotato] Media processing...', '[X] Posting to @nateherk', '[API] Status: 201 Created']
    },
    { 
      name: 'Ultimate Media Agent', 
      type: 'Orchestrator Agent', 
      status: 'active', 
      icon: <BrainCircuit />, 
      color: '#FFFFFF', 
      description: 'Le cerveau central : gère Telegram, délègue aux sous-agents (Drive, Email, Creative).',
      steps: ['Telegram Trigger', 'Switch: Photo vs Text', 'Drive: Upload file', 'Agent: Ultimate Media Manager', 'Code: Clean Up', 'Google Sheets: Update Log'],
      logs: ['[Agent] Analyzing user intent...', '[Memory] Context retrieved for session', '[Delegate] Calling Creative Agent workflow']
    },
    { 
      name: 'TikTok Post Tool', 
      type: 'Social Distribution', 
      status: 'active', 
      icon: <Music2 />, 
      color: '#000000', 
      description: 'Publication de vidéos sur TikTok avec marquage AI Generated.',
      steps: ['Trigger Workflow', 'Blotato: Upload media', 'Blotato: TikTok Post'],
      logs: ['[Blotato] Uploading mp4...', '[TikTok] Applying AI-Generated flag', '[Success] Video queued']
    }
  ];

  const specializedAgents: Agent[] = [
    { 
      name: 'Neo-Genesis', 
      role: 'Générateur de Médias', 
      mission: 'Création de vidéos cinématiques et rendus 3D temps réel pour les campagnes marketing de luxe.', 
      icon: <Video />, 
      color: '#3B82F6',
      performance: 98,
      tasks: ['Rendu Séquence #12', 'Upscaling Neural 8K', 'Color Grading Auto-Log']
    },
    { 
      name: 'Social-Sentinel', 
      role: 'Analyste de Diffusion', 
      mission: 'Monitoring des tendances mondiales et distribution optimisée sur 12 plateformes simultanées.', 
      icon: <Share2 />, 
      color: '#10B981',
      performance: 92,
      tasks: ['Analyse Sentiment Twitter', 'Optimisation Algorithme IG', 'Post Schedule FB']
    }
  ];

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(pageRef.current, 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power4.out" }
      );
    }
  }, [activePage]);

  useEffect(() => {
    const el = selectedWorkflow ? workflowDrawerRef.current : selectedAgent ? agentDrawerRef.current : null;
    if (el) {
      gsap.fromTo(el, { x: '100%' }, { x: '0%', duration: 0.6, ease: "expo.out" });
    }
  }, [selectedAgent, selectedWorkflow]);

  return (
    <div className={`flex h-screen bg-app-bg text-primary overflow-hidden font-['Plus_Jakarta_Sans'] transition-colors duration-500`}>
      
      {/* SIDEBAR */}
      <aside className="w-[100px] border-r border-white/10 dark:border-white/5 flex flex-col items-center py-12 gap-12 bg-sidebar-bg shrink-0 z-50">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 transition-transform" onClick={() => setActivePage('home')}>
          <Zap size={32} fill="white" strokeWidth={2.5} />
        </div>
        <nav className="flex flex-col gap-10">
          {[{ id: 'home', icon: <Home size={28} />, label: 'Accueil' }, { id: 'dashboard', icon: <LayoutDashboard size={28} />, label: 'Dashboard' }, { id: 'agents', icon: <BrainCircuit size={28} />, label: 'Experts' }, { id: 'workflows', icon: <GitBranch size={28} />, label: 'Production' }].map((item) => (
            <button key={item.id} onClick={() => setActivePage(item.id as any)} className={`p-4 rounded-[24px] transition-all relative group flex items-center justify-center ${activePage === item.id ? 'bg-blue-600 text-white nav-active-glow shadow-blue-500/20 shadow-lg' : 'text-nav-inactive hover:text-primary hover:bg-white/5'}`}>
              {item.icon}
            </button>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-8">
          <button onClick={toggleTheme} className="p-4 rounded-[24px] text-nav-inactive hover:text-primary transition-all flex items-center justify-center hover:bg-white/5">{theme === 'dark' ? <Sun size={28} /> : <Moon size={28} />}</button>
          <button className="p-4 rounded-[24px] flex items-center justify-center transition-all text-nav-inactive hover:text-primary"><Settings size={28} /></button>
        </div>
      </aside>

      <div ref={pageRef} className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-28 border-b border-white/10 dark:border-white/5 px-16 flex items-center justify-between shrink-0 glass z-20">
          <div className="flex items-center gap-6">
             <div className="w-2.5 h-10 bg-blue-600 rounded-full shadow-lg shadow-blue-500/30"></div>
             <h2 className="text-3xl font-black capitalize tracking-tighter uppercase text-primary">{activePage}</h2>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black uppercase text-secondary tracking-widest">Nate Herk</p>
              <p className="text-xs font-bold text-blue-500">Premium Admin</p>
            </div>
            <div className="w-14 h-14 rounded-2xl border border-white/20 dark:border-white/10 p-0.5 overflow-hidden shadow-xl">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nate" className="w-full h-full object-cover" alt="avatar" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto custom-scrollbar relative flex flex-col">
          {activePage === 'home' && (
            <div ref={heroRef} className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
              <div className="absolute top-[-10%] left-[10%] w-[50%] h-[50%] bg-blue-500 custom-glow rounded-full"></div>
              <div className="absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] bg-purple-500 custom-glow rounded-full"></div>
              <div className="hero-content relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center justify-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border-blue-500/20 text-blue-500 text-[11px] font-black uppercase tracking-[0.3em] shadow-xl mb-12"><Sparkles size={16} /> Intelligence Artificielle de Nouvelle Génération</div>
                <h1 className="hero-title text-6xl md:text-9xl font-black tracking-tighter uppercase italic text-primary">Ultimate <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Media Agent</span></h1>
                <p className="hero-subtitle text-lg md:text-2xl text-secondary max-w-3xl mx-auto font-medium leading-relaxed mt-10">Pilotez votre écosystème n8n avec une interface haute performance.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-16 w-full">
                  <button onClick={() => setActivePage('workflows')} className="btn-primary-action px-14 py-6 rounded-[24px] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-4 transition-all hover:scale-[1.05] shadow-2xl min-w-[280px]">Lancer les Workflows <ArrowRight size={22} /></button>
                  <button onClick={() => setActivePage('dashboard')} className="glass px-14 py-6 rounded-[24px] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-4 transition-all hover:bg-white/10 text-primary min-w-[280px]">Dashboard Analytique</button>
                </div>
              </div>
            </div>
          )}

          {activePage === 'workflows' && (
            <div className="p-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {activeWorkflows.map((w, i) => (
                 <WorkflowCard key={i} {...w} onClick={() => setSelectedWorkflow(w)} />
               ))}
            </div>
          )}

          {activePage === 'agents' && (
             <div className="p-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {specializedAgents.map((agent, i) => (
                  <div key={i} onClick={() => setSelectedAgent(agent)} className="glass p-10 rounded-[45px] flex flex-col items-center text-center group hover:border-blue-500/30 transition-all cursor-pointer hover:translate-y-[-8px] relative overflow-hidden">
                    <div className="w-20 h-20 rounded-3xl mb-8 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform relative z-10" style={{ backgroundColor: `${agent.color}15`, color: agent.color }}>
                      {React.cloneElement(agent.icon as React.ReactElement, { size: 40 })}
                    </div>
                    <h4 className="font-black text-xl uppercase text-primary relative z-10">{agent.name}</h4>
                    <p className="text-sm text-secondary mt-3 font-medium relative z-10">{agent.role}</p>
                    <div className="mt-8 px-5 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] relative z-10 border border-emerald-500/20">Opérationnel</div>
                  </div>
                ))}
             </div>
          )}

          {activePage === 'dashboard' && (
            <div className="p-16 max-w-7xl mx-auto space-y-12">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <StatsOverview label="Executions n8n" value="1.2k" change="+142" icon={<Cpu size={24} className="text-blue-500" />} />
                  <StatsOverview label="Agents" value="9" icon={<BrainCircuit size={24} className="text-purple-500" />} change="+1" />
                  <StatsOverview label="Drive Uptime" value="99.9%" icon={<Database size={24} className="text-emerald-500" />} change="0%" />
                  <StatsOverview label="API Fal.ai" value="Active" icon={<Zap size={24} className="text-orange-500" />} change="OK" />
               </div>
               <div className="glass p-12 rounded-[50px]">
                   <h3 className="text-xl font-black mb-10 uppercase tracking-widest opacity-60 flex items-center gap-3"><Activity size={20} className="text-blue-500" /> Charge du Système</h3>
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                      <div className="space-y-10">
                        <ProjectTaskRow label="Génération Vidéo Fal.ai" value={85} total={100} color="bg-blue-500" />
                        <ProjectTaskRow label="Processing Blotato Post" value={62} total={100} color="bg-purple-500" />
                      </div>
                      <div className="space-y-10">
                        <ProjectTaskRow label="Sync Google Drive" value={94} total={100} color="bg-emerald-500" />
                        <ProjectTaskRow label="Token Usage GPT-5" value={45} total={100} color="bg-orange-500" />
                      </div>
                   </div>
               </div>
            </div>
          )}
        </main>

        {/* WORKFLOW DETAIL DRAWER */}
        {selectedWorkflow && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedWorkflow(null)}></div>
            <div ref={workflowDrawerRef} className="w-full max-w-2xl bg-sidebar-bg h-full shadow-[-20px_0_60px_rgba(0,0,0,0.6)] border-l border-white/10 p-16 overflow-y-auto relative z-10">
              <button onClick={() => setSelectedWorkflow(null)} className="absolute top-10 right-10 p-4 rounded-2xl glass hover:bg-white/10 transition-all text-primary"><X size={24} /></button>
              
              <div className="flex items-center gap-8 mb-16">
                <div className="p-8 rounded-[32px]" style={{ backgroundColor: `${selectedWorkflow.color}15`, color: selectedWorkflow.color }}>
                  {React.cloneElement(selectedWorkflow.icon as React.ReactElement, { size: 48 })}
                </div>
                <div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter text-primary">{selectedWorkflow.name}</h3>
                  <div className={`font-black uppercase tracking-widest text-[10px] flex items-center gap-2 mt-2 ${selectedWorkflow.status === 'active' ? 'text-emerald-500' : 'text-red-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${selectedWorkflow.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div> 
                    {selectedWorkflow.status === 'active' ? 'Workflow Actif' : 'Workflow Déconnecté'}
                  </div>
                </div>
              </div>

              <div className="space-y-12">
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-6 border-b border-white/5 pb-2">Architecture n8n (Nœuds)</h4>
                  <div className="space-y-6 relative">
                    <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-white/5"></div>
                    {selectedWorkflow.steps?.map((step, i) => (
                      <div key={i} className="flex items-center gap-6 group relative z-10">
                        <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center font-black text-blue-500 border-blue-500/20 group-hover:scale-110 transition-transform">
                          {i + 1}
                        </div>
                        <div className="flex-1 glass p-5 rounded-2xl border-white/5 group-hover:border-blue-500/30 transition-all">
                          <span className="font-bold text-primary">{step}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-6 border-b border-white/5 pb-2 flex items-center gap-3">
                    <Terminal size={14} className="text-blue-500" /> Flux de Logs
                  </h4>
                  <div className="glass p-8 rounded-[32px] bg-black/40 font-mono text-xs space-y-3 max-h-60 overflow-y-auto custom-scrollbar border-white/5">
                    {selectedWorkflow.logs?.map((log, i) => (
                      <div key={i} className="text-white/40">{log}</div>
                    ))}
                    <div className="text-emerald-500/70">[SYSTEM] Connection stable au cluster.</div>
                    <div className="text-blue-400 font-bold">[INFO] Prêt pour exécution (n8n version 1.1+).</div>
                  </div>
                </section>

                <div className="flex gap-6 mt-16 pt-8 border-t border-white/5">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest py-6 rounded-2xl transition-all flex items-center justify-center gap-4 shadow-xl shadow-blue-500/10">
                    <Play size={20} fill="white" /> Exécuter le Workflow
                  </button>
                  <button className="glass px-8 py-6 rounded-2xl text-primary font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                    Ouvrir n8n
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AGENT DETAIL DRAWER */}
        {selectedAgent && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedAgent(null)}></div>
            <div ref={agentDrawerRef} className="w-full max-w-2xl bg-sidebar-bg h-full shadow-[-20px_0_60px_rgba(0,0,0,0.6)] border-l border-white/10 p-16 overflow-y-auto relative z-10">
              <button onClick={() => setSelectedAgent(null)} className="absolute top-10 right-10 p-4 rounded-2xl glass hover:bg-white/10 transition-all text-primary"><X size={24} /></button>
              <div className="flex flex-col items-center text-center mb-16">
                <div className="w-32 h-32 rounded-[40px] flex items-center justify-center mb-8 shadow-2xl relative" style={{ backgroundColor: `${selectedAgent.color}15`, color: selectedAgent.color }}>
                  {React.cloneElement(selectedAgent.icon as React.ReactElement, { size: 64 })}
                </div>
                <h3 className="text-4xl font-black uppercase tracking-tighter text-primary mb-2">{selectedAgent.name}</h3>
                <p className="text-blue-500 font-black uppercase tracking-widest text-xs">{selectedAgent.role}</p>
              </div>
              <div className="space-y-12">
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-4 border-b border-white/5 pb-2">Mission Critique</h4>
                  <p className="text-xl leading-relaxed text-primary/80 font-medium italic">"{selectedAgent.mission}"</p>
                </section>
                <div className="grid grid-cols-2 gap-8">
                  <div className="glass p-8 rounded-[32px]">
                    <div className="flex items-center gap-3 text-emerald-500 mb-2"><BarChart3 size={20} /><span className="text-[10px] font-black uppercase tracking-widest">Performance</span></div>
                    <div className="text-4xl font-black text-primary">{selectedAgent.performance}%</div>
                  </div>
                  <div className="glass p-8 rounded-[32px]">
                    <div className="flex items-center gap-3 text-blue-500 mb-2"><Clock size={20} /><span className="text-[10px] font-black uppercase tracking-widest">Uptime</span></div>
                    <div className="text-4xl font-black text-primary">99.9h</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
