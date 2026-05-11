/**
 * @fileoverview Tarjeta descriptiva para la Landing Page.
 * Muestra un icono, un título y una descripción de una funcionalidad clave.
 */

import React from 'react';
import {
  ShieldCheck,
  Map,
  Signal,
  Bell,
  Clock,
  Users,
} from 'lucide-react';

interface FeatureCardProps {
  /** Identificador del icono a renderizar */
  iconType: 'shield' | 'map' | 'signal' | 'bell' | 'clock' | 'users';
  /** Título de la funcionalidad */
  title: string;
  /** Breve descripción del valor que aporta */
  description: string;
}

/**
 * Renderiza una tarjeta de característica con iconos de Lucide unificados.
 * @param {FeatureCardProps} props - Propiedades del componente.
 */
export const FeatureCard: React.FC<FeatureCardProps> = ({ iconType, title, description }) => {
  const renderIcon = () => {
    const iconProps = { size: 32, color: 'var(--primary-yellow)' };

    switch (iconType) {
      case 'shield':
        return <ShieldCheck {...iconProps} />;
      case 'map':
        return <Map {...iconProps} />;
      case 'signal':
        return <Signal {...iconProps} />;
      case 'bell':
        return <Bell {...iconProps} />;
      case 'clock':
        return <Clock {...iconProps} />;
      case 'users':
        return <Users {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 hover:bg-white/5 rounded-2xl transition-colors border-l-2 border-transparent hover:border-primary-yellow">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-yellow/10">
        {renderIcon()}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-white/60 leading-relaxed text-sm">{description}</p>
    </div>
  );
};