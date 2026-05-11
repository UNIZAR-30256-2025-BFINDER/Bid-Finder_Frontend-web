/**
 * @fileoverview Utilidades para el filtrado espacial y geográfico de subastas.
 * Utiliza los bounds (límites) y cálculos de distancia de la librería Leaflet.
 */

import L from 'leaflet';
import type { Subasta } from '../../../models/Subasta';

/**
 * Filtra las subastas para devolver únicamente aquellas que se encuentran
 * dentro del área visible actual del mapa.
 * @param {Subasta[]} subastas - Array completo de subastas geolocalizadas.
 * @param {L.LatLngBounds} bounds - Objeto de Leaflet con los límites noreste y suroeste del mapa.
 * @returns {Subasta[]} Array de subastas contenidas en el área.
 */
export function filtrarSubastasPorBounds(subastas: Subasta[], bounds: L.LatLngBounds): Subasta[] {
  return subastas.filter((s) => bounds.contains(L.latLng(s.lat, s.lng)));
}

/**
 * Filtra las subastas estableciendo un radio máximo de distancia respecto a un punto central.
 * @param {Subasta[]} subastas - Array completo de subastas geolocalizadas.
 * @param {L.LatLng} center - Coordenadas del punto de origen (ej. ubicación del usuario).
 * @param {number} maxDistance - Distancia máxima permitida en metros.
 * @returns {Subasta[]} Array de subastas dentro del radio especificado.
 */
export function filtrarSubastasPorDistancia(
  subastas: Subasta[],
  center: L.LatLng,
  maxDistance: number,
): Subasta[] {
  return subastas.filter((s) => center.distanceTo(L.latLng(s.lat, s.lng)) <= maxDistance);
}