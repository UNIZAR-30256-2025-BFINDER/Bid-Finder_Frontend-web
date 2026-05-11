/**
 * @fileoverview Constantes y configuraciones base para el mapa de Leaflet.
 * Incluye definiciones de iconos, parámetros de zoom y handlers de ubicación.
 */

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet.markercluster';

/** Coordenadas por defecto (Centro de Madrid) */
export const MAP_DEFAULT_CENTER: [number, number] = [40.416775, -3.70379];

/** Configuración del icono por defecto de Leaflet */
export const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

/**
 * Sobrescribe el icono de marcador global de Leaflet con el icono por defecto configurado.
 */
export const setDefaultMarkerIcon = () => {
  L.Marker.prototype.options.icon = DefaultIcon;
};

export const LOCATION_POPUP_TEXT = 'Estás aquí';
export const LOCATION_BUTTON_TITLE = 'Ubicarme';
export const LOCATION_DENIED_WARNING = 'Ubicación denegada:';

export const MAP_DEFAULT_ZOOM = 16;
export const MAP_MIN_ZOOM = 1;
export const MAP_MAX_ZOOM = 18;

/** Opciones de animación para el desplazamiento del mapa */
export const MAP_FLYTO_OPTIONS = {
  animate: true,
  duration: 1.5,
};

/** Icono personalizado para representar la ubicación actual del usuario */
export const hereIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      width:22px;height:22px;
      background:rgba(0,102,255,0.7);
      border:3px solid #0066ff;
      border-radius:50%;
      box-shadow:0 0 8px #0066ff;
      position:relative;top:-11px;left:-11px;display:flex;align-items:center;justify-content:center;">
      <div style="width:6px;height:6px;background:white;border-radius:50%;box-shadow:0 0 2px #0066ff;"></div>
    </div>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

/**
 * Handler para cuando se encuentra la ubicación del usuario.
 * @param {L.Map} map - Instancia del mapa de Leaflet.
 * @param {(latlng: L.LatLng) => void} setPosition - Estado para actualizar la posición en el componente.
 */
export const handleLocationFound =
  (map: L.Map, setPosition: (latlng: L.LatLng) => void) => (e: L.LocationEvent) => {
    setPosition(e.latlng);
    map.flyTo(e.latlng, MAP_DEFAULT_ZOOM, MAP_FLYTO_OPTIONS);
  };

/**
 * Crea un icono personalizado para los clusters de marcadores.
 * @param {L.MarkerCluster} cluster - El objeto cluster proporcionado por leaflet.markercluster.
 * @returns {L.DivIcon} Icono circular amarillo con el conteo de elementos.
 */
export function createYellowClusterIcon(cluster: L.MarkerCluster) {
  const count = cluster.getChildCount();
  const size = Math.max(40, Math.min(80, 30 + count * 4));
  return L.divIcon({
    html: `<div style="
      background: #FFDE21;
      color: #121212;
      border-radius: 50%;
      width: ${size}px;
      height: ${size}px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: ${size / 2.5}px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
      border: 3px solid #fff;
    ">${count}</div>`,
    className: '',
    iconSize: [size, size],
  });
}