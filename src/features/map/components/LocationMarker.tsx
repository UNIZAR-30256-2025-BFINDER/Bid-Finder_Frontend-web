/**
 * @fileoverview Componente que gestiona el marcador de posición del usuario.
 * Incluye un botón flotante para centrar la vista y un marcador visual en el mapa.
 */

import { useState, useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { LocateFixed } from 'lucide-react';
import React from 'react';
import {
  handleLocationFound,
  hereIcon,
  LOCATION_POPUP_TEXT,
  LOCATION_BUTTON_TITLE,
  LOCATION_DENIED_WARNING,
} from './mapConstants';

/**
 * Componente que utiliza la API de geolocalización de Leaflet para ubicar al usuario.
 * Renderiza un botón de control y un marcador con popup informativo.
 */
export const LocationMarker = () => {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMap();

  /**
   * Dispara el proceso de localización nativo de Leaflet.
   */
  const handleLocate = React.useCallback(() => {
    map.locate();
  }, [map]);

  useEffect(() => {
    handleLocate();
    
    // Suscripción a eventos de Leaflet para éxito y error de ubicación
    map.on('locationfound', handleLocationFound(map, setPosition));
    map.on('locationerror', (e) => {
      console.warn(LOCATION_DENIED_WARNING, e.message);
    });
  }, [handleLocate, map]);

  return (
    <>
      <div className="fixed md:absolute left-6 bottom-8 md:left-6 md:bottom-20 z-[1001]">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleLocate();
          }}
          className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-gray-100 text-slate-800 rounded-full shadow-2xl transition-all border border-slate-200 active:scale-95"
          title={LOCATION_BUTTON_TITLE}
        >
          <LocateFixed size={24} className="md:size-7" />
        </button>
      </div>

      {position && (
        <Marker position={position} icon={hereIcon}>
          <Popup>
            <div className="font-bold text-blue-600 text-center text-base p-2">
              {LOCATION_POPUP_TEXT}
            </div>
          </Popup>
        </Marker>
      )}
    </>
  );
};