import React from 'react';
import { Map as MapIcon, List } from 'lucide-react';


interface MobileViewToggleProps {
  currentView: 'map' | 'list';
  onToggle: () => void;
  className?: string;
}

export const MobileViewToggle: React.FC<MobileViewToggleProps> = ({ currentView, onToggle, className = "" }) => {
  return (
    <button
      onClick={onToggle}
      className={`md:hidden absolute z-[1000] flex items-center gap-2 bg-gray-900/90 hover:bg-gray-800/95 text-white px-7 py-3 rounded-full shadow-2xl border-2 border-yellow-400 font-semibold tracking-wide backdrop-blur-sm ${className}`}
    >
      {currentView === 'map' ? (
        <>
          <List size={22} className="mr-1" /> <span className="font-bold">Lista</span>
        </>
      ) : (
        <>
          <MapIcon size={22} className="mr-1" /> <span className="font-bold">Mapa</span>
        </>
      )}
    </button>
  );
};