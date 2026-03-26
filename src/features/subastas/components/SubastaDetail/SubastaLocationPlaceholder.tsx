import React from 'react';

const SubastaLocationPlaceholder: React.FC = () => (
  <section>
    <h2 className="text-lg md:text-xl font-semibold mb-4">Ubicación</h2>
    <div className="rounded-2xl overflow-hidden border border-gray-200 bg-[#121723] p-3">
      <div className="relative h-[220px] md:h-[320px] rounded-xl overflow-hidden bg-[radial-gradient(circle_at_center,_rgba(255,208,0,0.12),_transparent_30%),linear-gradient(180deg,_#1b2233_0%,_#0f1420_100%)]">
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-yellow-400 text-black font-bold flex items-center justify-center shadow-lg">
              📍
            </div>
            <p className="text-white/80 text-sm md:text-base text-center px-4">
              Mapa de ubicación placeholder
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SubastaLocationPlaceholder;
