import L from 'leaflet';
import carGreen from '../../../assets/BFINDER_COCHE_GREEN.png';
import carYellow from '../../../assets/BFINDER_COCHE_YELLOW.png';
import carRed from '../../../assets/BFINDER_COCHE_RED.png';
import houseGreen from '../../../assets/BFINDER_HOUSE_GREEN.png';
import houseYellow from '../../../assets/BFINDER_HOUSE_YELLOW.png';
import houseRed from '../../../assets/BFINDER_HOUSE_RED.png';
import { SubastaType, Viabilidad } from './subastasMocks';

export function getSubastaIcon(type: SubastaType, viabilidad: Viabilidad): L.Icon {
  const size: [number, number] = [22, 22];
  const anchor: [number, number] = [11, 22];
  const popup: [number, number] = [0, -22];
  if (type === 'car') {
    if (viabilidad === 'green')
      return L.icon({ iconUrl: carGreen, iconSize: size, iconAnchor: anchor, popupAnchor: popup });
    if (viabilidad === 'yellow')
      return L.icon({ iconUrl: carYellow, iconSize: size, iconAnchor: anchor, popupAnchor: popup });
    return L.icon({ iconUrl: carRed, iconSize: size, iconAnchor: anchor, popupAnchor: popup });
  }
  if (type === 'house') {
    if (viabilidad === 'green')
      return L.icon({
        iconUrl: houseGreen,
        iconSize: size,
        iconAnchor: anchor,
        popupAnchor: popup,
      });
    if (viabilidad === 'yellow')
      return L.icon({
        iconUrl: houseYellow,
        iconSize: size,
        iconAnchor: anchor,
        popupAnchor: popup,
      });
    return L.icon({ iconUrl: houseRed, iconSize: size, iconAnchor: anchor, popupAnchor: popup });
  }
  // fallback
  return L.icon({ iconUrl: carGreen, iconSize: size, iconAnchor: anchor, popupAnchor: popup });
}
