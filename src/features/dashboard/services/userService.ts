/**
 * @fileoverview Servicio de llamadas a la API para la gestión global de moderación.
 * Permite a los administradores listar y eliminar comentarios de toda la plataforma.
 */

import { authService } from '../../auth/services/authService';
import type { Usuario } from '../../../models/Usuario';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

const getAuthHeaders = (): Record<string, string> => {
  const token = authService.getAccessToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export interface PaginatedUsers {
  usuarios: Usuario[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
  metrics: {
    globalTotal: number;
    globalAdmins: number;
    filteredTotal: number;
    filteredAdmins: number;
  };
}

/**
 * Obtiene todos los usuarios de la plataforma ordenados por los más recientes.
 * Exclusivo para administradores.
 * @returns {Promise<PaginatedUsers>} Array global de usuarios y metadatos de paginación.
 */
export const fetchAllUsers = async (
  page: number = 1,
  limit: number = 10,
  search: string = '',
): Promise<PaginatedUsers> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
  });
  const response = await fetch(`${API_BASE_URL}/admin/usuarios?${params}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Error al cargar los usuarios');
  const result = await response.json();
  return {
    usuarios: result.data,
    pagination: result.pagination,
    metrics: result.metrics,
  };
};
