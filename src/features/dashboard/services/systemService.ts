/**
 * @fileoverview Servicio encargado de consultar las métricas de estado general 
 * del servidor (salud del backend, ingestas, etc.).
 */

import { authService } from '../../auth/services/authService';

export interface SystemStatus {
  estado_backend: string;
  timestamp_actual: string;
  ingresadasHoy: number;
  ultimaIngesta: string | null;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

/**
 * Obtiene las métricas en tiempo real del sistema de administración.
 * Requiere un token JWT válido.
 * @returns {Promise<SystemStatus>} Objeto con las métricas de estado y carga.
 * @throws {Error} Si la API rechaza la solicitud o no hay conectividad.
 */
export const getSystemStatus = async (): Promise<SystemStatus> => {
  const token = authService.getAccessToken();

  const response = await fetch(`${API_BASE_URL}/admin/status`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Error al obtener el estado del sistema');
  }

  const result = await response.json();
  return result.data;
};