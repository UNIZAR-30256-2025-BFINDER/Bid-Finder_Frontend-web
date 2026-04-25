import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../../components/layout/Navbar';
import { Search, Filter, Map as MapIcon, List, X } from 'lucide-react';
import { SubastasFilters, FiltrosState } from '../components/subastas/SubastasFilters';
import { authService } from '../../auth/services/authService';

interface DashboardNavbarProps {
  mobileView: 'map' | 'list';
  onToggleMobileView: () => void;
  filtros?: FiltrosState;
  onFiltrosChange?: (filtros: FiltrosState) => void;
  isFiltersOpen?: boolean;
  onToggleFilters?: () => void;
  showSearchAndFilters?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  mobileView,
  onToggleMobileView,
  filtros = { provincia: '', categoria: '', nivel_oportunidad: '' },
  onFiltrosChange,
  isFiltersOpen = false,
  onToggleFilters,
  showSearchAndFilters = true,
  searchQuery = '',
  onSearchChange,
}) => {
  const navigate = useNavigate();
  const filtersRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  useEffect(() => {
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFiltersOpen, onToggleFilters]);

  return (
    <div className="relative">
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
            <button
              onClick={() => navigate('/dashboard')}
              className="text-yellow-400 font-semibold hover:scale-105 transition-all px-2 lg:px-3 text-base"
            >
              Explorar
            </button>
            <button
              onClick={() => navigate('/favorites')}
              className="text-gray-300 hover:text-white hover:scale-105 transition-all px-2 lg:px-3 text-base"
            >
              Favoritos
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="text-gray-300 hover:text-white hover:scale-105 transition-all px-2 lg:px-3 text-base"
            >
              Perfil
            </button>

            <div className="md:hidden w-full h-px bg-white/10 my-2"></div>
            <button
              onClick={onToggleMobileView}
              className="md:hidden flex items-center gap-2 text-yellow-400 font-semibold text-base px-2"
            >
              {mobileView === 'map' ? <List size={20} /> : <MapIcon size={20} />}
              Ver {mobileView === 'map' ? 'Lista de Subastas' : 'Mapa'}
            </button>
          </>
        }
        actions={
          <>
            {showSearchAndFilters && (
              <>
                <div className="relative w-full md:w-auto flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Busca subastas por dirección, referencia, zona o palabras clave..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full md:w-[320px] lg:w-[400px] xl:w-[500px] rounded-md bg-white text-black outline-none focus:ring-2 focus:ring-yellow-400 text-sm font-medium transition-all"
                  />
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onToggleFilters) onToggleFilters();
                  }}
                  className={`flex p-2 rounded-md transition-colors flex-shrink-0 items-center justify-center ${isFiltersOpen || filtros.provincia || filtros.categoria || filtros.precio_min || filtros.precio_max || filtros.nivel_oportunidad
                    ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                    : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                >
                  <Filter className="w-5 h-5" />
                  <span className="md:hidden ml-2 font-semibold">Filtros</span>
                </button>

                <div className="hidden md:block w-px h-8 bg-white/10 mx-2"></div>
              </>
            )}

            <div className="md:hidden w-full h-px bg-white/10 my-2"></div>

            {/* BOTÓN LOGOUT */}
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-gray-300 hover:text-red-400 transition-colors border border-white/20 hover:border-red-400 px-4 py-2 md:py-1.5 rounded-lg flex-shrink-0 text-center"
            >
              Cerrar Sesión
            </button>
          </>
        }
      />

      {showSearchAndFilters && isFiltersOpen && (
        <div
          ref={filtersRef}
          style={{ animation: 'slideDown 150ms ease-out' }}
          className="absolute right-4 md:right-32 top-[110%] w-80 bg-[#161b22] border border-white/10 shadow-2xl rounded-xl p-5 z-50"
        >
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-yellow-400" />
              Filtros de Búsqueda
            </h3>
            <button
              onClick={onToggleFilters}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <SubastasFilters
            filtros={filtros}
            onChange={(nuevosFiltros) => {
              if (onFiltrosChange) onFiltrosChange(nuevosFiltros);
            }}
          />

          {(filtros.provincia || filtros.categoria || filtros.precio_min || filtros.precio_max || filtros.nivel_oportunidad) && (
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => {
                  if (onFiltrosChange) onFiltrosChange({
                    provincia: '',
                    categoria: '',
                    precio_min: undefined,
                    precio_max: undefined,
                    nivel_oportunidad: ''
                  });
                  if (onSearchChange) onSearchChange('');
                }}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};