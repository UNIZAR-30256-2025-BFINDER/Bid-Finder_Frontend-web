/**
 * @fileoverview Página de Favoritos del usuario.
 * Integra la lógica de carga de la API, sincronización con el mapa y visualización de lista.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../auth/services/authService';
import { DashboardNavbar } from '../../map/layout/DashboardNavbar';
import { SplitView } from '../../../components/layout/SplitView';
import { SubastaMap } from '../../map/components/SubastaMap';
import { MobileViewToggle } from '../../map/components/MobileViewToggle';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { removeFavorito, fetchFavoritosPopulated } from '../services/favoritosService';
import type { Subasta } from '../../../models/Subasta';
import { FavoritosList } from '../components/FavoritosList';
import toast from 'react-hot-toast';

export const FavoritosPage: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [mobileView, setMobileView] = useState<'map' | 'list'>('map');
  const [favoritos, setFavoritos] = useState<Subasta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

  const isAuthenticated = authService.isAuthenticated();
  const token = authService.getAccessToken();

  /**
   * Efectúa la llamada a la API para obtener los favoritos y transforma
   * los datos al modelo de subasta del frontend.
   */
  const cargarFavoritos = useCallback(async () => {
    if (!token) {
      return;
    }
    setError(null);
    try {
      const data = await fetchFavoritosPopulated();
      setFavoritos(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('sesión') || err.message.includes('expirado') || err.message.includes('expired')) {
          navigate('/login');
          return;
        }
        setError(err.message || 'No se pudieron cargar tus favoritos');
      } else {
        setError('Error desconocido al cargar favoritos');
      }
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  /**
   * Gestiona la eliminación de una subasta de favoritos tanto en el backend como en el estado local.
   * @param {string} subastaId - ID único de la subasta.
   */
  const handleRemove = async (subastaId: string) => {
    if (!token) return;
    setRemovingIds((prev) => new Set(prev).add(subastaId));
    try {
      await removeFavorito(subastaId);
      setFavoritos((prev) => prev.filter((s) => s.id !== subastaId));
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`No se pudo eliminar: ${err.message}`);
      }
    } finally {
      setRemovingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(subastaId);
        return newSet;
      });
    }
  };

  /** Cambia entre vista de mapa y vista de lista en dispositivos móviles. */
  const toggleMobileView = () => {
    setMobileView((prev) => (prev === 'map' ? 'list' : 'map'));
  };

  const handleBoundsChange = () => {};

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    cargarFavoritos();
  }, [isAuthenticated, navigate, cargarFavoritos]);

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

      {loading ? (
        <div className="flex-1 flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
      ) : error ? (
        <div className="bg-white/5 rounded-xl p-8 text-center mt-8 border border-red-500/20">
          <p className="text-red-400">{error}</p>
          <button
            onClick={cargarFavoritos}
            className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-sm font-semibold transition"
          >
            Reintentar
          </button>
        </div>
      ) : favoritos.length === 0 ? (
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
    <div className="h-[100dvh] flex flex-col bg-[#0b0f19] text-white font-sans overflow-hidden">
      <DashboardNavbar showSearchAndFilters={false} />

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
