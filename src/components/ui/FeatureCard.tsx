import React from 'react';
import {
  ShieldCheck,
  MapTrifold,
  TrafficSignal,
  BellRinging,
  ClockCountdown,
  UsersThree,
} from '@phosphor-icons/react';

interface FeatureCardProps {
  iconType: 'shield' | 'map' | 'signal' | 'bell' | 'clock' | 'users';
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ iconType, title, description }) => {
  const renderIcon = () => {
    const iconProps = { size: 32, weight: 'regular' as const, color: 'var(--primary-yellow)' };

    switch (iconType) {
      case 'shield':
        return <ShieldCheck {...iconProps} />;
      case 'map':
        return <MapTrifold {...iconProps} />;
      case 'signal':
        return <TrafficSignal {...iconProps} />;
      case 'bell':
        return <BellRinging {...iconProps} />;
      case 'clock':
        return <ClockCountdown {...iconProps} />;
      case 'users':
        return <UsersThree {...iconProps} />;
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
