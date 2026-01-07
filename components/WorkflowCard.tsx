
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
        className="absolute -right-4 -top-4 w-24 h-24 blur-[60px] opacity-20 rounded-full transition-all group-hover:opacity-40" 
        style={{ backgroundColor: color }}
      ></div>
      
      <div className="flex items-start justify-between mb-6">
        <div 
          className="p-3 rounded-2xl flex items-center justify-center text-white glow"
          style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}
        >
          {React.cloneElement(icon as React.ReactElement, { style: { color } })}
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded-md ${status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-white/30'}`}>
            {status}
          </span>
          <MoreVertical size={16} className="text-white/20" />
        </div>
      </div>

      <div className="mb-6">
        <div className="text-xs font-bold text-white/30 uppercase tracking-wider mb-1">{type}</div>
        <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">{name}</h3>
        <p className="text-white/40 text-sm mt-2 line-clamp-2">{description}</p>
      </div>

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex -space-x-2">
          {[1, 2, 3].map(i => (
            <img key={i} className="w-6 h-6 rounded-full border-2 border-black" src={`https://picsum.photos/seed/${i+10}/50/50`} alt="avatar" />
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-white/60 group-hover:translate-x-1 transition-transform">
          <span>Configurer</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
};

export default WorkflowCard;
