/**
 * @fileoverview Servicio para la gestión de favoritos en el backend.
 * Proporciona métodos para listar, añadir y eliminar subastas favoritas del perfil.
 */

import { authService } from '../../auth/services/authService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

interface SubastaFavoritaId {
  id: string;
}

/**
 * Genera los headers de autenticación necesarios para las peticiones privadas.
 * @returns {Record<string, string>} Objeto con Content-Type y Authorization.
 */
export const getAuthHeaders = (): Record<string, string> => {
  const token = authService.getAccessToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Recupera la lista de IDs de las subastas favoritas del usuario actual.
 * @returns {Promise<string[]>} Array de IDs de subastas favoritas.
 */
export async function fetchFavoritos(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/favoritos`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      if (response.status === 401) {
        authService.logout();
        throw new Error('Tu sesión ha expirado. Inicia sesión nuevamente.');
      }
      throw new Error('Error al obtener favoritos');
    }

    const result = await response.json();
    const favoritos = result.data?.favoritos || [];
    return favoritos.map((fav: SubastaFavoritaId) => fav.id);
  } catch (error) {
    console.error('Error en fetchFavoritos:', error);
    return [];
  }
}

/**
 * Añade una subasta a la lista de favoritos del usuario.
 * @param {string} subastaId - ID de la subasta a añadir.
 * @throws {Error} Si el usuario no está autorizado o falla la red.
 */
export async function addFavorito(subastaId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/favoritos/${subastaId}`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    if (response.status === 401) {
      authService.logout();
      throw new Error('Sesión expirada. Vuelve a iniciar sesión.');
    }
    throw new Error('No se pudo añadir a favoritos');
  }
}

/**
 * Elimina una subasta de la lista de favoritos del usuario.
 * @param {string} subastaId - ID de la subasta a eliminar.
 * @throws {Error} Si el usuario no está autorizado o falla la red.
 */
export async function removeFavorito(subastaId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/favoritos/${subastaId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    if (response.status === 401) {
      authService.logout();
      throw new Error('Sesión expirada. Vuelve a iniciar sesión.');
    }
    throw new Error('No se pudo eliminar de favoritos');
  }
}