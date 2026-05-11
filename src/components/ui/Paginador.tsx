/**
 * @fileoverview Componente de Paginación genérico.
 * Permite navegar a través de grandes volúmenes de datos divididos en páginas.
 */

import React from 'react';

interface PaginadorProps {
  /** Cantidad total de elementos */
  total: number;
  /** Página actual activa */
  page: number;
  /** Cantidad de elementos a mostrar por cada página */
  perPage: number;
  /** Callback que se dispara al hacer clic en un número de página */
  onPageChange: (page: number) => void;
}

/**
 * Renderiza una botonera con los números de página calculados dinámicamente.
 * Si solo hay una página, el componente no se renderiza (oculto).
 */
export const Paginador: React.FC<PaginadorProps> = ({ total, page, perPage, onPageChange }) => {
  const totalPages = Math.ceil(total / perPage);
  
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`px-3 py-1 rounded font-bold text-sm ${
            page === i + 1 
              ? 'bg-yellow-400 text-black' 
              : 'bg-white/10 text-white hover:bg-yellow-400 hover:text-black transition-colors'
          }`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};