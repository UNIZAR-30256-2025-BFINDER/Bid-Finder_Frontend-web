import React from 'react';

interface PaginadorProps {
  total: number;
  page: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

export const Paginador: React.FC<PaginadorProps> = ({ total, page, perPage, onPageChange }) => {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`px-3 py-1 rounded font-bold text-sm ${page === i + 1 ? 'bg-yellow-400 text-black' : 'bg-white/10 text-white hover:bg-yellow-400 hover:text-black transition-colors'}`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};
