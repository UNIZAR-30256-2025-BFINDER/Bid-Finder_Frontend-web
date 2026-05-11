import { describe, it, expect } from 'vitest';
import { getSubastaIcon } from './subastasIcons';
import L from 'leaflet';

describe('subastasIcons', () => {
  it('debe devolver un objeto L.Icon válido', () => {
    const icon = getSubastaIcon('house', 'green');
    expect(icon).toBeInstanceOf(L.Icon);
  });

  it('debe cargar la URL de imagen correcta según tipo y viabilidad', () => {
    const icon = getSubastaIcon('car', 'red');
    expect(icon.options.iconUrl).toContain('BFINDER_COCHE_RED');
  });
});