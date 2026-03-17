import React from 'react';

interface AuctionCardProps {
  title: string;
  currentPrice: number;
  originalPrice: number;
  image?: string;
  badgeText?: string;
  className?: string;
  onViewClick: () => void;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({
  title,
  currentPrice,
  originalPrice,
  image,
  badgeText = 'Subasta Activa',
  className = '',
  onViewClick,
}) => {
  const fallbackImage =
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=300';

  return (
    <div
      className={`bg-[#0b0f19] rounded-xl font-sans text-white flex flex-col m-0 p-0 ${className}`}
      style={{ boxShadow: 'none', border: 'none' }}
    >
      <div className="h-32 w-full relative shrink-0">
        <img src={image || fallbackImage} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 bg-yellow-400 text-black text-[10px] uppercase tracking-wide font-extrabold px-2 py-1 rounded shadow">
          {badgeText}
        </div>
      </div>

      <div
        className="p-4 flex flex-col gap-3 flex-grow justify-between"
        style={{ background: 'transparent', boxShadow: 'none', border: 'none' }}
      >
        <h3 className="font-bold text-sm text-gray-100 truncate" title={title}>
          {title}
        </h3>

        <div
          className="flex items-end justify-between p-2 rounded-lg"
          style={{ background: 'rgba(0,0,0,0.7)', border: 'none' }}
        >
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Puja actual</span>
            <span className="text-yellow-400 font-bold text-base">
              {currentPrice.toLocaleString('es-ES')} €
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Valor Real</span>
            <span className="text-gray-500 text-xs font-medium line-through decoration-red-500/50">
              {originalPrice.toLocaleString('es-ES')} €
            </span>
          </div>
        </div>

        <button
          onClick={onViewClick}
          className="w-full bg-yellow-400 text-black hover:bg-yellow-300 transition-colors py-2 rounded-lg text-xs font-bold mt-1"
        >
          VER DETALLES
        </button>
      </div>
    </div>
  );
};
