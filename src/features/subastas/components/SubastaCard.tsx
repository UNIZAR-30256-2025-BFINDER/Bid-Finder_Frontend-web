import React from 'react';

interface SubastaCardProps {
  title: string;
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
  price,
  location,
  image,
  onClick,
  selected = false,
}) => (
  <div
    className={`rounded-xl shadow-md bg-[#0b0f19] text-white cursor-pointer border-2 transition-all duration-150 ${selected ? 'border-yellow-400' : 'border-transparent'} hover:border-yellow-400`}
    onClick={onClick}
    style={{ minWidth: 0 }}
  >
    <div className="h-32 w-full relative rounded-t-xl overflow-hidden">
      <img
        src={image || fallbackImg}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src = fallbackImg;
        }}
      />
    </div>
    <div className="flex flex-col gap-1 p-4">
      <span className="font-bold text-base truncate" title={title}>
        {title}
      </span>
      <span className="text-yellow-400 font-bold text-lg">{price.toLocaleString('es-ES')} €</span>
      {location && <span className="text-xs text-gray-400">{location}</span>}
    </div>
  </div>
);
