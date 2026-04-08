import React from 'react';

interface SubastaCardProps {
  title: string;
  subtitle: string;
  price: number;
  location?: string;
  image?: string;
  onClick?: () => void;
  selected?: boolean;
}

const fallbackImg =
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=300';

export const SubastaCard: React.FC<SubastaCardProps> = ({
  title,
  subtitle,
  price,
  location,
  image,
  onClick,
  selected = false,
}) => (
  <div
    className={`group min-w-0 rounded-xl shadow-md bg-[#111827] text-white cursor-pointer border-2 transition-all duration-300 overflow-hidden ${
      selected
        ? 'border-yellow-400 bg-white/10'
        : 'border-transparent hover:border-yellow-400 hover:bg-white/10'
    }`}
    onClick={onClick}
  >
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

    {/* Contenido de texto */}
    <div className="flex flex-col gap-1 p-4">
      <span className="font-bold text-base truncate" title={title}>
        {title}
      </span>
      <span className="text-yellow-400 font-bold text-xl tracking-tight">
        {price.toLocaleString('es-ES')} €
      </span>
    </div>
  </div>
);
