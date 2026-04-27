import React from 'react';
import { XCircle } from 'lucide-react';

interface FavoritosCardProps {
  id: string; 
  title: string;
  subtitle: string;
  price: number;
  location?: string;
  image?: string;
  onClick?: () => void;
  onRemove?: () => void;
  isRemoving?: boolean;
}

const fallbackImg =
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=300';

export const FavoritosCard: React.FC<FavoritosCardProps> = ({
  title,
  subtitle,
  price,
  location,
  image,
  onClick,
  onRemove,
  isRemoving = false,
}) => {
  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <div
      className="group relative min-w-0 rounded-xl shadow-md bg-[#111827] text-white cursor-pointer border-2 border-transparent hover:border-yellow-400 hover:bg-white/10 transition-all duration-300 overflow-hidden"
      onClick={onClick}
    >
      {/* Botón eliminar (superior derecha) */}
      {onRemove && (
        <button
          onClick={handleRemoveClick}
          disabled={isRemoving}
          className="absolute top-2 right-2 z-10 bg-black/70 hover:bg-red-600 rounded-full p-1.5 transition-colors"
          title="Quitar de favoritos"
        >
          <XCircle size={18} className="text-white" />
        </button>
      )}

      <div className="aspect-video w-full relative overflow-hidden bg-black/50">
        <img
          src={image || fallbackImg}
          alt={subtitle}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackImg;
          }}
        />
        {location && (
          <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md font-medium">
            {location}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 p-4">
        <span className="font-bold text-base truncate" title={title}>
          {title}
        </span>
        <span className="text-yellow-400 font-bold text-xl tracking-tight">
          {price?.toLocaleString('es-ES')} €
        </span>
      </div>
    </div>
  );
};