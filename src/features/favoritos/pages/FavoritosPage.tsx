import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../auth/services/authService';
import { DashboardNavbar } from '../../map/layout/DashboardNavbar';
import { SplitView } from '../../../components/layout/SplitView';
import { SubastaMap } from '../../map/components/SubastaMap';
import { MobileViewToggle } from '../../map/components/MobileViewToggle';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { removeFavorito } from '../services/favoritosService';
import type { Subasta } from '../../../models/Subasta';
import { FavoritosList } from '../components/FavoritosList';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const FavoritosPage: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [mobileView, setMobileView] = useState<'map' | 'list'>('map');
  const [favoritos, setFavoritos] = useState<Subasta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

  const isAuthenticated = authService.isAuthenticated();
  const token = authService.getAccessToken();

  const cargarFavoritos = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/favoritos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        if (response.status === 401) {
          authService.logout();
          navigate('/login');
          return;
        }
        throw new Error('Error al cargar favoritos');
      }
      const result = await response.json();
      
      type RawFavorito = Subasta & {
        location?: {
          coordinates?: number[];
        };
        precio_salida?: number;
      };

      const lista: RawFavorito[] = result.data?.favoritos || [];
      const transformed = lista.map((item) => ({
        ...item,
        price: item.precioSalida ?? item.precioActual ?? 0,
        precioActual: item.precioSalida ?? 0,
        precioSalida: item.precioSalida ?? 0,
        lat: item.location?.coordinates?.[1] ?? item.lat ?? null,
        lng: item.location?.coordinates?.[0] ?? item.lng ?? null,
        hasLocation: !!(item.location?.coordinates || item.lat),
        imagen: item.imagen || 'https://via.placeholder.com/300x200?text=Sin+Imagen',
        direccion: item.direccion || '',
      }));

      setFavoritos(transformed as Subasta[]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'No se pudieron cargar tus favoritos');
      } else {
        setError('Error desconocido al cargar favoritos');
      }
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  const handleRemove = async (subastaId: string) => {
    if (!token) return;
    setRemovingIds((prev) => new Set(prev).add(subastaId));
    try {
      await removeFavorito(subastaId);
      setFavoritos((prev) => prev.filter((s) => s.id !== subastaId));
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`No se pudo eliminar: ${err.message}`);
      }
    } finally {
      setRemovingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(subastaId);
        return newSet;
      });
    }
  };

  const toggleMobileView = () => {
    setMobileView((prev) => (prev === 'map' ? 'list' : 'map'));
  };

  const handleBoundsChange = () => {
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    cargarFavoritos();
  }, [isAuthenticated, navigate, cargarFavoritos]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
        <p>Cargando tus favoritos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex flex-col items-center justify-center">
        <p className="text-red-400">{error}</p>
        <button
          onClick={cargarFavoritos}
          className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  const sidebarContent = (
    <div className="h-full flex flex-col p-4 md:p-6 bg-[#0b0f19] overflow-y-auto">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-2xl font-bold">Mis Favoritos</h1>
          <p className="text-gray-400 text-sm mt-1">Subastas que has guardado</p>
        </div>
        <span className="text-xs font-semibold bg-white/10 px-2 py-1 rounded text-yellow-400 shrink-0">
          {favoritos.length} {favoritos.length === 1 ? 'subasta' : 'subastas'}
        </span>
      </div>

      {favoritos.length === 0 ? (
        <div className="bg-white/5 rounded-xl p-8 text-center mt-8">
          <p className="text-gray-300">No tienes subastas favoritas aún.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-5 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
          >
            Explorar subastas
          </button>
        </div>
      ) : (
        <FavoritosList subastas={favoritos} onRemove={handleRemove} removingIds={removingIds} />
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-white font-sans overflow-hidden">
      <DashboardNavbar
        mobileView={mobileView}
        onToggleMobileView={toggleMobileView}
        showSearchAndFilters={false}
      />

      <main className="flex-1 w-full overflow-hidden relative">
        {isMobile ? (
          <>
            {mobileView === 'map' ? (
              <div className="w-full h-full bg-[#0b0f19] relative z-0">
                <SubastaMap subastas={favoritos} onBoundsChange={handleBoundsChange} />
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
              <div className="flex justify-end w-full mt-4 mb-2 pr-4">
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
                <SubastaMap subastas={favoritos} onBoundsChange={handleBoundsChange} />
              </div>
            }
          />
        )}
      </main>
    </div>
  );
};

export default FavoritosPage;