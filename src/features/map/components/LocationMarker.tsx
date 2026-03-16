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
      <div className="leaflet-bottom leaflet-right mb-24 mr-6 z-[1000]">
        <div className="leaflet-control leaflet-bar border-none shadow-none">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLocate();
            }}
            className="flex items-center justify-center w-14 h-14 bg-white hover:bg-gray-100 text-slate-800 rounded-full shadow-xl transition-colors border border-slate-200 text-2xl"
            title={LOCATION_BUTTON_TITLE}
          >
            <LocateFixed size={32} />
          </button>
        </div>
      </div>

      {position && (
        <Marker position={position} icon={hereIcon}>
          <Popup>
            <div className="font-bold text-blue-600 text-center">{LOCATION_POPUP_TEXT}</div>
          </Popup>
        </Marker>
      )}
    </>
  );
};
