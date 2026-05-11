/**
 * @fileoverview Sección de "Problema y Solución" en la Landing Page.
 * Contrasta la dificultad de leer el BOE con la claridad visual de BidFinder.
 */

import React from 'react';
import { Subasta } from '../../../models/Subasta';
import { SubastaCard } from '../../map/components/subastas/SubastaCard';

interface ProblemSolutionProps {
  title: React.ReactNode;
  description: React.ReactNode;
  onViewDetails: () => void;
}

/**
 * Renderiza un bloque con una tarjeta de subasta de ejemplo y un texto persuasivo.
 * @param {ProblemSolutionProps} props - Contenido y acción del botón de la tarjeta.
 */
export const ProblemSolutionSection: React.FC<ProblemSolutionProps> = ({
  title,
  description,
  onViewDetails,
}) => {
  const heroSubasta: Subasta = {
    id: 'mock-1',
    titulo: 'Piso 3 Habs Madrid',
    precio: 87500,
    descripcion: 'Piso céntrico con 3 habitaciones y 2 baños. Ideal para inversión.',
    urlPdf: '',
    lat: 40.4168,
    lng: -3.7038,
    type: 'house',
    viabilidad: 'green',
    precioActual: 87500,
    valorSubasta: 150000,
    imagen: '/Bfinder_logo.png', 
    urlOriginal: '',
  };

  return (
    <section className="py-32 px-8 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1 flex justify-center">
          <SubastaCard
            key={heroSubasta.id}
            title={heroSubasta.titulo}
            subtitle={heroSubasta.descripcion} 
            price={heroSubasta.precioActual}
            image={heroSubasta.imagen}
            location={heroSubasta.type}
            onClick={onViewDetails}
          />
        </div>

        <div className="order-1 md:order-2">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-primary-yellow">
            {title}
          </h2>
          <p className="text-xl text-white/70 leading-relaxed">{description}</p>
        </div>
      </div>
    </section>
  );
};