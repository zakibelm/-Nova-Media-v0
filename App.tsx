
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { 
  Zap, LayoutDashboard, Search, Home, Settings, 
  Video, Share2, Target, BrainCircuit, GitBranch, 
  ArrowRight, Sparkles, TrendingUp, Sun, Moon, Shield, Cpu, Globe, Image as ImageIcon
} from 'lucide-react';

import StatsOverview from './components/StatsOverview';
import ProjectTaskRow from './components/ProjectTaskRow';
import WorkflowCard from './components/WorkflowCard';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<'home' | 'dashboard' | 'tasks' | 'agents' | 'workflows' | 'settings'>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('app-theme');
    return (saved as 'light' | 'dark') || 'dark';
  });
  
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', theme === 'light');
  }, [theme]);

  const specializedAgents = [
    { name: 'Neo-Genesis', role: 'Générateur de Médias', mission: 'Création de vidéos cinématiques avancées', icon: <Video />, color: '#3B82F6' },
    { name: 'Social-Sentinel', role: 'Analyste de Diffusion', mission: 'Monitoring multi-plateformes', icon: <Share2 />, color: '#10B981' },
    { name: 'Deep-Cognition', role: 'Agent de Recherche', mission: 'Synthèse d\'intelligence', icon: <BrainCircuit />, color: '#8B5CF6' },
    { name: 'Aura-Design', role: 'Architecte Visuel', mission: 'Design d\'interfaces interactifs', icon: <Target />, color: '#EC4899' },
  ];

  const activeWorkflows = [
    { name: 'Manager de Production', type: 'Système Central', status: 'active', icon: <BrainCircuit />, color: '#8B5CF6', description: 'Pilotage centralisé de la squad.' },
    { name: 'Générateur Vidéo Pro', type: 'Production Créative', status: 'active', icon: <Video />, color: '#3B82F6', description: 'Production de vidéos cinématiques.' },
    { name: 'Moteur de Rendu Image', type: 'Production Créative', status: 'active', icon: <ImageIcon />, color: '#0EA5E9', description: 'Génération de visuels haute fidélité.' },
    { name: 'Convertisseur VFX', type: 'Post-Production', status: 'active', icon: <Zap />, color: '#F59E0B', description: 'Transformation d\'actifs statiques en dynamiques.' }
  ];

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(pageRef.current, 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
    
    if (activePage === 'home' && heroRef.current) {
      const tl = gsap.timeline();
      tl.from(".hero-content > *", { 
        y: 50, 
        opacity: 0, 
        duration: 1, 
        stagger: 0.2, 
        ease: "expo.out" 
      });
    }
  }, [activePage]);

  const renderHome = () => (
    <div ref={heroRef} className="h-full w-full flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      {/* Dynamic Background Glows with Theme Sensitivity */}
      <div className="absolute top-[-5%] left-[10%] w-[40%] h-[40%] bg-blue-500 custom-glow rounded-full"></div>
      <div className="absolute bottom-[-5%] right-[10%] w-[40%] h-[40%] bg-purple-500 custom-glow rounded-full"></div>

      <div className="hero-content relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border-blue-500/20 text-blue-500 text-[11px] font-black uppercase tracking-[0.25em] shadow-lg mb-8">
          <Sparkles size={16} /> Intelligence Artificielle de Nouvelle Génération
        </div>
        
        <div className="w-full flex flex-col items-center">
          <h1 className="hero-title text-6xl md:text-8xl font-black tracking-tighter uppercase italic text-primary">
            L'Élite de la <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Production</span>
          </h1>
          <p className="hero-subtitle text-lg md:text-2xl text-secondary max-w-3xl mx-auto font-medium leading-relaxed mt-6">
            Automatisez votre création média avec une précision chirurgicale. <br className="hidden md:block"/>
            La puissance de l'IA au service de votre vision créative.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-14 w-full">
          <button 
            onClick={() => setActivePage('dashboard')}
            className="btn-primary group relative px-12 py-5 rounded-[22px] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 transition-all hover:scale-[1.05] active:scale-95 shadow-2xl min-w-[260px]"
          >
            Lancer le Dashboard
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => setActivePage('workflows')}
            className="glass px-12 py-5 rounded-[22px] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 transition-all hover:bg-white/10 dark:hover:bg-white/5 text-primary border-white/10 min-w-[260px]"
          >
            Voir les Protocoles
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full max-w-4xl">
          {[
            { icon: <Zap size={22} />, title: "Vitesse Ultime", color: "text-blue-500", desc: "Production instantanée" },
            { icon: <Shield size={22} />, title: "Qualité Élite", color: "text-purple-500", desc: "Précision chirurgicale" },
            { icon: <Globe size={22} />, title: "Omnicanal", color: "text-emerald-500", desc: "Diffusion globale" }
          ].map((f, i) => (
            <div key={i} className="glass p-7 rounded-[30px] flex flex-col items-center md:items-start gap-4 text-left group transition-all hover:translate-y-[-5px]">
              <div className={`w-12 h-12 rounded-2xl bg-white/5 dark:bg-white/5 flex items-center justify-center ${f.color} group-hover:scale-110 transition-transform shadow-inner`}>
                {f.icon}
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-primary block">{f.title}</span>
                <span className="text-[10px] text-secondary font-medium mt-1 block uppercase tracking-tighter">{f.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`flex h-screen bg-app-bg text-primary overflow-hidden font-['Plus_Jakarta_Sans'] transition-colors duration-500`}>
      {/* Sidebar with consistent contrast */}
      <aside className="w-[90px] border-r border-white/10 dark:border-white/5 flex flex-col items-center py-10 gap-12 bg-sidebar-bg shrink-0 z-50">
        <div 
          className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transition-transform" 
          onClick={() => setActivePage('home')}
        >
          <Zap size={28} fill="white" strokeWidth={2.5} />
        </div>
        <nav className="flex flex-col gap-8">
          {[
            { id: 'home', icon: <Home size={24} />, label: 'Accueil' },
            { id: 'dashboard', icon: <LayoutDashboard size={24} />, label: 'Dashboard' },
            { id: 'tasks', icon: <Target size={24} />, label: 'Opérations' },
            { id: 'agents', icon: <BrainCircuit size={24} />, label: 'Experts' },
            { id: 'workflows', icon: <GitBranch size={24} />, label: 'Production' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActivePage(item.id as any)}
              className={`p-4 rounded-[20px] transition-all relative group flex items-center justify-center ${activePage === item.id ? 'bg-blue-600 text-white nav-active-glow' : 'text-nav-inactive hover:text-primary hover:bg-white/5'}`}
            >
              {item.icon}
              <div className="absolute left-full ml-6 px-3 py-1.5 bg-accent-bg text-accent-text text-[10px] font-black rounded-lg opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 shadow-2xl whitespace-nowrap pointer-events-none z-[100]">
                {item.label}
              </div>
            </button>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-6">
          <button onClick={toggleTheme} className="p-4 rounded-[20px] text-nav-inactive hover:text-primary transition-all flex items-center justify-center hover:bg-white/5">
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button onClick={() => setActivePage('settings')} className={`p-4 rounded-[20px] flex items-center justify-center transition-all ${activePage === 'settings' ? 'bg-blue-600 text-white' : 'text-nav-inactive hover:text-primary'}`}>
            <Settings size={24} />
          </button>
        </div>
      </aside>

      <div ref={pageRef} className="flex-1 flex flex-col overflow-hidden relative">
        {activePage !== 'home' && (
          <header className="h-24 border-b border-white/10 dark:border-white/5 px-12 flex items-center justify-between shrink-0 glass z-20">
            <div className="flex items-center gap-5">
               <div className="w-2 h-8 bg-blue-600 rounded-full shadow-lg shadow-blue-500/20"></div>
               <h2 className="text-2xl font-black capitalize tracking-tighter uppercase text-primary">{activePage}</h2>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl border border-white/20 dark:border-white/10 p-0.5 overflow-hidden shadow-sm">
                <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${theme === 'light' ? 'lightness' : 'darkness'}`} className="w-full h-full object-cover" alt="avatar" />
              </div>
            </div>
          </header>
        )}
        <main className="flex-1 overflow-y-auto custom-scrollbar relative">
          {activePage === 'home' && renderHome()}
          {activePage === 'dashboard' && (
            <div className="p-10 max-w-7xl mx-auto space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsOverview label="Requêtes" value="1.2M" change="+14k" icon={<Cpu size={20} className="text-blue-500" />} />
                <StatsOverview label="Unités Actives" value="8" change="+1" icon={<GitBranch size={20} className="text-purple-500" />} />
                <StatsOverview label="Disponibilité" value="99.9%" change="+0.1%" icon={<Globe size={20} className="text-emerald-500" />} />
                <StatsOverview label="Volume Data" value="4.2 TB" change="+12%" icon={<Zap size={20} className="text-orange-500" />} />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass p-10 rounded-[40px]">
                   <h3 className="text-lg font-black mb-8 uppercase tracking-widest opacity-60">Charge des Projets</h3>
                   <div className="space-y-8">
                      <ProjectTaskRow label="Visual AI Engine" value={85} total={100} color="bg-blue-500" />
                      <ProjectTaskRow label="Social Broadcast" value={62} total={100} color="bg-purple-500" />
                      <ProjectTaskRow label="Data Sync Core" value={94} total={100} color="bg-emerald-500" />
                   </div>
                </div>
              </div>
            </div>
          )}
          {activePage === 'workflows' && (
            <div className="p-10 max-w-7xl mx-auto">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {activeWorkflows.map((w, i) => <WorkflowCard key={i} {...w} />)}
               </div>
            </div>
          )}
          {activePage === 'agents' && (
             <div className="p-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {specializedAgents.map((agent, i) => (
                  <div key={i} className="glass p-8 rounded-[40px] flex flex-col items-center text-center group hover:border-blue-500/30 transition-all">
                    <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform" style={{ backgroundColor: `${agent.color}15`, color: agent.color }}>
                      {React.cloneElement(agent.icon as React.ReactElement, { size: 32 })}
                    </div>
                    <h4 className="font-black text-lg uppercase text-primary">{agent.name}</h4>
                    <p className="text-xs text-secondary mt-2 font-medium">{agent.role}</p>
                    <div className="mt-6 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest">Opérationnel</div>
                  </div>
                ))}
             </div>
          )}
          {activePage === 'tasks' && <div className="p-20 text-center opacity-30 font-black uppercase tracking-[0.3em] text-primary">Analyse des flux en temps réel...</div>}
        </main>
      </div>
    </div>
  );
};

export default App;
