
import React from 'react';

interface StatsOverviewProps {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ label, value, change, icon }) => {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="glass p-6 rounded-3xl border-white/10 hover:bg-white/5 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-white/5 rounded-lg">
          {icon}
        </div>
        <span className={`text-xs font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
      <div>
        <h4 className="text-white/40 text-sm font-medium mb-1">{label}</h4>
        <div className="text-3xl font-bold tracking-tight">{value}</div>
      </div>
    </div>
  );
};

export default StatsOverview;
