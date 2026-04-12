import type { Subasta } from '../../../models/Subasta';

export interface BackendSubastaDetail {
  id: string;
  titulo: string;
  titulo_resumido?: string | null;
  resumen?: string | null;
  texto: string;
  urlPdf: string;
  precio_salida?: number | null;
  valor_tasacion?: number | null;
  direccion?: string | null;
  referencia_catastral?: string | null;
  lat?: number;
  lng?: number;
  type?: string;
  viabilidad?: string;
  imagen?: string;
  urlOriginal?: string;
  riesgo_legal?: string | null;
  ocupantes?: string | null;
  cargas_previas?: string | null;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const mapBackendToFrontend = (item: BackendSubastaDetail): Subasta => ({
  id: item.id,
  titulo: item.titulo_resumido || item.titulo,
  titulo_resumido: item.titulo_resumido || null,
  precio: item.precio_salida ?? null,
  descripcion: (item.resumen || item.texto) ?? '',
  urlPdf: item.urlPdf.startsWith('http') ? item.urlPdf : `https://www.boe.es${item.urlPdf}`,
  lat: item.lat ?? 40.4168 + (Math.random() - 0.5) * 5,
  lng: item.lng ?? -3.7038 + (Math.random() - 0.5) * 5,
  type: item.type ?? 'house',
  viabilidad: item.viabilidad ?? 'green',
  precioActual: item.precio_salida ?? 0,
  valorSubasta: item.valor_tasacion ?? 0,
  direccion: item.direccion,
  referenciaCatastral: item.referencia_catastral,
  precioSalida: item.precio_salida,
  valorTasacion: item.valor_tasacion,
  imagen: item.imagen ?? 'https://via.placeholder.com/300x200?text=Sin+Imagen',
  urlOriginal: item.urlOriginal ?? '',
  textoBruto: item.texto,
  riesgo_legal: item.riesgo_legal ?? null,
  ocupantes: item.ocupantes ?? null,
  cargas_previas: item.cargas_previas ?? null
});

export async function fetchSubastas(): Promise<Subasta[]> {
  try {
    const response = await fetch(`${baseUrl}/subastas`);
    if (!response.ok) throw new Error('Error en la red');
    const result = await response.json();
    
    return result.data.map(mapBackendToFrontend);
  } catch (error) {
    console.error('Error al obtener subastas reales:', error);
    return [];
  }
}

export async function fetchSubastaById(id: string): Promise<Subasta | null> {
  const response = await fetch(`${baseUrl}/subastas/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Error al recuperar la subasta (${response.status})`);
  
  const result = await response.json();
  return mapBackendToFrontend(result.data);
}