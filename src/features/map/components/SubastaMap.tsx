/**
 * @fileoverview Componente integrador del mapa de subastas.
 * Configura el contenedor de Leaflet, las capas de teselas, límites, zoom suave
 * y persistencia de la posición durante la sesión.
 */

import React from 'react';
import { useEffect, useState, useRef } from 'react';
import {
  setDefaultMarkerIcon,
  MAP_DEFAULT_ZOOM,
  MAP_MIN_ZOOM,
  MAP_MAX_ZOOM,
  MAP_ZOOM_DELTA,
  MAP_ZOOM_SNAP,
  SPAIN_MAX_BOUNDS,
  MAP_DEFAULT_CENTER,
} from './mapConstants';
import { useGeolocation } from '../hooks/useGeolocation';
import { useMapAutoResize } from '../hooks/useMapAutoResize';
import { MapContainer, TileLayer, useMapEvent, useMap } from 'react-leaflet';
import { LocationMarker } from './LocationMarker';
import { SubastasMarkers } from '../components/subastas/SubastasMarkers';
import L from 'leaflet';
import type { Subasta } from '../../../models/Subasta';

interface SubastaMapProps {
  subastas: Subasta[];
  onBoundsChange?: (bounds: L.LatLngBounds) => void;
  onMapReady?: (map: L.Map) => void;
}

function MarkersVisibilityController({ children }: { children: React.ReactNode }) {
  const map = useMap();
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const hide = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setVisible(false);
    };

    const show = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setVisible(true), 120);
    };

    map.on('zoomstart', hide);
    map.on('zoomend', show);

    return () => {
      map.off('zoomstart', hide);
      map.off('zoomend', show);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [map]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: visible ? 'opacity 0.15s ease-in' : 'none',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {children}
    </div>
  );
}

export const SubastaMap: React.FC<SubastaMapProps> = ({ subastas, onBoundsChange, onMapReady }) => {
  const userLocation = useGeolocation();

  const [initialView] = useState(() => {
    const saved = sessionStorage.getItem('bidfinder_map_view');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          center: [parsed.lat, parsed.lng] as [number, number],
          zoom: parsed.zoom as number,
          hasSavedView: true,
        };
      } catch (e) {
        console.error('Error leyendo estado del mapa', e);
      }
    }
    return {
      center: MAP_DEFAULT_CENTER,
      zoom: MAP_DEFAULT_ZOOM,
      hasSavedView: false,
    };
  });

  useEffect(() => {
    setDefaultMarkerIcon();
  }, []);

  const MapAutoResize = () => {
    useMapAutoResize();
    return null;
  };

  const InitialViewHandler = ({ location }: { location: [number, number] | null }) => {
    const map = useMap();
    useEffect(() => {
      if (!initialView.hasSavedView && location) {
        map.setView(location, 14);
      }
    }, [map, location]);
    return null;
  };

  /** Componente para extraer la instancia del mapa y pasarla al padre */
  const MapInstanceExtractor = () => {
    const map = useMap();
    useEffect(() => {
      if (onMapReady) {
        onMapReady(map);
      }
    }, [map]);
    return null;
  };

  function BoundsNotifier() {
    useMapEvent('moveend', (e) => {
      const map = e.target as L.Map;
      const center = map.getCenter();
      const zoom = map.getZoom();

      sessionStorage.setItem(
        'bidfinder_map_view',
        JSON.stringify({
          lat: center.lat,
          lng: center.lng,
          zoom: zoom,
        }),
      );

      if (onBoundsChange) {
        onBoundsChange(map.getBounds());
      }
    });
    return null;
  }

  return (
    <div className="w-full h-full min-h-0 flex-1 z-0 relative rounded-lg shadow-md">
      <MapContainer
        center={initialView.center}
        zoom={initialView.zoom}
        minZoom={MAP_MIN_ZOOM}
        maxZoom={MAP_MAX_ZOOM}
        zoomDelta={MAP_ZOOM_DELTA}
        zoomSnap={MAP_ZOOM_SNAP}
        maxBounds={SPAIN_MAX_BOUNDS}
        maxBoundsViscosity={0.5}
        scrollWheelZoom={true}
        className="w-full h-full bg-[#0b0f19] rounded-lg"
        preferCanvas={true}
      >
        <MapInstanceExtractor />
        <MapAutoResize />
        <InitialViewHandler location={userLocation} />
        <BoundsNotifier />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />

        <MarkersVisibilityController>
          <SubastasMarkers subastas={subastas} />
        </MarkersVisibilityController>

        <LocationMarker />
      </MapContainer>
    </div>
  );
};
