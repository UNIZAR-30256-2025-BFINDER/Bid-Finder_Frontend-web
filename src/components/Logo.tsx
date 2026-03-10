import React from 'react';

export const Logo: React.FC = () => {
    return (
        <a href="#" className="flex items-center gap-3">
            {/* CSS badge shape with B inside, pero ahora totalmente redondeado (flow redondeado) */}
            <div className="w-10 h-10 bg-primary-yellow rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200">
                <span className="text-2xl font-black text-ultra-black" style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '-1px' }}>
                    B
                </span>
            </div>
            <span className="text-xl font-bold tracking-tight uppercase hidden sm:block">
                <span className="text-primary-yellow">B</span><span className="text-white">-FINDER</span>
            </span>
        </a>
    );
};
