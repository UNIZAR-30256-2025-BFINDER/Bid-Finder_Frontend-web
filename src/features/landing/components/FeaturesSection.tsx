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

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ title, subtitle, features }) => {
  return (
    <section className="py-24 px-8 md:px-16 border-t border-white/5 bg-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">{title}</h2>
          <p className="text-white/50 text-xl">{subtitle}</p>
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
