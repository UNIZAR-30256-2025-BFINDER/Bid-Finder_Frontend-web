/**
 * @fileoverview Página principal de la aplicación (Dashboard).
 * Orquesta la carga de subastas, el filtrado dinámico según la vista del mapa
 * y el cambio entre dispositivos móviles/desktop.
 */

import React, { useEffect, useState, useRef } from 'react';
import { SubastaMap } from '../components/SubastaMap';
import L from 'leaflet';
import { filtrarSubastasPorBounds } from '../../subastas/services/subastasFiltroService';
import { SplitView } from '../../../components/layout/SplitView';
import { SubastaList } from '../components/subastas/SubastaList';
import { FiltrosState } from '../components/subastas/SubastasFilters';
import { fetchSubastas } from '../../subastas/services/subastasService';
import type { Subasta } from '../../../models/Subasta';
import { DashboardNavbar } from '../layout/DashboardNavbar';
import { MobileViewToggle } from '../components/MobileViewToggle';
import { useIsMobile } from '../../../hooks/useIsMobile';

/**
 * Componente principal que gestiona el estado global de la exploración de subastas.
 */
export const DashBoard: React.FC = () => {
  const [subastas, setSubastas] = useState<Subasta[]>([]);
  const [subastasVisibles, setSubastasVisibles] = useState<Subasta[]>([]);
  const [mobileView, setMobileView] = useState<'map' | 'list'>('map');
  const isMobile = useIsMobile();
  const mapBoundsRef = useRef<L.LatLngBounds | null>(null);

  const [filtros, setFiltros] = useState<FiltrosState>({ provincia: '', categoria: '', nivel_oportunidad: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  /** Efecto para manejar el debounce de la búsqueda global */
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  /** Carga inicial y reactiva de subastas filtradas desde la API */
  useEffect(() => {
    const params = { ...filtros, q: debouncedQuery || undefined };
    fetchSubastas(params).then((data) => {
      setSubastas(data);
      if (isMobile) {
        setSubastasVisibles(data);
      } else if (mapBoundsRef.current) {
        setSubastasVisibles(filtrarSubastasPorBounds(data, mapBoundsRef.current));
      }
    });
  }, [filtros, debouncedQuery, isMobile]);

  /**
   * Actualiza el listado lateral cuando el usuario mueve o hace zoom en el mapa.
   * @param {L.LatLngBounds} bounds - Límites geográficos visibles actualmente.
   */
  const handleBoundsChange = (bounds: L.LatLngBounds) => {
    mapBoundsRef.current = bounds;
    if (!isMobile) {
      setSubastasVisibles(filtrarSubastasPorBounds(subastas, bounds));
    }
  };

  /** Cambia entre vista de mapa y listado en resoluciones móviles */
  const toggleMobileView = () => {
    setMobileView((prev) => (prev === 'map' ? 'list' : 'map'));
  };

  const displaySubastas = isMobile ? subastas : subastasVisibles;

  const sidebarContent = (
    <div className="h-full flex flex-col p-4 md:p-6 bg-[#0b0f19] overflow-y-auto">
      <div className="flex justify-between items-end mb-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold">Subastas Activas</h1>
          <p className="text-gray-400 text-sm mt-1">Encuentra oportunidades filtradas por IA</p>
        </div>
        <span className="text-xs font-semibold bg-white/10 px-2 py-1 rounded text-yellow-400">
          {displaySubastas.length} Res.
        </span>
      </div>
      <SubastaList subastas={displaySubastas} />
    </div>
  );

  return (
    <div className="h-[100dvh] flex flex-col bg-[#0b0f19] text-white font-sans overflow-hidden">
      <DashboardNavbar
        filtros={filtros}
        onFiltrosChange={setFiltros}
        isFiltersOpen={isFiltersOpen}
        onToggleFilters={() => setIsFiltersOpen(!isFiltersOpen)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1 w-full overflow-hidden relative">
        {isMobile ? (
          <>
            <div className="w-full h-full relative overflow-hidden">
              {mobileView === 'map' ? (
                <div className="w-full h-full bg-[#0b0f19] relative z-0">
                  <SubastaMap subastas={subastas} onBoundsChange={handleBoundsChange} />
                </div>
              ) : (
                sidebarContent
              )}
            </div>
            <MobileViewToggle
              currentView={mobileView}
              onToggle={toggleMobileView}
              className="fixed right-6 bottom-8 z-[1000] md:hidden shadow-2xl"
            />
          </>
        ) : (
          <SplitView
            left={sidebarContent}
            right={
              <div className="w-full h-full bg-[#0b0f19] relative z-0">
                <SubastaMap subastas={subastas} onBoundsChange={handleBoundsChange} />
              </div>
            }
          />
        )}
      </main>
    </div>
  );
};

export default DashBoard;