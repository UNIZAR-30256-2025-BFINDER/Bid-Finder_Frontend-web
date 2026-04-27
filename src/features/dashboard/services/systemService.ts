import { authService } from '../../auth/services/authService';

export interface SystemStatus {
  estado_backend: string;
  timestamp_actual: string;
  ingresadasHoy: number;
  ultimaIngesta: string | null;
}

const API_URL = import.meta.env.VITE_API_BASE_URL 
  ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') 
  : 'http://localhost:3000';

export const getSystemStatus = async (): Promise<SystemStatus> => {
  const token = authService.getAccessToken();

  const response = await fetch(`${API_URL}/admin/status`, {
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