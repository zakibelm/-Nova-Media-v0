
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { 
  Zap, LayoutDashboard, Home, Settings, 
  Video, Share2, Target, BrainCircuit, GitBranch, 
  ArrowRight, Sparkles, TrendingUp, Sun, Moon, Shield, Cpu, Globe, 
  Image as ImageIcon, X, Activity, BarChart3, Clock
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

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<'home' | 'dashboard' | 'tasks' | 'agents' | 'workflows' | 'settings'>('home');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('app-theme');
    return (saved as 'light' | 'dark') || 'dark';
  });
  
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', theme === 'light');
  }, [theme]);

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
    },
    { 
      name: 'Deep-Cognition', 
      role: 'Agent de Recherche', 
      mission: 'Synthèse massive d\'intelligence de marché et rédaction de rapports stratégiques prédictifs.', 
      icon: <BrainCircuit />, 
      color: '#8B5CF6',
      performance: 89,
      tasks: ['Veille Concurrentielle Tech', 'Extraction Data PDF', 'Rapport Q3 Vision']
    },
    { 
      name: 'Aura-Design', 
      role: 'Architecte Visuel', 
      mission: 'Génération d\'interfaces utilisateurs dynamiques et composants graphiques haute fidélité.', 
      icon: <Target />, 
      color: '#EC4899',
      performance: 95,
      tasks: ['Design Kit v4.2', 'Prototypage Micro-interactions', 'Audit Accessibilité UI']
    },
  ];

  const activeWorkflows = [
    { name: 'Manager de Production', type: 'Système Central', status: 'active', icon: <BrainCircuit />, color: '#8B5CF6', description: 'Pilotage centralisé de la squad.' },
    { name: 'Générateur Vidéo Pro', type: 'Production Créative', status: 'active', icon: <Video />, color: '#3B82F6', description: 'Production de vidéos cinématiques.' },
    { name: 'Moteur de Rendu Image', type: 'Production Créative', status: 'active', icon: <ImageIcon />, color: '#0EA5E9', description: 'Génération de visuels haute fidélité.' }
  ];

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(pageRef.current, 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power4.out" }
      );
    }
    
    if (activePage === 'home' && heroRef.current) {
      const tl = gsap.timeline();
      tl.from(".hero-content > *", { 
        y: 60, 
        opacity: 0, 
        duration: 1.2, 
        stagger: 0.15, 
        ease: "expo.out" 
      });
    }
  }, [activePage]);

  useEffect(() => {
    if (selectedAgent && drawerRef.current) {
      gsap.fromTo(drawerRef.current, 
        { x: '100%' }, 
        { x: '0%', duration: 0.6, ease: "expo.out" }
      );
    }
  }, [selectedAgent]);

  const renderHome = () => (
    <div ref={heroRef} className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[10%] w-[50%] h-[50%] bg-blue-500 custom-glow rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] bg-purple-500 custom-glow rounded-full"></div>

      <div className="hero-content relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border-blue-500/20 text-blue-500 text-[11px] font-black uppercase tracking-[0.3em] shadow-xl mb-12">
          <Sparkles size={16} /> Intelligence Artificielle de Nouvelle Génération
        </div>
        
        <div className="w-full flex flex-col items-center">
          <h1 className="hero-title text-6xl md:text-9xl font-black tracking-tighter uppercase italic text-primary">
            L'Élite de la <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Production</span>
          </h1>
          <p className="hero-subtitle text-lg md:text-2xl text-secondary max-w-3xl mx-auto font-medium leading-relaxed mt-10">
            Automatisez votre création média avec une précision chirurgicale. <br className="hidden md:block"/>
            La puissance de l'IA au service de votre vision créative.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-16 w-full">
          <button 
            onClick={() => setActivePage('dashboard')}
            className="btn-primary-action group relative px-14 py-6 rounded-[24px] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-4 transition-all hover:scale-[1.05] active:scale-95 shadow-2xl min-w-[280px]"
          >
            Lancer le Dashboard
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => setActivePage('workflows')}
            className="glass px-14 py-6 rounded-[24px] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-4 transition-all hover:bg-white/10 dark:hover:bg-white/5 text-primary border-white/10 min-w-[280px]"
          >
            Voir les Protocoles
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`flex h-screen bg-app-bg text-primary overflow-hidden font-['Plus_Jakarta_Sans'] transition-colors duration-500`}>
      
      {/* SIDEBAR */}
      <aside className="w-[100px] border-r border-white/10 dark:border-white/5 flex flex-col items-center py-12 gap-12 bg-sidebar-bg shrink-0 z-50">
        <div 
          className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 transition-transform" 
          onClick={() => setActivePage('home')}
        >
          <Zap size={32} fill="white" strokeWidth={2.5} />
        </div>
        <nav className="flex flex-col gap-10">
          {[
            { id: 'home', icon: <Home size={28} />, label: 'Accueil' },
            { id: 'dashboard', icon: <LayoutDashboard size={28} />, label: 'Dashboard' },
            { id: 'tasks', icon: <Target size={28} />, label: 'Opérations' },
            { id: 'agents', icon: <BrainCircuit size={28} />, label: 'Experts' },
            { id: 'workflows', icon: <GitBranch size={28} />, label: 'Production' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActivePage(item.id as any)}
              className={`p-4 rounded-[24px] transition-all relative group flex items-center justify-center ${activePage === item.id ? 'bg-blue-600 text-white nav-active-glow shadow-blue-500/20 shadow-lg' : 'text-nav-inactive hover:text-primary hover:bg-white/5'}`}
            >
              {item.icon}
              <div className="absolute left-full ml-8 px-4 py-2 bg-accent-bg text-accent-text text-[11px] font-black rounded-xl opacity-0 group-hover:opacity-100 transition-all translate-x-[-15px] group-hover:translate-x-0 shadow-2xl whitespace-nowrap pointer-events-none z-[100] uppercase tracking-widest">
                {item.label}
              </div>
            </button>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-8">
          <button onClick={toggleTheme} className="p-4 rounded-[24px] text-nav-inactive hover:text-primary transition-all flex items-center justify-center hover:bg-white/5">
            {theme === 'dark' ? <Sun size={28} /> : <Moon size={28} />}
          </button>
          <button onClick={() => setActivePage('settings')} className={`p-4 rounded-[24px] flex items-center justify-center transition-all ${activePage === 'settings' ? 'bg-blue-600 text-white' : 'text-nav-inactive hover:text-primary'}`}>
            <Settings size={28} />
          </button>
        </div>
      </aside>

      <div ref={pageRef} className="flex-1 flex flex-col overflow-hidden relative">
        {activePage !== 'home' && (
          <header className="h-28 border-b border-white/10 dark:border-white/5 px-16 flex items-center justify-between shrink-0 glass z-20">
            <div className="flex items-center gap-6">
               <div className="w-2.5 h-10 bg-blue-600 rounded-full shadow-lg shadow-blue-500/30"></div>
               <h2 className="text-3xl font-black capitalize tracking-tighter uppercase text-primary">{activePage}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl border border-white/20 dark:border-white/10 p-0.5 overflow-hidden shadow-xl">
              <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${theme === 'light' ? 'lightness' : 'darkness'}`} className="w-full h-full object-cover" alt="avatar" />
            </div>
          </header>
        )}

        <main className="flex-1 overflow-y-auto custom-scrollbar relative flex flex-col">
          {activePage === 'home' && renderHome()}
          
          {activePage === 'agents' && (
             <div className="p-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {specializedAgents.map((agent, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedAgent(agent)}
                    className="glass p-10 rounded-[45px] flex flex-col items-center text-center group hover:border-blue-500/30 transition-all cursor-pointer hover:translate-y-[-8px] relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
                  <StatsOverview label="Requêtes" value="1.2M" change="+14k" icon={<Cpu size={24} className="text-blue-500" />} />
                  <StatsOverview label="Unités Actives" value="8" change="+1" icon={<GitBranch size={24} className="text-purple-500" />} />
                  <StatsOverview label="Disponibilité" value="99.9%" change="+0.1%" icon={<Globe size={24} className="text-emerald-500" />} />
                  <StatsOverview label="Volume Data" value="4.2 TB" change="+12%" icon={<Zap size={24} className="text-orange-500" />} />
               </div>
               <div className="glass p-12 rounded-[50px]">
                   <h3 className="text-xl font-black mb-10 uppercase tracking-widest opacity-60 flex items-center gap-3">
                     <Activity size={20} className="text-blue-500" /> Charge des Projets
                   </h3>
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                      <div className="space-y-10">
                        <ProjectTaskRow label="Visual AI Engine" value={85} total={100} color="bg-blue-500" />
                        <ProjectTaskRow label="Social Broadcast" value={62} total={100} color="bg-purple-500" />
                      </div>
                      <div className="space-y-10">
                        <ProjectTaskRow label="Data Sync Core" value={94} total={100} color="bg-emerald-500" />
                        <ProjectTaskRow label="Intelligence Lab" value={45} total={100} color="bg-orange-500" />
                      </div>
                   </div>
               </div>
            </div>
          )}

          {activePage === 'workflows' && (
            <div className="p-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {activeWorkflows.map((w, i) => <WorkflowCard key={i} {...w} />)}
            </div>
          )}
        </main>

        {/* AGENT DETAIL DRAWER */}
        {selectedAgent && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500"
              onClick={() => setSelectedAgent(null)}
            ></div>
            <div 
              ref={drawerRef}
              className="w-full max-w-2xl bg-sidebar-bg h-full shadow-[-20px_0_60px_rgba(0,0,0,0.6)] border-l border-white/10 p-16 overflow-y-auto relative z-10"
            >
              <button 
                onClick={() => setSelectedAgent(null)}
                className="absolute top-10 right-10 p-4 rounded-2xl glass hover:bg-white/10 transition-all text-primary"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col items-center text-center mb-16">
                <div 
                  className="w-32 h-32 rounded-[40px] flex items-center justify-center mb-8 shadow-2xl relative"
                  style={{ backgroundColor: `${selectedAgent.color}15`, color: selectedAgent.color }}
                >
                  <div className="absolute inset-0 rounded-[40px] border-2 border-current opacity-20 animate-pulse"></div>
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
                    <div className="flex items-center gap-3 text-emerald-500 mb-2">
                      <BarChart3 size={20} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Performance Global</span>
                    </div>
                    <div className="text-4xl font-black text-primary">{selectedAgent.performance}%</div>
                  </div>
                  <div className="glass p-8 rounded-[32px]">
                    <div className="flex items-center gap-3 text-blue-500 mb-2">
                      <Clock size={20} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Latence Moyenne</span>
                    </div>
                    <div className="text-4xl font-black text-primary">0.4ms</div>
                  </div>
                </div>

                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-6 border-b border-white/5 pb-2">Files d'attente actives</h4>
                  <div className="space-y-4">
                    {selectedAgent.tasks.map((task, i) => (
                      <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-blue-500/30 transition-all cursor-default">
                        <div className="flex items-center gap-4">
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                          <span className="text-sm font-bold text-primary">{task}</span>
                        </div>
                        <ArrowRight size={16} className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
