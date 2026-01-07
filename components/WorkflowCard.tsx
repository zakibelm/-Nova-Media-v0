
import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, MoreVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { gsap } from 'gsap';

interface WorkflowCardProps {
  name: string;
  type: string;
  status: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  onClick: () => void;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({ name, type, status, icon, color, description, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    if (cardRef.current && !isExpanded) {
      gsap.to(cardRef.current, {
        scale: 1.03,
        duration: 0.4,
        ease: "power2.out",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power2.inOut",
        boxShadow: "0 0px 0px rgba(0,0,0,0)"
      });
    }
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (descRef.current) {
      gsap.to(descRef.current, {
        height: isExpanded ? 'auto' : '2.8rem',
        duration: 0.4,
        ease: "power3.inOut"
      });
    }
  }, [isExpanded]);

  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="workflow-node glass p-8 rounded-[40px] border-white/10 flex flex-col h-full group cursor-pointer relative overflow-hidden transition-colors hover:border-white/20"
    >
      <div 
        className="absolute -right-8 -top-8 w-32 h-32 blur-[70px] opacity-10 rounded-full transition-opacity group-hover:opacity-25" 
        style={{ backgroundColor: color }}
      ></div>
      
      <div className="flex items-start justify-between mb-8 relative z-10">
        <div 
          className="p-4 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-3"
          style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
        >
          {React.cloneElement(icon as React.ReactElement, { size: 28, style: { color } })}
        </div>
        <div className="flex items-center gap-4">
          <span className={`text-[10px] uppercase font-black tracking-[0.2em] px-3 py-1.5 rounded-lg border ${status === 'active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-white/5 text-primary/20 border-white/5'}`}>
            {status}
          </span>
          <MoreVertical size={18} className="text-secondary opacity-50 hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <div className="mb-6 relative z-10 flex-1">
        <div className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-2">{type}</div>
        <h3 className="text-2xl font-black group-hover:text-blue-500 transition-colors text-primary leading-tight mb-3">{name}</h3>
        
        <div className="relative">
          <p 
            ref={descRef}
            className={`text-secondary text-sm leading-relaxed font-medium overflow-hidden transition-all ${!isExpanded ? 'line-clamp-2' : ''}`}
            style={{ height: isExpanded ? 'auto' : '2.8rem' }}
          >
            {description}
          </p>
          <button 
            onClick={toggleExpand}
            className="mt-2 text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
          >
            {isExpanded ? (
              <>Moins d'infos <ChevronUp size={12} /></>
            ) : (
              <>En savoir plus <ChevronDown size={12} /></>
            )}
          </button>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5 relative z-10">
        <div className="flex -space-x-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-app-bg overflow-hidden bg-sidebar-bg">
              <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}${i}`} alt="avatar" />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary group-hover:translate-x-1 group-hover:text-blue-500 transition-all">
          <span>Configurer</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};

export default WorkflowCard;
