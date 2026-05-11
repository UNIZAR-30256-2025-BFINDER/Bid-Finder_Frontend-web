/**
 * @fileoverview Barra de navegación principal compartida por toda la app.
 * Diseño responsive que soporta inyección de logo, enlaces y acciones.
 */

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  /** Componente visual del logotipo */
  logo: React.ReactNode;
  /** Enlaces de navegación */
  links?: React.ReactNode;
  /** Botones de acción como Login/Registro o Buscadores */
  actions?: React.ReactNode;
}

/**
 * Header genérico que gestiona su propio estado de apertura para el menú móvil
 * adaptando los elementos inyectados en sus props.
 * @param {NavbarProps} props - Propiedades inyectables del Navbar.
 */
export const Navbar: React.FC<NavbarProps> = ({ logo, links, actions }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-[#0b0f19] border-b border-white/10 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between py-4 px-6 md:px-12">
        <div className="flex-shrink-0 font-bold text-xl tracking-widest text-white">{logo}</div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          {links}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">{actions}</div>

          <button
            className="md:hidden text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0b0f19] border-t border-white/10 px-6 py-4 flex flex-col gap-6 absolute w-full shadow-2xl">
          <nav className="flex flex-col gap-4 text-base font-medium text-gray-300">{links}</nav>
          <div className="flex flex-col gap-4 pb-4">{actions}</div>
        </div>
      )}
    </header>
  );
};