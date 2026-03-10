import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
    return (
        <footer className="py-12 px-8 md:px-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 bg-black/80">
            <Logo />
            <div className="flex gap-8 text-sm font-semibold text-white/70">
                <a href="#" className="hover:text-primary-yellow transition-colors">Features</a>
                <a href="#" className="hover:text-primary-yellow transition-colors">Aviso Legal</a>
                <a href="#" className="hover:text-primary-yellow transition-colors">Contacto</a>
            </div>
            <div className="text-xs text-white/30 text-center md:text-right">
                © 2026 BidFinder. Todos los derechos reservados.
            </div>
        </footer>
    );
};
