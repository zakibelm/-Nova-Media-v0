
import React from 'react';

interface ProjectTaskRowProps {
  label: string;
  value: number;
  total: number;
  color: string;
}

const ProjectTaskRow: React.FC<ProjectTaskRowProps> = ({ label, value, total, color }) => {
  const percentage = (value / total) * 100;
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold">{label}</span>
        <span className="text-sm font-black text-white/80">{value}</span>
      </div>
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-1000 ease-out`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProjectTaskRow;
