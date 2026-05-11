/**
 * @fileoverview Componente integrador del mapa de subastas.
 * Configura el contenedor de Leaflet, las capas de teselas y los eventos de interacción.
 */

import React from 'react';
import { useEffect } from 'react';
import { setDefaultMarkerIcon, MAP_DEFAULT_ZOOM, MAP_MIN_ZOOM, MAP_MAX_ZOOM } from './mapConstants';
import { useGeolocation } from '../hooks/useGeolocation';
import { useMapAutoResize } from '../hooks/useMapAutoResize';
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';
import { LocationMarker } from './LocationMarker';
import { SubastasMarkers } from '../components/subastas/SubastasMarkers';
import L from 'leaflet';
import type { Subasta } from '../../../models/Subasta';

interface SubastaMapProps {
  /** Colección de subastas a mostrar mediante marcadores */
  subastas: Subasta[];
  /** Notifica al padre cuando cambian los límites visuales del mapa (zoom/pan) */
  onBoundsChange?: (bounds: L.LatLngBounds) => void;
}

/**
 * Renderiza el mapa interactivo principal.
 * Gestiona la carga inicial de iconos y la geolocalización del centro del mapa.
 */
export const SubastaMap: React.FC<SubastaMapProps> = ({ subastas, onBoundsChange }) => {
  useEffect(() => {
    setDefaultMarkerIcon();
  }, []);

  const center = useGeolocation();

  /** Componente interno para aplicar el hook de redimensionamiento automático */
  const MapAutoResize = () => {
    useMapAutoResize();
    return null;
  };

  /** * Componente interno que escucha el evento 'moveend' de Leaflet 
   * para informar sobre el cambio de área visible.
   */
  function BoundsNotifier() {
    useMapEvent('moveend', (e) => {
      if (onBoundsChange) {
        onBoundsChange(e.target.getBounds());
      }
    });
    return null;
  }

  if (!center) {
    return (
      <div className="w-full h-[92vh] min-h-[600px] z-0 relative rounded-lg overflow-hidden shadow-md flex items-center justify-center">
        Cargando mapa...
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-0 flex-1 z-0 relative rounded-lg shadow-md">
      <MapContainer
        center={center}
        zoom={MAP_DEFAULT_ZOOM}
        minZoom={MAP_MIN_ZOOM}
        maxZoom={MAP_MAX_ZOOM}
        scrollWheelZoom={true}
        className="w-full h-full bg-[#0b0f19] rounded-lg" 
        preferCanvas={true}
      >
        <MapAutoResize />
        <BoundsNotifier />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />

        <SubastasMarkers subastas={subastas} />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};