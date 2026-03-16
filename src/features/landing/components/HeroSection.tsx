import React from 'react';

interface HeroSectionProps {
  title: React.ReactNode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ title }) => {
  return (
    <section className="relative py-32 px-8 md:px-16 flex flex-col items-center text-center justify-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center z-10 pt-16">
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
          {title}
        </h1>
      </div>

      {/* Abstract Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-yellow/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};
