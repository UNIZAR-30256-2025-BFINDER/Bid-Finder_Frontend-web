import { authService } from '../../auth/services/authService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

interface SubastaFavoritaId {
  id: string;
}

export const getAuthHeaders = (): Record<string, string> => {
  const token = authService.getAccessToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

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