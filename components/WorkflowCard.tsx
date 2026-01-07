
import React from 'react';
import { ArrowRight, MoreVertical } from 'lucide-react';

interface WorkflowCardProps {
  name: string;
  type: string;
  status: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({ name, type, status, icon, color, description }) => {
  return (
    <div className="workflow-node glass p-6 rounded-3xl border-white/10 flex flex-col h-full group cursor-pointer relative overflow-hidden">
      {/* Background Glow */}
      <div 
        className="absolute -right-4 -top-4 w-24 h-24 blur-[60px] opacity-10 rounded-full transition-all group-hover:opacity-30" 
        style={{ backgroundColor: color }}
      ></div>
      
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div 
          className="p-3 rounded-2xl flex items-center justify-center glow"
          style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
        >
          {React.cloneElement(icon as React.ReactElement, { size: 24, style: { color } })}
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded-md ${status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-white/10 text-primary/30'}`}>
            {status}
          </span>
          <MoreVertical size={16} className="text-secondary" />
        </div>
      </div>

      <div className="mb-6 relative z-10">
        <div className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-1">{type}</div>
        <h3 className="text-xl font-bold group-hover:text-blue-500 transition-colors text-primary">{name}</h3>
        <p className="text-secondary text-sm mt-2 line-clamp-2 leading-relaxed">{description}</p>
      </div>

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
        <div className="flex -space-x-2">
          {[1, 2, 3].map(i => (
            <img key={i} className="w-6 h-6 rounded-full border-2 border-app-bg" src={`https://picsum.photos/seed/${i+20}/50/50`} alt="avatar" />
          ))}
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-secondary group-hover:translate-x-1 group-hover:text-blue-500 transition-all">
          <span>Configurer</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
};

export default WorkflowCard;
