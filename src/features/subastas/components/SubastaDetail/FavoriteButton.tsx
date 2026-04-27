import React, { useState, useEffect } from 'react';
import {
  fetchFavoritos,
  addFavorito,
  removeFavorito,
} from '../../../favoritos/services/favoritosService';
import { authService } from '../../../auth/services/authService';

interface FavoriteButtonProps {
  subastaId: string; // ID público tipo 'BOE-B-2026-112'
  className?: string; // para estilos adicionales
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ subastaId, className = '' }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  // Al montar, comprobar si esta subasta está en favoritos
  useEffect(() => {
    const checkStatus = async () => {
      if (!subastaId) return;
      try {
        const favoritosIds = await fetchFavoritos(); // devuelve array de IDs públicos (strings)
        setIsFavorite(favoritosIds.includes(subastaId));
      } catch (err) {
        console.error('Error al verificar favoritos:', err);
        setIsFavorite(false);
      }
    };
    checkStatus();
  }, [subastaId]);

  const handleToggle = async () => {
    if (!authService.isAuthenticated()) {
      alert('Debes iniciar sesión para guardar favoritos.');
      // Opcional: redirigir a login
      return;
    }
    setLoading(true);
    try {
      if (isFavorite) {
        await removeFavorito(subastaId);
        setIsFavorite(false);
      } else {
        await addFavorito(subastaId);
        setIsFavorite(true);
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Error al actualizar favorito');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center justify-center p-2 rounded-full transition-all ${
        isFavorite
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill={isFavorite ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
    </button>
  );
};
