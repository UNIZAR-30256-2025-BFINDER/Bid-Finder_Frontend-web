/**
 * @fileoverview Botón de acción flotante para dispositivos móviles.
 * Permite al usuario alternar entre la visualización de mapa y el listado de subastas.
 */

import React from 'react';
import { Map as MapIcon, List } from 'lucide-react';

interface MobileViewToggleProps {
  /** Vista actual seleccionada ('map' o 'list') */
  currentView: 'map' | 'list';
  /** Callback para notificar el cambio de vista al componente padre */
  onToggle: () => void;
  /** Clases de Tailwind adicionales para posicionamiento dinámico */
  className?: string;
}

/**
 * Componente de interfaz que muestra un botón con icono y texto dinámico.
 * @param {MobileViewToggleProps} props - Propiedades del componente.
 */
export const MobileViewToggle: React.FC<MobileViewToggleProps> = ({ currentView, onToggle, className = "" }) => {
  return (
    <button
      onClick={onToggle}
      className={`md:hidden z-[1000] flex items-center gap-2 bg-gray-900/90 hover:bg-gray-800/95 text-white px-7 py-3 rounded-full shadow-2xl border-2 border-yellow-400 font-semibold tracking-wide backdrop-blur-sm ${className}`}
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