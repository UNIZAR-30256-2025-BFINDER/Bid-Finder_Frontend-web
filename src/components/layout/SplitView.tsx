import React from 'react';

interface SplitViewProps {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}

export const SplitView: React.FC<SplitViewProps> = ({ left, right, className = '' }) => (
  <div className={`flex flex-col md:flex-row w-full h-full ${className}`} style={{ minHeight: 0 }}>
    <div className="md:w-[400px] w-full md:h-full h-[300px] overflow-y-auto bg-[#181818] border-r border-gray-800">
      {left}
    </div>
    <div className="flex-1 w-full h-full">{right}</div>
  </div>
);
