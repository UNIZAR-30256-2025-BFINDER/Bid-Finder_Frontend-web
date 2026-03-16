import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  logo: React.ReactNode;
  links?: React.ReactNode;
  actions?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ logo, links, actions }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-[#0b0f19] border-b border-white/10 shadow-lg backdrop-blur-sm">
      {/* BARRA PRINCIPAL */}
      <div className="flex items-center justify-between py-4 px-6 md:px-12">
        {/* 1. Izquierda: Logo */}
        <div className="flex-shrink-0 font-bold text-xl tracking-widest text-white">{logo}</div>

        {/* 2. Centro: Enlaces (Ocultos en móvil) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          {links}
        </nav>

        {/* 3. Derecha: Acciones (Buscador) y Botón Menú Móvil */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">{actions}</div>

          {/* Botón Movil */}
          <button
            className="md:hidden text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MENÚ  MÓVIL */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0b0f19] border-t border-white/10 px-6 py-4 flex flex-col gap-6">
          {/* Enlaces en formato vertical para móvil */}
          <nav className="flex flex-col gap-4 text-base font-medium text-gray-300">{links}</nav>

          {/* Acciones en formato vertical */}
          <div className="flex flex-col gap-4">{actions}</div>
        </div>
      )}
    </header>
  );
};
