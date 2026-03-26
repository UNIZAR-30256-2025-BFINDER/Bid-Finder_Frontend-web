import type { Subasta } from '../components/subastasMocks';

export interface BackendSubastaDetail {
  id: string; 
  titulo: string;
  precio: number | null;
  texto: string;     
  urlPdf: string;
}

export async function fetchSubastas(): Promise<Subasta[]> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  
  try {
    const response = await fetch(`${baseUrl}/subastas`);
    if (!response.ok) throw new Error('Error en la red');
    
    const result = await response.json();
    
    return result.data.map((item: BackendSubastaDetail) => ({
      id: item.id,
      name: item.titulo, 
      lat: 40.4168 + (Math.random() - 0.5) * 5,
      lng: -3.7038 + (Math.random() - 0.5) * 5,
      type: 'house',       
      viabilidad: 'green', 
      precioActual: item.precio || 0,
      valorSubasta: 0,
      imagen: 'https://via.placeholder.com/300x200?text=Sin+Imagen'
    }));

  } catch (error) {
    console.error("Error al obtener subastas reales:", error);
    return [];
  }
}

export async function fetchSubastaById(id: string): Promise<BackendSubastaDetail | null> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  const response = await fetch(`${baseUrl}/subastas/${id}`);

  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Error al recuperar la subasta (${response.status})`);

  const result = await response.json();
  return result.data as BackendSubastaDetail;
}