import type { Subasta } from '../../../models/Subasta';

export interface BackendSubastaDetail {
  id: string;
  titulo: string;
  titulo_resumido: string;
  precio: number | null;
  texto: string;
  urlPdf: string;
  lat?: number;
  lng?: number;
  type?: string;
  viabilidad?: string;
  valorSubasta?: number;
  imagen?: string;
  urlOriginal?: string;
  riesgo_legal?: string;
  ocupantes?: string;
  cargas_previas?: string;
}

export async function fetchSubastas(): Promise<Subasta[]> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  try {
    const response = await fetch(`${baseUrl}/subastas`);
    if (!response.ok) throw new Error('Error en la red');
    const result = await response.json();
    return result.data.map((item: BackendSubastaDetail) => ({
      id: item.id,
      titulo: item.titulo,
      titulo_resumido: item.titulo_resumido,
      precio: item.precio ?? null,
      descripcion: item.texto ?? '',
      urlPdf: item.urlPdf,
      lat: item.lat ?? 40.4168 + (Math.random() - 0.5) * 5,
      lng: item.lng ?? -3.7038 + (Math.random() - 0.5) * 5,
      type: item.type ?? 'house',
      viabilidad: item.viabilidad ?? 'green',
      precioActual: item.precio ?? 0,
      valorSubasta: item.valorSubasta ?? 0,
      imagen: item.imagen ?? 'https://via.placeholder.com/300x200?text=Sin+Imagen',
      urlOriginal: item.urlOriginal ?? '',
      riesgo_legal: item.riesgo_legal ?? '',
      ocupantes: item.ocupantes ?? '',
      cargas_previas: item.cargas_previas ?? '',
    }));
  } catch (error) {
    console.error('Error al obtener subastas reales:', error);
    return [];
  }
}

export async function fetchSubastaById(id: string): Promise<Subasta | null> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/subastas/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Error al recuperar la subasta (${response.status})`);
  const result = await response.json();
  const item: BackendSubastaDetail = result.data;
  return {
    id: item.id,
    titulo: item.titulo,
    titulo_resumido: item.titulo_resumido,
    precio: item.precio ?? null,
    descripcion: item.texto ?? '',
    urlPdf: item.urlPdf,
    lat: item.lat ?? 40.4168 + (Math.random() - 0.5) * 5,
    lng: item.lng ?? -3.7038 + (Math.random() - 0.5) * 5,
    type: item.type ?? 'house',
    viabilidad: item.viabilidad ?? 'green',
    precioActual: item.precio ?? 0,
    valorSubasta: item.valorSubasta ?? 0,
    imagen: item.imagen ?? 'https://via.placeholder.com/300x200?text=Sin+Imagen',
    urlOriginal: item.urlOriginal ?? '',
    riesgo_legal: item.riesgo_legal ?? '',
    ocupantes: item.ocupantes ?? '',
    cargas_previas: item.cargas_previas ?? '',
  };
}
