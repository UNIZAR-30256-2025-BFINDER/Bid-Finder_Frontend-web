/**
 * @fileoverview Sección explicativa de la funcionalidad del mapa interactivo.
 */

import React from 'react';
import { SubastaMap } from '../../map/components/SubastaMap';

interface MapSectionProps {
  title: React.ReactNode;
  description: React.ReactNode;
}

/**
 * Muestra el valor añadido del mapa interactivo junto a una previsualización real del mapa.
 * @param {MapSectionProps} props - Textos descriptivos de la sección.
 */
export const MapSection: React.FC<MapSectionProps> = ({ title, description }) => {
  return (
    <section className="py-24 px-8 md:px-16 border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary-yellow">{title}</h2>
          <p className="text-xl text-white/70 leading-relaxed mb-8">{description}</p>
        </div>
        <div className="w-full h-[400px]">
          <SubastaMap subastas={[]} />
        </div>
      </div>
    </section>
  );
};