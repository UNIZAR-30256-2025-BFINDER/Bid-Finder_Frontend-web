/**
 * @fileoverview Hook personalizado para detectar si la ventana del navegador
 * corresponde a una resolución de dispositivo móvil.
 */

import { useEffect, useState } from 'react';

/**
 * Escucha los eventos de redimensionamiento de la ventana y determina
 * si el ancho es menor al breakpoint especificado.
 * @param {number} breakpoint - Ancho máximo en píxeles para considerar la pantalla como móvil.
 * @returns {boolean} True si el ancho actual es menor al breakpoint.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}