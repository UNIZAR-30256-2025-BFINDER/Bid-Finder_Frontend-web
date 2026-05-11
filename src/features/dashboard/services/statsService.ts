/**
 * @fileoverview Servicio encargado de solicitar las estadísticas agregadas
 * (categorías y zonas) para renderizar las gráficas del panel de administración.
 */

import { authService } from '../../auth/services/authService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export interface StatsCategoria {
    categoria: string;
    total: number;
}

export interface StatsProvincia {
    provincia: string;
    total: number;
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
}

/**
 * Recupera el token de acceso actual y lo formatea para los headers de la petición.
 * @returns {Record<string, string>} Header de autorización.
 */
const getAuthHeaders = (): Record<string, string> => {
    const token = authService.getAccessToken();

    return {
        Authorization: `Bearer ${token}`,
    };
};

/**
 * Obtiene el volumen total de subastas agrupadas por categoría.
 * @returns {Promise<StatsCategoria[]>} Lista de categorías con su respectivo total.
 * @throws {Error} Si la llamada a la API falla o devuelve un error autorizado.
 */
export const getStatsCategorias = async (): Promise<StatsCategoria[]> => {
    const response = await fetch(`${API_BASE_URL}/estadisticas/categorias`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
            errorData?.error?.message ||
            errorData?.message ||
            'Error al obtener estadísticas por categoría',
        );
    }

    const result: ApiResponse<StatsCategoria[]> = await response.json();
    return result.data;
};

/**
 * Obtiene el volumen total de subastas agrupadas por zona geográfica.
 * @returns {Promise<StatsProvincia[]>} Lista de zonas con su respectivo total.
 * @throws {Error} Si la llamada a la API falla o devuelve un error autorizado.
 */
export const getStatsProvincias = async (): Promise<StatsProvincia[]> => {
    const response = await fetch(`${API_BASE_URL}/estadisticas/provincias`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
            errorData?.error?.message ||
            errorData?.message ||
            'Error al obtener estadísticas por provincia',
        );
    }

    const result: ApiResponse<StatsProvincia[]> = await response.json();
    return result.data;
};