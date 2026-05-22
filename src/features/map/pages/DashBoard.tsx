/**
 * @fileoverview Página principal de la aplicación (Dashboard).
 * Orquesta la carga de subastas, el filtrado dinámico según la vista del mapa
 * y el cambio entre dispositivos móviles/desktop.
 */

import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const heroQuery = (location.state as { heroQuery?: string } | null)?.heroQuery ?? '';

  const mapRef = useRef<L.Map | null>(null);
  const pendingFlyRef = useRef<string>(heroQuery);

  const [subastas, setSubastas] = useState<Subasta[]>([]);
  const [subastasVisibles, setSubastasVisibles] = useState<Subasta[]>([]);
  const [mobileView, setMobileView] = useState<'map' | 'list'>('map');
  const [locationNotFound, setLocationNotFound] = useState(false);
  const isMobile = useIsMobile();
  const mapBoundsRef = useRef<L.LatLngBounds | null>(null);

  const [filtros, setFiltros] = useState<FiltrosState>({
    provincia: '',
    categoria: '',
    nivel_oportunidad: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const isAuthenticated = !!localStorage.getItem('token');

  const centrarMapaEnBusqueda = async (query: string) => {
    if (!query || !mapRef.current) return;
    setLocationNotFound(false);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}, España`,
      );
      const data = await res.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        mapRef.current.flyTo([parseFloat(lat), parseFloat(lon)], 11, {
          animate: true,
          duration: 1.5,
        });
      } else {
        setLocationNotFound(true);
        setTimeout(() => setLocationNotFound(false), 4000);
      }
    } catch (error) {
      console.error('Error geocodificando búsqueda', error);
    }
  };

  const handleMapReady = (map: L.Map) => {
    mapRef.current = map;
    if (pendingFlyRef.current) {
      centrarMapaEnBusqueda(pendingFlyRef.current);
      pendingFlyRef.current = '';
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      if (searchQuery) centrarMapaEnBusqueda(searchQuery);
    }, 800);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const params = { ...filtros, q: debouncedQuery || undefined };
    fetchSubastas(params).then((data) => {
      setSubastas(data);
      if (isMobile) {
        setSubastasVisibles(data);
      } else if (mapBoundsRef.current) {
        setSubastasVisibles(filtrarSubastasPorBounds(data, mapBoundsRef.current));
      } else {
        setSubastasVisibles(data);
      }
    });
  }, [filtros, debouncedQuery, isMobile]);

  const handleBoundsChange = (bounds: L.LatLngBounds) => {
    mapBoundsRef.current = bounds;
    if (!isMobile) {
      setSubastasVisibles(filtrarSubastasPorBounds(subastas, bounds));
    }
  };

  const toggleMobileView = () => {
    setMobileView((prev) => (prev === 'map' ? 'list' : 'map'));
  };

  const displaySubastas = isMobile ? subastas : subastasVisibles;

  const sidebarContent = (
    <div className="h-full flex flex-col p-4 md:p-6 bg-[#0b0f19] overflow-y-auto">
      {!isAuthenticated && (
        <div className="mb-6 p-4 rounded-xl border border-yellow-400/20 bg-yellow-400/10 text-center shrink-0">
          <p className="text-sm font-medium text-gray-200">
            Regístrate para guardar subastas y comentar
          </p>
          <Link
            to="/register"
            className="mt-3 inline-block w-full rounded-lg bg-yellow-400 py-2 text-xs font-bold text-black hover:bg-yellow-300 transition-colors"
          >
            Crear cuenta gratis
          </Link>
        </div>
      )}

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

  const mapContent = (
    <div className="w-full h-full bg-[#0b0f19] relative z-0">
      {locationNotFound && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1100] bg-red-500/90 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg pointer-events-none">
          No se encontró esa ubicación en España
        </div>
      )}
      <SubastaMap
        subastas={subastas}
        onBoundsChange={handleBoundsChange}
        onMapReady={handleMapReady}
      />
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
              {mobileView === 'map' ? mapContent : sidebarContent}
            </div>
            <MobileViewToggle
              currentView={mobileView}
              onToggle={toggleMobileView}
              className="fixed right-6 bottom-8 z-[1000] md:hidden shadow-2xl"
            />
          </>
        ) : (
          <SplitView left={sidebarContent} right={mapContent} />
        )}
      </main>
    </div>
  );
};

export default DashBoard;
