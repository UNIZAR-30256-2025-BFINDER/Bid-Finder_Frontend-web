import L from 'leaflet';
import type { Subasta } from '../components/map/subasta/subastasMocks';

/**
 * Filtra subastas que están dentro de los bounds del mapa.
 * @param subastas Array de subastas
 * @param bounds L.LatLngBounds (área visible del mapa)
 */
export function filtrarSubastasPorBounds(subastas: Subasta[], bounds: L.LatLngBounds): Subasta[] {
  return subastas.filter((s) => bounds.contains(L.latLng(s.lat, s.lng)));
}

/**
 * Filtra subastas por distancia máxima a un punto (en metros)
 * @param subastas Array de subastas
 * @param center Centro (L.LatLng)
 * @param maxDistance Distancia máxima en metros
 */
export function filtrarSubastasPorDistancia(
  subastas: Subasta[],
  center: L.LatLng,
  maxDistance: number,
): Subasta[] {
  return subastas.filter((s) => center.distanceTo(L.latLng(s.lat, s.lng)) <= maxDistance);
}
