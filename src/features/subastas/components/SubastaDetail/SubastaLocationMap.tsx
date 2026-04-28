import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getSubastaIcon } from '../../../map/components/subastas/subastasIcons';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: string })._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface Props {
  lat: number;
  lng: number;
  direccion?: string | null;
  hasLocation?: boolean;
  type: string;
  viabilidad: string;
}

const SubastaLocationMap: React.FC<Props> = ({ lat, lng, direccion, hasLocation, type, viabilidad }) => {
  if (!hasLocation) {
    return (
      <section>
        <h2 className="text-lg md:text-xl font-semibold mb-4">Ubicación</h2>
        <div className="rounded-2xl border border-gray-800 bg-[#121723] p-8 text-center text-gray-400">
          <p>📍 No se pudo geolocalizar la ubicación exacta para esta subasta.</p>
          <p className="text-sm mt-2 text-white/60">{direccion || 'Dirección no disponible en el texto original.'}</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-lg md:text-xl font-semibold mb-4">Ubicación</h2>
      <div className="rounded-2xl overflow-hidden border border-gray-800 bg-[#121723] h-[300px] md:h-[400px] relative z-0">
        <MapContainer
          center={[lat, lng]}
          zoom={16}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]} icon={getSubastaIcon(type, viabilidad)}>
            {direccion && <Popup>{direccion}</Popup>}
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};

export default SubastaLocationMap;