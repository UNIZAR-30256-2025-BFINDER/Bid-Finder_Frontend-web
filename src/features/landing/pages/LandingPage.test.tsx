import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LandingPage } from './LandingPage';

vi.mock('react-leaflet', () => ({
  MapContainer: () => <div data-testid="mock-map">Map</div>,
  TileLayer: () => null,
  Marker: () => null,
}));

vi.mock('../../subastas/services/subastasService', () => ({
  fetchSubastas: vi.fn().mockResolvedValue([]),
}));

describe('LandingPage', () => {
  it('renderiza todas las secciones principales', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Oportunidades del/i)).toBeDefined();
    // Actualizado al nuevo texto del componente FeaturesSection
    expect(screen.getByText(/Herramientas para analizar mejor/i)).toBeDefined();
    expect(screen.getByTestId('mock-map')).toBeDefined();
  });
});