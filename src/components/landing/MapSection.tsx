import React from 'react';
import { MapWidget } from '../MapWidget';
interface MapSectionProps {
    title: React.ReactNode;
    description: React.ReactNode;
}

export const MapSection: React.FC<MapSectionProps> = ({ title, description }) => {
    return (
        <section className="py-24 px-8 md:px-16 border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary-yellow">{title}</h2>
                    <p className="text-xl text-white/70 leading-relaxed mb-8">
                        {description}
                    </p>
                </div>

                <MapWidget>
                    <div className="absolute top-10 left-10 w-4 h-4 bg-primary-yellow rounded-full shadow-[0_0_15px_rgba(255,222,33,0.5)] cursor-pointer hover:scale-125 transition-transform" />
                    <div className="absolute top-24 right-20 w-4 h-4 bg-risk-low rounded-full cursor-pointer hover:scale-125 transition-transform" />
                    <div className="absolute bottom-16 left-1/3 w-4 h-4 bg-risk-high rounded-full cursor-pointer hover:scale-125 transition-transform" />

                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 self-end ml-auto mt-auto text-sm shadow-md">
                        <p className="text-white/60">Subastas en tu zona</p>
                        <p className="text-2xl font-bold text-primary-yellow">280</p>
                    </div>
                </MapWidget>
            </div>
        </section>
    );
};
