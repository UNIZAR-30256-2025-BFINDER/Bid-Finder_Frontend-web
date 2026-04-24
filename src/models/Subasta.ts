export interface Subasta {
  id: string;
  titulo: string;
  titulo_resumido?: string | null;
  precio: number | null;
  descripcion: string;
  urlPdf?: string;
  lat: number;
  lng: number;
  type: string;
  viabilidad: string;
  precioActual: number;
  valorSubasta: number;
  imagen: string;
  urlOriginal?: string;
  direccion?: string | null;
  referenciaCatastral?: string | null;
  precioSalida?: number | null;
  valorTasacion?: number | null;
  nivel_oportunidad?: 'ALTO' | 'MEDIO' | 'BAJO' | null;
  diferencia_porcentual_oportunidad?: number | null;
  textoBruto?: string;
  riesgo_legal?: string | null;
  ocupantes?: string | null;
  cargas_previas?: string | null;
  hasLocation?: boolean;
}