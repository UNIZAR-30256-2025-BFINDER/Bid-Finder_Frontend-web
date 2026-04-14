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
  
  location?: {
    type: string;
    coordinates: number[];
  } | null;
  
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

export interface SubastaFilters {
  provincia?: string;
  categoria?: string;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const mapBackendToFrontend = (item: BackendSubastaDetail): Subasta => {
  const hasLocation = !!(item.location && item.location.coordinates && item.location.coordinates.length === 2);
  
  const lng = hasLocation ? item.location!.coordinates[0] : -3.7038;
  const lat = hasLocation ? item.location!.coordinates[1] : 40.4168;

  let inferredType = 'other';
  const textToAnalyze = (item.titulo_resumido || item.titulo || '').toLowerCase();
  
  if (textToAnalyze.includes('vivienda') || textToAnalyze.includes('piso') || textToAnalyze.includes('casa') || textToAnalyze.includes('chalet') || textToAnalyze.includes('local') || textToAnalyze.includes('finca') || textToAnalyze.includes('inmueble') || textToAnalyze.includes('urbana') || textToAnalyze.includes('rústica')) {
    inferredType = 'house';
  } else if (textToAnalyze.includes('vehículo') || textToAnalyze.includes('coche') || textToAnalyze.includes('furgoneta') || textToAnalyze.includes('moto')) {
    inferredType = 'car';
  }

  return {
    id: item.id,
    titulo: item.titulo_resumido || item.titulo,
    titulo_resumido: item.titulo_resumido || null,
    precio: item.precio_salida ?? null,
    descripcion: (item.resumen || item.texto) ?? '',
    urlPdf: item.urlPdf.startsWith('http') ? item.urlPdf : `https://www.boe.es${item.urlPdf}`,
    
    lat,
    lng,
    hasLocation,
    
    type: item.type ?? inferredType,
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
  };
};

export async function fetchSubastas(filtros?: SubastaFilters): Promise<Subasta[]> {
  try {
    const url = new URL(`${baseUrl}/subastas`);
    
    if (filtros?.provincia) url.searchParams.append('provincia', filtros.provincia);
    if (filtros?.categoria) url.searchParams.append('categoria', filtros.categoria);

    const response = await fetch(url.toString());
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