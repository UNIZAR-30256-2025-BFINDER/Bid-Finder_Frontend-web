import React from 'react';
import { SubastaCard } from './SubastaCard';

import type { Subasta } from './subastasMocks';
import { Paginador } from '../../../components/ui/Paginador';
import { useState } from 'react';

interface SubastaListProps {
  subastas: Subasta[];
}

export const SubastaList: React.FC<SubastaListProps> = ({ subastas }) => {
  const [page, setPage] = useState(1);
  const perPage = 6;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paged = subastas.slice(start, end);

  if (!subastas || subastas.length === 0) {
    return (
      <div className="p-8 border border-dashed border-white/20 rounded-xl text-center text-gray-500 bg-white/5">
        No hay subastas cerca
      </div>
    );
  }
  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paged.map((subasta) => (
            <SubastaCard
              key={subasta.id}
              title={subasta.name}
              price={subasta.precioActual}
              image={subasta.imagen}
              location={
                subasta.type === 'house'
                  ? 'Vivienda'
                  : subasta.type === 'car'
                    ? 'Vehículo'
                    : subasta.type
              }
            />
          ))}
        </div>
      </div>
      <Paginador total={subastas.length} page={page} perPage={perPage} onPageChange={setPage} />
    </>
  );
};
