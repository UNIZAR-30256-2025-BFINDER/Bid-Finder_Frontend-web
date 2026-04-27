// src/features/favoritos/components/FavoritosList.tsx
import React, { useState } from 'react';
import { FavoritosCard } from './FavoritosCard';
import type { Subasta } from '../../../models/Subasta';
import { Paginador } from '../../../components/ui/Paginador';
import { useNavigate } from 'react-router-dom';

interface FavoritosListProps {
  subastas: Subasta[];
  onRemove: (id: string) => void;
  removingIds: Set<string>;
}

export const FavoritosList: React.FC<FavoritosListProps> = ({
  subastas,
  onRemove,
  removingIds,
}) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const perPage = 6;
  const totalPages = Math.max(1, Math.ceil(subastas.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paged = subastas.slice(start, end);

  if (!subastas || subastas.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 border border-dashed border-white/20 rounded-xl text-center text-gray-500 bg-white/5">
        <p>No tienes subastas favoritas aún.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
          {paged.map((subasta) => (
            <FavoritosCard
              key={subasta.id}
              id={subasta.id}
              title={subasta.titulo_resumido ?? subasta.titulo}
              subtitle={subasta.titulo}
              price={subasta.precioActual}
              image={subasta.imagen}
              location={
                subasta.type === 'house'
                  ? 'Vivienda'
                  : subasta.type === 'car'
                    ? 'Vehículo'
                    : subasta.type === 'other'
                      ? 'Otros'
                      : subasta.type
              }
              onClick={() => navigate(`/subastas/${subasta.id}`)}
              onRemove={() => onRemove(subasta.id)}
              isRemoving={removingIds.has(subasta.id)}
            />
          ))}
        </div>
      </div>

      <div className="pt-4 mt-auto border-t border-white/10 shrink-0">
        <Paginador
          total={subastas.length}
          page={currentPage}
          perPage={perPage}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};
