import React, { useState } from 'react';
import { SubastaCard } from './SubastaCard';
import type { Subasta } from '../../../../models/Subasta';
import { Paginador } from '../../../../components/ui/Paginador';
import { useNavigate } from 'react-router-dom';

interface SubastaListProps {
  subastas: Subasta[];
}

export const SubastaList: React.FC<SubastaListProps> = ({ subastas }) => {
  const [page, setPage] = useState(1);
  const perPage = 6;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paged = subastas.slice(start, end);
  const navigate = useNavigate();

  if (!subastas || subastas.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 border border-dashed border-white/20 rounded-xl text-center text-gray-500 bg-white/5">
        <p>No hay subastas en esta zona del mapa</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
          {paged.map((subasta) => (
            <SubastaCard
              key={subasta.id}
              title={subasta.titulo}
              price={subasta.precioActual}
              image={subasta.imagen}
              location={
                subasta.type === 'house'
                  ? 'Vivienda'
                  : subasta.type === 'car'
                    ? 'Vehículo'
                    : subasta.type
              }
              onClick={() => navigate(`/subastas/${subasta.id}`)}
            />
          ))}
        </div>
      </div>

      {/* PAGINADOR FIJO AL FONDO */}
      <div className="pt-4 mt-auto border-t border-white/10 shrink-0">
        <Paginador 
          total={subastas.length} 
          page={page} 
          perPage={perPage} 
          onPageChange={setPage} 
        />
      </div>
      
    </div>
  );
};
