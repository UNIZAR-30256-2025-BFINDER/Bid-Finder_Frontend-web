/**
 * @fileoverview Componente que gestiona el marcador de posición del usuario.
 * Incluye un botón flotante para centrar la vista y un marcador visual en el mapa.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { LocateFixed } from 'lucide-react';
import {
  handleLocationFound,
  hereIcon,
  LOCATION_POPUP_TEXT,
  LOCATION_BUTTON_TITLE,
  LOCATION_DENIED_WARNING,
} from './mapConstants';

export const LocationMarker = () => {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMap();
  const shouldFlyToRef = useRef(false);

  const locate = useCallback(
    (flyTo: boolean) => {
      shouldFlyToRef.current = flyTo;
      map.locate();
    },
    [map],
  );

  useEffect(() => {
    const hasSavedView = !!sessionStorage.getItem('bidfinder_map_view');
    locate(!hasSavedView);

    const onLocationFound = (e: L.LocationEvent) => {
      handleLocationFound(map, setPosition, shouldFlyToRef.current)(e);
    };

    const onLocationError = (e: L.ErrorEvent) => {
      console.warn(LOCATION_DENIED_WARNING, e.message);
    };

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    return () => {
      map.off('locationfound', onLocationFound);
      map.off('locationerror', onLocationError);
    };
  }, [locate, map]);

  return (
    <>
      <div className="fixed md:absolute left-6 bottom-8 md:left-6 md:bottom-20 z-[1001]">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            locate(true);
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
