import { Subasta, SUBASTAS_MOCKS } from '../components/subastasMocks';

// Simula una llamada a la API para obtener subastas
export async function fetchSubastas(): Promise<Subasta[]> {
  // Simula latencia de red
  await new Promise((res) => setTimeout(res, 300));
  return SUBASTAS_MOCKS;
}

export async function fetchSubastaById(id: string): Promise<Subasta | undefined> {
  await new Promise((res) => setTimeout(res, 200));
  return SUBASTAS_MOCKS.find((s) => s.id === id);
}
