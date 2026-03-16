import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet.markercluster';
export const MAP_DEFAULT_CENTER: [number, number] = [40.416775, -3.70379];

export const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export const setDefaultMarkerIcon = () => {
  L.Marker.prototype.options.icon = DefaultIcon;
};
export const LOCATION_POPUP_TEXT = 'Estás aquí';
export const LOCATION_BUTTON_TITLE = 'Ubicarme';
export const LOCATION_DENIED_WARNING = 'Ubicación denegada:';

export const MAP_DEFAULT_ZOOM = 16;
export const MAP_MIN_ZOOM = 1;
export const MAP_MAX_ZOOM = 18;
export const MAP_FLYTO_OPTIONS = {
  animate: true,
  duration: 1.5, // segundos
};

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

export const handleLocationFound =
  (map: L.Map, setPosition: (latlng: L.LatLng) => void) => (e: L.LocationEvent) => {
    setPosition(e.latlng);
    map.flyTo(e.latlng, MAP_DEFAULT_ZOOM, MAP_FLYTO_OPTIONS);
  };

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
