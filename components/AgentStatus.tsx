
import React from 'react';

interface AgentStatusProps {
  icon: React.ReactNode;
  label: string;
  status: string;
}

const AgentStatus: React.FC<AgentStatusProps> = ({ icon, label, status }) => {
  const isProcessing = status === 'processing';
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center relative transition-all ${isProcessing ? 'bg-purple-600 text-white' : 'bg-white/10 text-white/40 border border-white/10'}`}>
        {isProcessing && (
          <div className="absolute inset-0 rounded-full border-2 border-purple-500 animate-ping opacity-25"></div>
        )}
        {React.cloneElement(icon as React.ReactElement, { size: 24 })}
      </div>
      <div className="text-center">
        <p className="text-[11px] font-bold text-white/80 uppercase tracking-tighter">{label}</p>
        <p className={`text-[9px] font-medium ${isProcessing ? 'text-purple-400 animate-pulse' : 'text-white/20'}`}>{status}</p>
      </div>
    </div>
  );
};

export default AgentStatus;
