/**
 * @fileoverview Barra de navegación principal para usuarios autenticados.
 * Gestiona el buscador global, el despliegue de filtros y la navegación administrativa.
 */

import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from '../../../components/layout/Navbar';
import { Search, Filter, X } from 'lucide-react';
import { SubastasFilters, FiltrosState } from '../components/subastas/SubastasFilters';
import { authService } from '../../auth/services/authService';

interface DashboardNavbarProps {
  filtros?: FiltrosState;
  onFiltrosChange?: (filtros: FiltrosState) => void;
  isFiltersOpen?: boolean;
  onToggleFilters?: () => void;
  showSearchAndFilters?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

/**
 * Componente que extiende el Navbar base para añadir funcionalidades de búsqueda y filtros.
 * @param {DashboardNavbarProps} props - Configuración y callbacks de estado.
 */
export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  filtros = { provincia: '', categoria: '', nivel_oportunidad: '' },
  onFiltrosChange,
  isFiltersOpen = false,
  onToggleFilters,
  showSearchAndFilters = true,
  searchQuery = '',
  onSearchChange,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const filtersRef = useRef<HTMLDivElement>(null);

  const currentUser = authService.getCurrentUser();
  const isAdmin = currentUser?.rol === 'admin';

  /** Determina si una ruta está activa para resaltar el link en el menú */
  const isActive = (path: string) => location.pathname.startsWith(path);

  /** Cierra la sesión y redirige al usuario al login */
  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  useEffect(() => {
    /** Cierra el panel de filtros si el usuario clica fuera del contenedor */
    function handleClickOutside(event: MouseEvent) {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(event.target as Node) &&
        isFiltersOpen &&
        onToggleFilters
      ) {
        onToggleFilters();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFiltersOpen, onToggleFilters]);

  return (
    <div className="relative flex flex-col z-50">
      <Navbar
        logo={
          <div
            className="cursor-pointer select-none text-2xl font-bold tracking-widest"
            onClick={() => navigate('/dashboard')}
          >
            <span className="text-yellow-400">B</span>
            <span className="text-white">-FINDER</span>
          </div>
        }
        links={
          <>
            <button onClick={() => navigate('/dashboard')} className={`transition-all px-2 lg:px-3 text-base text-left ${isActive('/dashboard') ? 'text-yellow-400 font-semibold' : 'text-gray-300 hover:text-white'}`}>
              Explorar
            </button>
            <button onClick={() => navigate('/favorites')} className={`transition-all px-2 lg:px-3 text-base text-left ${isActive('/favorites') ? 'text-yellow-400 font-semibold' : 'text-gray-300 hover:text-white'}`}>
              Favoritos
            </button>
            {isAdmin && (
              <button onClick={() => navigate('/admin')} className={`transition-all px-2 lg:px-3 text-base text-left ${isActive('/admin') ? 'text-yellow-400 font-semibold' : 'text-gray-300 hover:text-white'}`}>
                Admin
              </button>
            )}
          </>
        }
        actions={
          <>
            {showSearchAndFilters && (
              <div className="hidden md:flex items-center gap-4">
                <div className="relative w-auto lg:w-[350px] xl:w-[450px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Busca subastas..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full rounded-md bg-white text-black text-sm transition-all"
                  />
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); if (onToggleFilters) onToggleFilters(); }}
                  className={`flex p-2 rounded-md transition-colors ${isFiltersOpen ? 'bg-yellow-400 text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-gray-300 border border-white/20 hover:border-red-400 hover:text-red-400 px-4 py-1.5 rounded-lg transition-colors"
            >
              Cerrar Sesión
            </button>
          </>
        }
      />

      {/* Menú de filtros desplegable */}
      {showSearchAndFilters && isFiltersOpen && (
        <div ref={filtersRef} className="absolute right-4 md:right-8 top-full mt-2 w-80 bg-[#161b22] border border-white/10 shadow-2xl rounded-xl p-5 z-50">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-yellow-400" />
              Filtros
            </h3>
            <button onClick={onToggleFilters} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
          </div>
          <SubastasFilters filtros={filtros} onChange={(n) => onFiltrosChange && onFiltrosChange(n)} />
        </div>
      )}
    </div>
  );
};