// src/services/favoritosService.ts
import { authService } from '../../auth/services/authService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

/**
 * Construye los headers necesarios para las peticiones autenticadas.
 */
const getAuthHeaders = (): HeadersInit => {
  const token = authService.getAccessToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Obtiene la lista de ObjectIds de las subastas favoritas del usuario actual.
 * @returns {Promise<string[]>} Array de _id (MongoDB)
 */
export async function fetchFavoritos(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/favoritos`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      if (response.status === 401) {
        authService.logout(); // Limpiar sesión
        throw new Error('Tu sesión ha expirado. Inicia sesión nuevamente.');
      }
      throw new Error('Error al obtener favoritos');
    }

    const result = await response.json();
    // Suponiendo que la respuesta tiene la estructura: { data: { favoritos: [...] } }
    const favoritos = result.data?.favoritos || [];
    return favoritos.map((fav: any) => fav.id);
  } catch (error) {
    console.error('Error en fetchFavoritos:', error);
    return [];
  }
}

/**
 * Añade una subasta a favoritos.
 * @param subastaId ObjectId de MongoDB de la subasta
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
 * Elimina una subasta de favoritos.
 * @param subastaId ObjectId de MongoDB de la subasta
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
