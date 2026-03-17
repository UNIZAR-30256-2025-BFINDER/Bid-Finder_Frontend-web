import { Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { fetchSubastas } from '../../services/subastasService';
import { getSubastaIcon } from '../map/subasta/subastasIcons';
import type { Subasta } from './subastasMocks';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { createYellowClusterIcon } from '../map/mapConstants';
import { AuctionCard } from './subastaPopupCard';
import { useNavigate } from 'react-router-dom';

export const SubastasMarkers = () => {
  const [subastas, setSubastas] = useState<Subasta[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubastas().then((data) => {
      console.log('Subastas mock cargadas:', data);
      setSubastas(data);
    });
  }, []);

  console.log('Renderizando SubastasMarkers, subastas:', subastas);

  return (
    <MarkerClusterGroup
      chunkedLoading
      showCoverageOnHover={false}
      iconCreateFunction={createYellowClusterIcon}
    >
      {subastas.map((subasta: Subasta) => (
        <Marker
          key={subasta.id}
          position={[subasta.lat, subasta.lng]}
          icon={getSubastaIcon(subasta.type, subasta.viabilidad)}
        >
          <Popup className="leaflet-popup-transparent" closeButton={false}>
            <div
              style={{ background: 'transparent', boxShadow: 'none', padding: 0, border: 'none' }}
            >
              <AuctionCard
                title={subasta.name}
                currentPrice={subasta.precioActual || 0}
                originalPrice={subasta.valorSubasta || 0}
                onViewClick={() => navigate(`/auction/${subasta.id}`)}
              />
            </div>
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
};
