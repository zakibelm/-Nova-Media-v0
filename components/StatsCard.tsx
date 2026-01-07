
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, change, icon, trend }) => {
  return (
    <div className="card-anim glass p-6 rounded-[28px] border-white/5 hover:bg-white/[0.04] transition-all group">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{label}</h4>
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="text-4xl font-black tracking-tighter">{value}</div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
