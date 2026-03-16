import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../../components/layout/Navbar';
import { Search, Filter } from 'lucide-react';

import { SubastaMap } from '../components/SubastaMap';
import L from 'leaflet';
import { filtrarSubastasPorBounds } from '../../subastas/services/subastasFiltroService';
import { SplitView } from '../../../components/layout/SplitView';
import { SubastaList } from '../../subastas/components/SubastaList';
import { fetchSubastas } from '../../subastas/services/subastasService';
import type { Subasta } from '../../subastas/components/subastasMocks';

export const DashBoard: React.FC = () => {
  const navigate = useNavigate();

  const [subastas, setSubastas] = useState<Subasta[]>([]);
  const [subastasVisibles, setSubastasVisibles] = useState<Subasta[]>([]);
  useEffect(() => {
    fetchSubastas().then(setSubastas);
  }, []);

  // Handler para actualizar subastas visibles según bounds
  const handleBoundsChange = (bounds: L.LatLngBounds) => {
    setSubastasVisibles(filtrarSubastasPorBounds(subastas, bounds));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-white font-sans overflow-hidden">
      {/* NAVBAR */}
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
          </>
        }
        actions={
          <>
            {/* Buscador */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="¿Qué buscas?"
                className="pl-10 pr-4 py-2 w-[320px] lg:w-[400px] xl:w-[500px] rounded-md bg-white text-black outline-none focus:ring-2 focus:ring-yellow-400 text-sm font-medium transition-all"
              />
            </div>

            {/* Botón de Filtro */}
            <button className="hidden md:flex bg-yellow-400 p-2 rounded-md hover:bg-yellow-500 transition-colors text-black flex-shrink-0 items-center justify-center">
              <Filter className="w-5 h-5" />
            </button>

            <div className="hidden md:block w-px h-8 bg-white/10 mx-2"></div>

            {/* Botón de Logout */}
            <button
              onClick={() => {
                console.log('Cerrar sesión');
                navigate('/');
              }}
              className="text-sm font-semibold text-gray-300 hover:text-red-400 transition-colors border border-white/20 hover:border-red-400 px-4 py-1.5 rounded-lg flex-shrink-0"
            >
              Cerrar Sesión
            </button>
          </>
        }
      />

      {/* ÁREA PRINCIPAL*/}
      <main className="flex-1 w-full overflow-hidden">
        <SplitView
          left={
            <div className="h-full flex flex-col p-4 md:p-6">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h1 className="text-2xl font-bold">Subastas Activas</h1>
                  <p className="text-gray-400 text-sm mt-1">
                    Encuentra oportunidades filtradas por IA
                  </p>
                </div>
                <span className="text-xs font-semibold bg-white/10 px-2 py-1 rounded text-yellow-400">
                  3 Resultados
                </span>
              </div>
              <SubastaList subastas={subastasVisibles} />
            </div>
          }
          right={
            <div className="w-full h-[50vh] md:h-full bg-[#0b0f19] relative">
              <SubastaMap onBoundsChange={handleBoundsChange} />
            </div>
          }
        />
      </main>
    </div>
  );
};

export default DashBoard;
