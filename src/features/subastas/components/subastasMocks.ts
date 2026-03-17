export type SubastaType = 'car' | 'house' | 'art' | 'boat';
export type Viabilidad = 'green' | 'yellow' | 'red';

export interface Subasta {
  id: string;
  name: string;
  type: SubastaType;
  lat: number;
  lng: number;
  viabilidad: Viabilidad;

  precioActual: number;
  valorSubasta: number;
  imagen?: string;
}

export const SUBASTAS_MOCKS: Subasta[] = [
  {
    id: '1',
    name: 'BMW Serie 3 Embargado',
    type: 'car',
    lat: 40.416775,
    lng: -3.70379,
    viabilidad: 'green',
    precioActual: 12500,
    valorSubasta: 25000,
    imagen:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: '2',
    name: 'Piso céntrico en Madrid (80m2)',
    type: 'house',
    lat: 40.418775,
    lng: -3.70579,
    viabilidad: 'yellow',
    precioActual: 85000,
    valorSubasta: 140000,
    imagen:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: '3',
    name: 'Cuadro Abstracto S.XIX',
    type: 'art', // Corregido de 'car' a 'art'
    lat: 40.414775,
    lng: -3.70179,
    viabilidad: 'red',
    precioActual: 1200,
    valorSubasta: 5000,
    imagen:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: '4',
    name: 'Local Comercial Embargado',
    type: 'house',
    lat: 40.419775,
    lng: -3.70079,
    viabilidad: 'green',
    precioActual: 45000,
    valorSubasta: 90000,
    imagen:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=300',
  },

  {
    id: '5',
    name: 'Local Beraton Embargado',
    type: 'house',
    lat: 41.6833,
    lng: -1.8867,
    viabilidad: 'green',
    precioActual: 45000,
    valorSubasta: 90000,
    imagen:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: '6',
    name: 'Local Beraton Embrujado',
    type: 'house',
    lat: 41.6893,
    lng: -1.8867,
    viabilidad: 'green',
    precioActual: 45000,
    valorSubasta: 90000,
    imagen:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=300',
  },

  {
    id: '7',
    name: 'Bar Beraton Embrujado',
    type: 'car',
    lat: 41.9893,
    lng: -1.8877,
    viabilidad: 'red',
    precioActual: 45000,
    valorSubasta: 90000,
    imagen:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=300',
  },
];
