
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { 
  Zap, Activity, LayoutDashboard, CheckCircle2, Clock, 
  MoreHorizontal, ChevronRight, Search, Plus, Home,
  User, Settings, Layers, Star, Bell, LogOut, Shield, Globe,
  BarChart3, Palette, Cpu, Eye, Video, Share2, Target, BrainCircuit,
  GitBranch, Terminal, ArrowRight, Filter, FileText, Image as ImageIcon,
  MessageSquare, Instagram, Twitter, Rocket, Sparkles, TrendingUp
} from 'lucide-react';

// Sub-components
import StatsOverview from './components/StatsOverview';
import ProjectTaskRow from './components/ProjectTaskRow';
import WorkflowCard from './components/WorkflowCard';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<'home' | 'dashboard' | 'tasks' | 'agents' | 'workflows' | 'settings'>('home');
  const [selectedTask, setSelectedTask] = useState<number>(0);
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const squadMissions = [
    { id: 0, title: 'Optimisation Cinématique 4K', project: 'Visionnaire-AI', priority: 'Urgent', status: 'En Cours', deadline: 'H-2', desc: 'Ajustement de la cohérence visuelle pour la génération de vidéos haute résolution. Focus sur la fluidité temporelle.' },
    { id: 1, title: 'Veille Tendances TikTok', project: 'Sentinel-Social', priority: 'Normal', status: 'Sync', deadline: 'Demain', desc: 'Analyse et extraction des signaux faibles pour la prochaine campagne de diffusion.' },
    { id: 2, title: 'Sécurisation Core-API', project: 'Architecte-Core', priority: 'Critique', status: 'Urgent', deadline: 'Immédiat', desc: 'Optimisation des protocoles de communication entre les unités de production.' },
  ];

  const specializedAgents = [
    { name: 'Neo-Genesis', role: 'Générateur de Médias', mission: 'Création de vidéos cinématiques avancées', icon: <Video />, color: '#3B82F6', status: 'Actif' },
    { name: 'Social-Sentinel', role: 'Analyste de Diffusion', mission: 'Monitoring et distribution multi-plateformes', icon: <Share2 />, color: '#10B981', status: 'Actif' },
    { name: 'Deep-Cognition', role: 'Agent de Recherche', mission: 'Synthèse d\'intelligence et rapports stratégiques', icon: <BrainCircuit />, color: '#8B5CF6', status: 'Veille' },
    { name: 'Aura-Design', role: 'Architecte Visuel', mission: 'Design d\'interfaces et composants interactifs', icon: <Palette />, color: '#EC4899', status: 'Actif' },
    { name: 'Target-Pulse', role: 'Stratège de Performance', mission: 'Optimisation du ROI et analyse prédictive', icon: <Target />, color: '#F59E0B', status: 'Actif' },
    { name: 'Shadow-Editor', role: 'Post-Production', mission: 'Édition automatisée et synchronisation audio', icon: <Eye />, color: '#EF4444', status: 'Actif' },
  ];

  const activeWorkflows = [
    { name: 'Manager de Production', type: 'Système Central', status: 'active', icon: <BrainCircuit />, color: '#8B5CF6', description: 'Pilotage centralisé de la squad. Coordonne les unités de stockage, de communication et de création.' },
    { name: 'Générateur Vidéo Pro', type: 'Production Créative', status: 'active', icon: <Video />, color: '#3B82F6', description: 'Production instantanée de vidéos cinématiques avec synchronisation audio et archivage sécurisé.' },
    { name: 'Moteur de Rendu Image', type: 'Production Créative', status: 'active', icon: <ImageIcon />, color: '#0EA5E9', description: 'Génération de visuels haute fidélité avec pipeline de livraison automatique vers les serveurs de stockage.' },
    { name: 'Convertisseur VFX', type: 'Post-Production', status: 'active', icon: <Zap />, color: '#F59E0B', description: 'Transformation d\'actifs statiques en séquences vidéo dynamiques pour les campagnes publicitaires.' },
    { name: 'Studio de Retouche', type: 'Édition Avancée', status: 'active', icon: <Palette />, color: '#EC4899', description: 'Unité de modification visuelle permettant d\'ajuster les contenus selon les besoins spécifiques.' },
    { name: 'Diffuseur Instagram', type: 'Déploiement Social', status: 'active', icon: <Instagram />, color: '#E1306C', description: 'Publication directe des médias produits vers les audiences cibles avec gestion des légendes.' },
    { name: 'Diffuseur X / Twitter', type: 'Déploiement Social', status: 'active', icon: <Twitter />, color: '#1DA1F2', description: 'Distribution rapide de contenus et d\'actualités vers les flux d\'information mondiaux.' },
    { name: 'Générateur de Rapports', type: 'Gestion de Données', status: 'active', icon: <FileText />, color: '#10B981', description: 'Transformation des données brutes en documents structurés et exploitables instantanément.' }
  ];

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(pageRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power4.out" }
      );
    }
    
    if (activePage === 'home' && heroRef.current) {
      const tl = gsap.timeline();
      tl.from(".hero-title", { y: 100, opacity: 0, duration: 1, ease: "power4.out" })
        .from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".feature-card", { scale: 0.8, opacity: 0, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)" }, "-=0.4");
    }
  }, [activePage]);

  // --- VIEWS ---

  const renderHome = () => (
    <div ref={heroRef} className="min-h-full flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
      {/* Animated background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
          <Sparkles size={14} /> Intelligence Artificielle de Nouvelle Génération
        </div>
        
        <h1 className="hero-title text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic">
          L'Élite de la <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Production</span>
        </h1>
        
        <p className="hero-subtitle text-xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed">
          Automatisez votre création média, de la conception à la diffusion omnicanale, avec une précision et une puissance sans précédent.
        </p>

        <div className="flex flex-wrap justify-center gap-6 pt-12">
          <button 
            onClick={() => setActivePage('dashboard')}
            className="group relative bg-white text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]"
          >
            Lancer le Dashboard
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => setActivePage('workflows')}
            className="glass px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all hover:bg-white/5"
          >
            Voir les Protocoles
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {[
            { icon: <Zap className="text-blue-500" />, title: "Vitesse Ultime", desc: "Production 10x plus rapide que les méthodes traditionnelles." },
            { icon: <Shield className="text-purple-500" />, title: "Qualité Élite", desc: "Contrôles de cohérence automatisés sur chaque pixel." },
            { icon: <TrendingUp className="text-emerald-500" />, title: "Diffusion Maximale", desc: "Visibilité accrue sur tous vos réseaux sociaux stratégiques." }
          ].map((f, i) => (
            <div key={i} className="feature-card glass p-8 rounded-[32px] border-white/5 text-left group hover:border-blue-500/30 transition-all">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h4 className="text-lg font-black uppercase mb-2 tracking-tight">{f.title}</h4>
              <p className="text-sm text-white/30 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="p-8 space-y-8 max-w-[1200px] mx-auto pb-24">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tighter uppercase">Command Center</h1>
          <p className="text-white/40 text-sm font-medium">État du système opérationnel. 6 agents experts et {activeWorkflows.length} unités de production actives.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-2xl text-[10px] font-black uppercase tracking-widest text-blue-500 border-blue-500/20">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Status: Synchronisé
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsOverview label="Requêtes Produites" value="1.2M" change="+14k" icon={<Cpu size={20} className="text-blue-500" />} />
        <StatsOverview label="Unités Actives" value={`${activeWorkflows.length}`} change="+1" icon={<GitBranch size={20} className="text-purple-500" />} />
        <StatsOverview label="Disponibilité" value="99.9%" change="+0.1%" icon={<Globe size={20} className="text-emerald-500" />} />
        <StatsOverview label="Volume Actif" value="4.2 TB" change="+12%" icon={<Zap size={20} className="text-orange-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass p-10 rounded-[40px] border-white/5 relative overflow-hidden group">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full"></div>
          <h3 className="text-xl font-black mb-8 flex items-center gap-3 uppercase tracking-tighter">
             <BarChart3 size={20} className="text-blue-500" /> Rendement Opérationnel
          </h3>
          <div className="h-48 flex items-end gap-2 px-2 relative z-10">
            {[30, 60, 45, 90, 55, 100, 40, 85, 60, 95, 45, 70, 30, 90].map((h, i) => (
              <div key={i} className="flex-1 bg-white/[0.03] rounded-t-xl relative group/bar">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-xl transition-all duration-700 group-hover/bar:brightness-150" 
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass p-10 rounded-[40px] border-white/5">
          <h3 className="text-xl font-black mb-8 uppercase tracking-tighter">Performance Squad</h3>
          <div className="space-y-8">
            <ProjectTaskRow label="Creative Production" value={85} total={100} color="bg-blue-500" />
            <ProjectTaskRow label="Data Intelligence" value={42} total={100} color="bg-purple-500" />
            <ProjectTaskRow label="Social Deployment" value={92} total={100} color="bg-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderWorkflows = () => (
    <div className="p-10 max-w-[1400px] mx-auto pb-24">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase">Catalogue de Production</h2>
          <p className="text-white/30 text-sm font-medium mt-1">Gérez vos outils de création et de diffusion automatisés.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="glass px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/5 transition-colors">
            <Filter size={14} /> Filtrer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {activeWorkflows.map((workflow, i) => (
          <WorkflowCard 
            key={i}
            name={workflow.name}
            type={workflow.type}
            status={workflow.status}
            icon={workflow.icon}
            color={workflow.color}
            description={workflow.description}
          />
        ))}
      </div>
    </div>
  );

  const renderAgents = () => (
    <div className="p-10 max-w-[1400px] mx-auto pb-24">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase">Équipe d'Experts</h2>
          <p className="text-white/30 text-sm font-medium mt-1">Vos agents spécialisés dédiés à la stratégie et à la création.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {specializedAgents.map((agent, i) => (
          <div key={i} className="glass p-8 rounded-[40px] border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
               {React.cloneElement(agent.icon as React.ReactElement, { size: 100 })}
            </div>
            <div className="flex justify-between items-start mb-8">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl" style={{ backgroundColor: `${agent.color}15`, border: `1px solid ${agent.color}30`, color: agent.color }}>
                {React.cloneElement(agent.icon as React.ReactElement, { size: 28 })}
              </div>
              <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${agent.status === 'Actif' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-white/20'}`}>
                {agent.status}
              </div>
            </div>
            <h3 className="text-2xl font-black mb-1 group-hover:text-blue-400 transition-colors tracking-tight">{agent.name}</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-6">{agent.role}</p>
            <p className="text-sm text-white/40 mb-8 leading-relaxed h-12 line-clamp-2">{agent.mission}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#080B13] text-white overflow-hidden font-['Plus_Jakarta_Sans']">
      
      {/* GLOBAL SIDEBAR */}
      <aside className="w-[85px] border-r border-white/5 flex flex-col items-center py-10 gap-10 bg-[#0B101B]/60 backdrop-blur-3xl z-50">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-[0_0_30px_-5px_rgba(37,99,235,0.5)] mb-6 group cursor-pointer relative" onClick={() => setActivePage('home')}>
          <Zap size={28} fill="white" />
        </div>
        <nav className="flex flex-col gap-8">
          {[
            { id: 'home', icon: <Home size={24} />, label: 'Accueil' },
            { id: 'dashboard', icon: <LayoutDashboard size={24} />, label: 'Dashboard' },
            { id: 'tasks', icon: <Target size={24} />, label: 'Opérations' },
            { id: 'agents', icon: <User size={24} />, label: 'Experts' },
            { id: 'workflows', icon: <GitBranch size={24} />, label: 'Production' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActivePage(item.id as any)}
              className={`p-4 rounded-[20px] transition-all relative group ${activePage === item.id ? 'bg-blue-600 text-white shadow-[0_0_25px_-5px_rgba(37,99,235,0.6)]' : 'text-white/20 hover:text-white hover:bg-white/5'}`}
            >
              {item.icon}
              <div className="absolute left-full ml-6 px-3 py-1.5 bg-white text-black text-[10px] font-black rounded-lg opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 shadow-2xl whitespace-nowrap pointer-events-none z-[100]">
                {item.label}
              </div>
            </button>
          ))}
        </nav>
        <div className="mt-auto">
          <button 
            onClick={() => setActivePage('settings')}
            className={`p-4 rounded-[20px] transition-all ${activePage === 'settings' ? 'bg-blue-600 text-white' : 'text-white/20 hover:text-white'}`}
          >
            <Settings size={24} />
          </button>
        </div>
      </aside>

      {/* PAGE CONTAINER */}
      <div ref={pageRef} className="flex-1 flex flex-col overflow-hidden relative h-full">
        {/* HEADER (Only for non-home pages) */}
        {activePage !== 'home' && (
          <header className="h-24 border-b border-white/5 px-12 flex items-center justify-between z-10 shrink-0">
            <h2 className="text-2xl font-black capitalize tracking-tighter uppercase">{activePage}</h2>
            <div className="flex items-center gap-8">
              <div className="relative group hidden lg:block">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input type="text" placeholder="Recherche..." className="bg-white/5 border border-white/10 rounded-[20px] py-3 pl-14 pr-8 text-xs outline-none focus:border-blue-500/40 w-[350px]" />
              </div>
              <div className="w-12 h-12 rounded-2xl border border-white/10 p-1">
                <img src="https://picsum.photos/seed/cyber/100/100" className="w-full h-full rounded-xl object-cover grayscale" />
              </div>
            </div>
          </header>
        )}

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto relative z-10 custom-scrollbar">
          {activePage === 'home' && renderHome()}
          {activePage === 'dashboard' && renderDashboard()}
          {activePage === 'workflows' && renderWorkflows()}
          {activePage === 'agents' && renderAgents()}
          {activePage === 'tasks' && <div className="p-12 text-center text-white/20 font-black uppercase tracking-[0.2em]">Flux d'opérations en temps réel...</div>}
          {activePage === 'settings' && <div className="p-12 text-center text-white/20 font-black uppercase tracking-[0.2em]">Configuration Systémique</div>}
        </div>
      </div>
    </div>
  );
};

export default App;
