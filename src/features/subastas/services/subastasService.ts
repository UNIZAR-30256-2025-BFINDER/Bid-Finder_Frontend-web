import { Subasta, SUBASTAS_MOCKS } from '../components/subastasMocks';

// Tipo específico para el detalle que devuelve el backend
export interface BackendSubastaDetail {
  id: number;
  titulo: string;
  precio: number | null;
  descripcion: string;
  urlOriginal: string;
}

// Simula una llamada a la API para obtener subastas (se mantiene mock para el mapa/listado)
export async function fetchSubastas(): Promise<Subasta[]> {
  await new Promise((res) => setTimeout(res, 300));
  return SUBASTAS_MOCKS;
}

// Obtiene una subasta real desde el backend por ID
export async function fetchSubastaById(id: string): Promise<BackendSubastaDetail | null> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  console.log('BASE URL:', baseUrl);

  const response = await fetch(`${baseUrl}/subastas/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Error al recuperar la subasta (${response.status})`);
  }

  const result = await response.json();

  console.log('Detalle recuperado del backend:', result);

  return result.data as BackendSubastaDetail;
}