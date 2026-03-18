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

export const LocationMarker = () => {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMap();

  const handleLocate = React.useCallback(() => {
    map.locate();
  }, [map]);

  useEffect(() => {
    handleLocate();
    map.on('locationfound', handleLocationFound(map, setPosition));
    map.on('locationerror', (e) => {
      console.warn(LOCATION_DENIED_WARNING, e.message);
    });
  }, [handleLocate, map]);

  return (
    <>
      <div className="leaflet-bottom leaflet-right mb-32 md:mb-24 mr-4 md:mr-6 z-[1000]">
        <div className="leaflet-control leaflet-bar border-none shadow-none">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLocate();
            }}
            className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-gray-100 text-slate-800 rounded-full shadow-xl transition-colors border border-slate-200 text-2xl md:text-2xl"
            title={LOCATION_BUTTON_TITLE}
          >
            <LocateFixed size={24} className="md:size-8" />
          </button>
        </div>
      </div>

      {position && (
        <Marker position={position} icon={hereIcon}>
          <Popup>
            <div className="font-bold text-blue-600 text-center text-base md:text-lg p-2 md:p-3 min-w-[100px] max-w-[200px] md:max-w-xs">
              {LOCATION_POPUP_TEXT}
            </div>
          </Popup>
        </Marker>
      )}
    </>
  );
};
