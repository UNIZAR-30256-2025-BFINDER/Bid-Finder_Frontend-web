/**
 * @fileoverview Hook para solucionar problemas de renderizado de Leaflet en contenedores dinámicos.
 */

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

/**
 * Utiliza ResizeObserver para detectar cambios en el tamaño del contenedor del mapa
 * y forzar la actualización de Leaflet mediante map.invalidateSize().
 */
export function useMapAutoResize() {
  const map = useMap();

  useEffect(() => {
    const resizeObserver = new window.ResizeObserver(() => {
      map.invalidateSize();
    });

    const container = map.getContainer();
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [map]);
}