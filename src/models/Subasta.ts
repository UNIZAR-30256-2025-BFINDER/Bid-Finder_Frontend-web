
export interface Subasta {
  id: string;
  titulo: string;
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
}
