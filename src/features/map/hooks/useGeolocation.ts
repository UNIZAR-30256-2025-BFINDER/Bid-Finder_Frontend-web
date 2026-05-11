/**
 * @fileoverview Hook para gestionar la geolocalización del usuario al inicio de la aplicación.
 */

import { useEffect, useState } from 'react';
import { MAP_DEFAULT_CENTER } from '../components/mapConstants';

/**
 * Intenta obtener la ubicación actual del usuario. Si falla o no es soportada,
 * devuelve las coordenadas por defecto de Madrid.
 * @returns {[number, number] | null} Coordenadas [lat, lng] o null mientras carga.
 */
export function useGeolocation(): [number, number] | null {
  const [center, setCenter] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setTimeout(() => setCenter(MAP_DEFAULT_CENTER), 0);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setTimeout(() => {
          setCenter([position.coords.latitude, position.coords.longitude]);
        }, 0);
      },
      () => {
        setTimeout(() => setCenter(MAP_DEFAULT_CENTER), 0);
      },
    );
  }, []);

  return center;
}