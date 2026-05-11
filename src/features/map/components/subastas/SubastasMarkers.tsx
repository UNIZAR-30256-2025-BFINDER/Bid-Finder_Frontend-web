/**
 * @fileoverview Capa de marcadores geolocalizados para el mapa.
 * Gestiona el clustering de puntos y la apertura de popups detallados.
 */

import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { getSubastaIcon } from './subastasIcons';
import type { Subasta } from '../../../../models/Subasta';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { createYellowClusterIcon } from '../mapConstants';
import { AuctionCard } from '../popup/subastaPopupCard';
import { useNavigate } from 'react-router-dom';

interface SubastasMarkersProps {
  /** Colección de subastas que contienen datos de geolocalización */
  subastas: Subasta[];
}

/**
 * Renderiza los marcadores en el mapa utilizando clustering para optimizar el rendimiento.
 * Solo muestra marcadores que tengan coordenadas válidas y el flag 'hasLocation' activo.
 */
export const SubastasMarkers: React.FC<SubastasMarkersProps> = ({ subastas = [] }) => {
  const navigate = useNavigate();

  if (!Array.isArray(subastas)) return null;

  return (
    <MarkerClusterGroup
      chunkedLoading
      showCoverageOnHover={false}
      iconCreateFunction={createYellowClusterIcon}
    >
      {subastas.map((subasta: Subasta) => {
        if (!subasta.hasLocation || subasta.lat === undefined || subasta.lng === undefined) return null;

        return (
          <Marker
            key={subasta.id}
            position={[subasta.lat, subasta.lng]}
            icon={getSubastaIcon(subasta.type, subasta.viabilidad)}
          >
            <Popup className="leaflet-popup-transparent !p-2 md:!p-4 !min-w-[180px] !max-w-[90vw] md:!max-w-xs" closeButton={false}>
              <div style={{ background: 'transparent', boxShadow: 'none', padding: 0, border: 'none' }}>
                <AuctionCard
                  title={subasta.titulo}
                  currentPrice={subasta.precioActual || 0}
                  originalPrice={subasta.valorSubasta || 0}
                  onViewClick={() => navigate(`/subastas/${subasta.id}`)}
                />
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MarkerClusterGroup>
  );
};