import React from 'react';

interface MapWidgetProps {
  children?: React.ReactNode;
  className?: string;
}

export const MapWidget: React.FC<MapWidgetProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`relative rounded-2xl bg-black/40 border border-white/10 p-6 md:p-8 overflow-hidden shadow-xl w-full h-full min-h-[300px] ${className}`}
    >
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 w-full h-full flex items-center justify-center min-h-[300px]">
        {children}
      </div>
    </div>
  );
};
