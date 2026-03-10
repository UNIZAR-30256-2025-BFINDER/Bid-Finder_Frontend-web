import React from 'react';
import { AuctionCard, Auction } from '../AuctionCard';

interface ProblemSolutionProps {
    title: React.ReactNode;
    description: React.ReactNode;
    onViewDetails: () => void;
}

export const ProblemSolutionSection: React.FC<ProblemSolutionProps> = ({ title, description, onViewDetails }) => {
    const heroAuction: Auction = {
        title: "Piso 3 Habs Madrid",
        price: 87500,
        appraisal: 150000,
        surfaceArea: 90,
        closingDate: "12 Feb 2026",
        status: "Libre",
        riskLevel: "low"
    };

    return (
        <section className="py-32 px-8 md:px-16">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1 flex justify-center">
                    <AuctionCard
                        auction={heroAuction}
                        onActionClick={onViewDetails}
                        actionLabel="Ver Detalles"
                    />
                </div>

                <div className="order-1 md:order-2">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-primary-yellow">
                        {title}
                    </h2>
                    <p className="text-xl text-white/70 leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    );
};
