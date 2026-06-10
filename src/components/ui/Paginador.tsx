/**
 * @fileoverview Componente de Paginación genérico.
 * Permite navegar a través de grandes volúmenes de datos divididos en páginas.
 */

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
 * Renderiza una botonera inteligente con el rango de páginas y elipsis.
 * Si solo hay una página, el componente no se renderiza (oculto).
 */
export const Paginador: React.FC<PaginadorProps> = ({ total, page, perPage, onPageChange }) => {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | string)[] = [];
    const windowSize = 1; // cantidad de páginas adyacentes a mostrar

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const showStartEllipsis = page > 3;
      const showEndEllipsis = page < totalPages - 2;

      if (!showStartEllipsis && showEndEllipsis) {
        for (let i = 1; i <= 3; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (showStartEllipsis && !showEndEllipsis) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = page - windowSize; i <= page + windowSize; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex items-center justify-center gap-1.5 mt-2 select-none">
      {/* Botón Anterior */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="p-1.5 rounded bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-40 disabled:hover:text-slate-400 disabled:hover:bg-white/5 disabled:cursor-not-allowed transition-all cursor-pointer"
        title="Página anterior"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Números de página */}
      {pages.map((p, idx) => {
        if (p === '...') {
          return (
            <span key={`ellipsis-${idx}`} className="px-1 text-slate-500 font-medium">
              ...
            </span>
          );
        }

        const pageNum = p as number;
        const isActive = page === pageNum;

        return (
          <button
            key={`page-${pageNum}`}
            className={`min-w-[28px] h-7 px-1.5 rounded font-bold text-xs transition-all cursor-pointer ${
              isActive
                ? 'bg-yellow-400 text-black shadow-md shadow-yellow-400/10'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:border-yellow-400/30 hover:text-yellow-400 hover:bg-yellow-400/5'
            }`}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Botón Siguiente */}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="p-1.5 rounded bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-40 disabled:hover:text-slate-400 disabled:hover:bg-white/5 disabled:cursor-not-allowed transition-all cursor-pointer"
        title="Página siguiente"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};
