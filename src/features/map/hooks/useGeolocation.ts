import { useEffect, useState } from 'react';
import { MAP_DEFAULT_CENTER } from '../components/mapConstants';

export function useGeolocation(): [number, number] | null {
  const [center, setCenter] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log('Geolocalización no soportada, usando centro por defecto');
      setTimeout(() => {
        setCenter(MAP_DEFAULT_CENTER);
      }, 0);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Geolocalización OK', position.coords);
        setTimeout(() => {
          setCenter([position.coords.latitude, position.coords.longitude]);
        }, 0);
      },
      (err) => {
        console.log('Error geolocalización, usando centro por defecto', err);
        setTimeout(() => {
          setCenter(MAP_DEFAULT_CENTER);
        }, 0);
      },
    );
  }, []);
  console.log('Valor de center en useGeolocation:', center);

  return center;
}
