/**
 * @fileoverview Layout contenedor para vistas divididas.
 * Típicamente utilizado para combinar un mapa (derecha) y un listado (izquierda).
 */

import React from 'react';

interface SplitViewProps {
  /** Contenido a renderizar en el panel lateral */
  left: React.ReactNode;
  /** Contenido a renderizar en el panel principal */
  right: React.ReactNode;
  /** Clases CSS adicionales para el contenedor raíz */
  className?: string;
}

/**
 * Renderiza una interfaz de dos columnas en escritorio que colapsa 
 * en una pila vertical (columna) en dispositivos móviles.
 * @param {SplitViewProps} props - Elementos a ubicar en cada lado del layout.
 */
export const SplitView: React.FC<SplitViewProps> = ({ left, right, className = '' }) => (
  <div className={`flex flex-col md:flex-row w-full h-full ${className}`} style={{ minHeight: 0 }}>
    <div className="md:w-[400px] w-full md:h-full h-[300px] overflow-y-auto bg-[#181818] border-r border-gray-800">
      {left}
    </div>
    <div className="flex-1 w-full h-full">{right}</div>
  </div>
);