/**
 * @fileoverview Sección explicativa de la funcionalidad del mapa interactivo.
 * Renderiza una previsualización estática del mapa y un botón de acción.
 */

import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { DefaultIcon } from '../../map/components/mapConstants';

interface MapSectionProps {
  title: React.ReactNode;
  description: React.ReactNode;
}

/**
 * Muestra el valor añadido del mapa interactivo mediante una previsualización
 * bloqueada y una llamada a la acción clara hacia el Dashboard.
 * @param {MapSectionProps} props - Textos descriptivos de la sección.
 */
export const MapSection: React.FC<MapSectionProps> = ({ title, description }) => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 px-8 md:px-16 border-t border-white/5 bg-[#0b0f19] overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-yellow-400">{title}</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">{description}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-yellow-400 text-black font-bold text-base hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-yellow-400/20"
          >
            Explorar el Mapa Completo
          </button>
        </div>
        <div className="w-full h-[400px] relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent pointer-events-none" />
          <MapContainer
            center={[39.5, -3.5]}
            zoom={6}
            zoomControl={false}
            scrollWheelZoom={false}
            dragging={false}
            doubleClickZoom={false}
            touchZoom={false}
            keyboard={false}
            className="w-full h-full z-0"
            attributionControl={false}
          >
            <TileLayer url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png" />
            <Marker position={[40.4168, -3.7038]} icon={DefaultIcon} />
            <Marker position={[41.3851, 2.1734]} icon={DefaultIcon} />
            <Marker position={[37.3891, -5.9845]} icon={DefaultIcon} />
            <Marker position={[39.4699, -0.3763]} icon={DefaultIcon} />
          </MapContainer>
        </div>
      </div>
    </section>
  );
};
