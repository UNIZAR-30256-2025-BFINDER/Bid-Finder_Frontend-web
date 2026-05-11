/**
 * @fileoverview Test unitario para el componente LocationMarker.
 * Verifica la correcta renderización del botón de geolocalización.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LocationMarker } from '../LocationMarker';
import { MapContainer } from 'react-leaflet';

vi.mock('react-leaflet', async () => {
  const actual = await vi.importActual<Record<string, unknown>>('react-leaflet');
  return {
    ...actual,
    useMap: () => ({
      locate: vi.fn(),
      on: vi.fn(),
    }),
  };
});

describe('LocationMarker', () => {
  it('renderiza el botón de ubicación correctamente', () => {
    render(
      <MapContainer>
        <LocationMarker />
      </MapContainer>
    );
    
    const button = screen.getByTitle('Ubicarme');
    
    expect(button).toBeDefined();
    expect(button.tagName).toBe('BUTTON');
  });
});