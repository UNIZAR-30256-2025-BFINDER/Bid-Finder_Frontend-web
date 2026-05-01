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

const getAuthHeaders = () => {
    const token = authService.getAccessToken();

    return {
        Authorization: `Bearer ${token}`,
    };
};

export const getStatsCategorias = async (): Promise<StatsCategoria[]> => {
    const response = await fetch(`${API_BASE_URL}/stats/categorias`, {
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

export const getStatsProvincias = async (): Promise<StatsProvincia[]> => {
    const response = await fetch(`${API_BASE_URL}/stats/provincias`, {
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