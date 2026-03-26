import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../../components/layout/Navbar';
import { Search, Filter, Map as MapIcon, List } from 'lucide-react';

interface DashboardNavbarProps {
  mobileView: 'map' | 'list';
  onToggleMobileView: () => void;
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ 
  mobileView, 
  onToggleMobileView 
}) => {
  const navigate = useNavigate();

  return (
    <Navbar
      logo={
        <div
          className="cursor-pointer select-none text-2xl font-bold tracking-widest"
          onClick={() => navigate('/Dashboard')}
        >
          <span className="text-yellow-400">B</span>
          <span className="text-white">-FINDER</span>
        </div>
      }
      links={
        <>
          <button
            onClick={() => navigate('/Dashboard')}
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

          {/* Opción de móvil en la hamburguesa */}
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
          <div className="relative w-full md:w-auto flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="¿Qué buscas?"
              className="pl-10 pr-4 py-2 w-full md:w-[320px] lg:w-[400px] xl:w-[500px] rounded-md bg-white text-black outline-none focus:ring-2 focus:ring-yellow-400 text-sm font-medium transition-all"
            />
          </div>

          <button className="flex bg-yellow-400 p-2 rounded-md hover:bg-yellow-500 transition-colors text-black flex-shrink-0 items-center justify-center">
            <Filter className="w-5 h-5" />
            <span className="md:hidden ml-2 font-semibold">Filtros</span>
          </button>

          <div className="hidden md:block w-px h-8 bg-white/10 mx-2"></div>
          <div className="md:hidden w-full h-px bg-white/10 my-2"></div>

          <button
            onClick={() => {
              console.log('Cerrar sesión');
              navigate('/');
            }}
            className="text-sm font-semibold text-gray-300 hover:text-red-400 transition-colors border border-white/20 hover:border-red-400 px-4 py-2 md:py-1.5 rounded-lg flex-shrink-0 text-center"
          >
            Cerrar Sesión
          </button>
        </>
      }
    />
  );
};