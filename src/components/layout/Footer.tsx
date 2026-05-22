/**
 * @fileoverview Pie de página genérico de la aplicación.
 * Usado en la Landing Page y en vistas públicas sin scroll infinito.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';

/**
 * Renderiza el footer con enlaces legales, de navegación y copyright.
 */
export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-8 md:px-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 bg-[#050816]">
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="cursor-pointer"
      >
        <Logo />
      </div>
      <div className="flex gap-8 text-sm font-semibold text-gray-300">
        <Link to="/dashboard" className="hover:text-yellow-400 transition-colors">
          Explorar Mapa
        </Link>
        <Link to="/terminos" className="hover:text-yellow-400 transition-colors">
          Aviso Legal
        </Link>
        <Link to="/privacidad" className="hover:text-yellow-400 transition-colors">
          Privacidad
        </Link>
        <a
          href="mailto:bidfinder.legal@gmail.com"
          className="hover:text-yellow-400 transition-colors"
        >
          Contacto
        </a>
      </div>
      <div className="text-xs text-gray-500 text-center md:text-right">
        © 2026 BidFinder. Todos los derechos reservados.
      </div>
    </footer>
  );
};
