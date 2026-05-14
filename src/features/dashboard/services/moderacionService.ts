/**
 * @fileoverview Servicio de llamadas a la API para la gestión global de moderación.
 * Permite a los administradores listar y eliminar comentarios de toda la plataforma.
 */

import { authService } from '../../auth/services/authService';
import type { Comentario } from '../../../models/Comentario';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

const getAuthHeaders = (): Record<string, string> => {
  const token = authService.getAccessToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export interface PaginatedComentarios {
  comentarios: Comentario[];
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
  };
}

/**
 * Obtiene todos los comentarios de la plataforma ordenados por los más recientes.
 * Exclusivo para administradores.
 * @returns {Promise<PaginatedComentarios>} Array global de comentarios y metadatos de paginación.
 */
export const fetchAllComentarios = async (
  page: number = 1,
  limit: number = 10,
  search = '',
): Promise<PaginatedComentarios> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
  });
  const response = await fetch(`${API_BASE_URL}/admin/comentarios?${params}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Error al cargar la lista global de comentarios');
  }

  const result = await response.json();
  return {
    comentarios: result.data,
    pagination: result.pagination,
  };
};

/**
 * Elimina permanentemente un comentario.
 * @param {string} subastaId - ID de la subasta a la que pertenece el comentario.
 * @param {string} comentarioId - ID del comentario a borrar.
 */
export const deleteComentarioAdmin = async (
  subastaId: string,
  comentarioId: string,
): Promise<void> => {
  const response = await fetch(
    `${API_BASE_URL}/subastas/${subastaId}/comentarios/${comentarioId}`,
    {
      method: 'DELETE',
      headers: getAuthHeaders(),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Error al eliminar el comentario');
  }
};
