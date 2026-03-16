import React from 'react';

export interface Auction {
  title: string;
  price: number;
  appraisal: number;
  surfaceArea: number;
  closingDate: string;
  status: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface AuctionCardProps {
  auction: Auction;
  onActionClick?: () => void;
  actionLabel?: string;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({
  auction,
  onActionClick,
  actionLabel = 'Ver Detalles',
}) => {
  const getRiskColorClass = (level: string) => {
    if (level === 'low') return 'bg-risk-low';
    if (level === 'medium') return 'bg-risk-medium';
    return 'bg-risk-high';
  };

  const getRiskTextColorClass = (level: string) => {
    if (level === 'low') return 'text-risk-low';
    if (level === 'medium') return 'text-risk-medium';
    return 'text-risk-high';
  };

  return (
    <div className="card-dark w-full max-w-sm mx-auto flex flex-col gap-4 relative overflow-hidden shadow-xl">
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full text-xs font-medium border border-white/10">
        <span className={`w-2 h-2 rounded-full ${getRiskColorClass(auction.riskLevel)}`} />
        <span className={getRiskTextColorClass(auction.riskLevel)}>{auction.status}</span>
      </div>

      <div className="pt-8">
        <h1 className="text-3xl font-bold text-primary-yellow mb-1">
          €{auction.price.toLocaleString()}
        </h1>
        <p className="text-sm text-white/50 mb-6">
          Valor tasado: €{auction.appraisal.toLocaleString()}
        </p>

        <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3 mb-3">
          <span className="text-white/60">Superficie</span>
          <span className="font-semibold">{auction.surfaceArea} m²</span>
        </div>

        <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3 mb-3">
          <span className="text-white/60">Cierra la subasta</span>
          <span className="font-semibold text-primary-yellow">{auction.closingDate}</span>
        </div>

        {onActionClick && (
          <button
            onClick={onActionClick}
            className="w-full btn btn-primary py-3 rounded-xl font-bold text-[var(--ultra-black)] shadow-md mt-4"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};
