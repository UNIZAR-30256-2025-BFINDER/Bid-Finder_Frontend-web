import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

/**
 * Hook: useMapAutoResize
 * Observa el contenedor del mapa y fuerza invalidateSize() cuando cambia su tamaño.
 * Uso: Llama este hook dentro de un componente hijo de MapContainer.
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
