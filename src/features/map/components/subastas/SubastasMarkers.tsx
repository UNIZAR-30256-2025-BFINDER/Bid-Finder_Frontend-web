import { Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { fetchSubastas } from '../../../subastas/services/subastasService';
import { getSubastaIcon } from './subastasIcons';
import type { Subasta } from '../../../../models/Subasta';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { createYellowClusterIcon } from '../mapConstants';
import { AuctionCard } from '../popup/subastaPopupCard';
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
          <Popup className="leaflet-popup-transparent !p-2 md:!p-4 !min-w-[180px] !max-w-[90vw] md:!max-w-xs" closeButton={false}>
            <div
              style={{ background: 'transparent', boxShadow: 'none', padding: 0, border: 'none' }}
            >
              <AuctionCard
                title={subasta.titulo}
                currentPrice={subasta.precioActual || 0}
                originalPrice={subasta.valorSubasta || 0}
                onViewClick={() => navigate(`/subastas/${subasta.id}`)}
              />
            </div>
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
};
