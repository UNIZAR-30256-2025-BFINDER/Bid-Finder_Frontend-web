export interface Subasta {
  id: string;
  titulo: string;
  titulo_resumido: string;
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
  riesgo_legal?: string;
  ocupantes?: string;
  cargas_previas?: string;
}
