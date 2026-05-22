/**
 * @fileoverview Sección de características (Features) de la Landing Page.
 * Muestra una rejilla de tarjetas resaltando las funcionalidades principales de la plataforma.
 */

import React from 'react';
import { FeatureCard } from '../../../components/ui/FeatureCard';

export interface Feature {
  iconType: 'map' | 'shield' | 'signal' | 'bell' | 'clock' | 'users';
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  features: Feature[];
}

/**
 * Renderiza un bloque con título, subtítulo y una lista de tarjetas de características.
 * @param {FeaturesSectionProps} props - Propiedades con el contenido de la sección.
 */
export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ title, subtitle, features }) => {
  return (
    <section className="relative py-24 px-8 md:px-16 border-t border-white/5 bg-[#0b0f19] overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">{title}</h2>
          <p className="text-gray-400 text-xl max-w-2xl">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              iconType={feature.iconType}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
