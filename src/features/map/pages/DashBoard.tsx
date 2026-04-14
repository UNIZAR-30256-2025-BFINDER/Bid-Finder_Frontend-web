import React, { useEffect, useState } from 'react';
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

export const DashBoard: React.FC = () => {
  const [subastas, setSubastas] = useState<Subasta[]>([]);
  const [subastasVisibles, setSubastasVisibles] = useState<Subasta[]>([]);
  const [mobileView, setMobileView] = useState<'map' | 'list'>('map');
  const isMobile = useIsMobile();
  
  const [filtros, setFiltros] = useState<FiltrosState>({ provincia: '', categoria: '' });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    fetchSubastas(filtros).then((data) => {
      setSubastas(data);
      setSubastasVisibles(data);
    });
  }, [filtros]); 

  const handleBoundsChange = (bounds: L.LatLngBounds) => {
    if (subastas.length === 0) return;
    setSubastasVisibles(filtrarSubastasPorBounds(subastas, bounds));
  };

  const toggleMobileView = () => {
    setMobileView(prev => prev === 'map' ? 'list' : 'map');
  };

  const sidebarContent = (
    <div className="h-full flex flex-col p-4 md:p-6 bg-[#0b0f19]">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-2xl font-bold">Subastas Activas</h1>
          <p className="text-gray-400 text-sm mt-1">
            Encuentra oportunidades filtradas por IA
          </p>
        </div>
        <span className="text-xs font-semibold bg-white/10 px-2 py-1 rounded text-yellow-400 shrink-0">
          {subastasVisibles.length} Res.
        </span>
      </div>
      
      <SubastaList subastas={subastasVisibles} />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-white font-sans overflow-hidden">
      <DashboardNavbar 
        mobileView={mobileView}
        onToggleMobileView={toggleMobileView} 
        filtros={filtros}
        onFiltrosChange={setFiltros}
        isFiltersOpen={isFiltersOpen}
        onToggleFilters={() => setIsFiltersOpen(!isFiltersOpen)}
      />

      <main className="flex-1 w-full overflow-hidden relative">
        {isMobile ? (
          <>
            {mobileView === 'map' ? (
              <div className="w-full h-full bg-[#0b0f19] relative z-0">
                <SubastaMap subastas={subastasVisibles} onBoundsChange={handleBoundsChange} />
              </div>
            ) : (
              sidebarContent
            )}
            {mobileView === 'map' ? (
              <MobileViewToggle 
                currentView={mobileView} 
                onToggle={toggleMobileView} 
                className="right-6 left-auto bottom-20 absolute md:hidden"
              />
            ) : (
              <div className="flex justify-end w-full mt-4 mb-2">
                <MobileViewToggle 
                  currentView={mobileView} 
                  onToggle={toggleMobileView} 
                  className="static md:hidden"
                />
              </div>
            )}
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