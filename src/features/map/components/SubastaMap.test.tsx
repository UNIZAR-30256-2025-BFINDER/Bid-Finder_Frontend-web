import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SubastaMap } from './SubastaMap';

const mocks = vi.hoisted(() => ({
  setDefaultMarkerIcon: vi.fn(),
  useGeolocation: vi.fn(),
  useMapAutoResize: vi.fn(),
  useMapEvent: vi.fn(),
}));

vi.mock('./mapConstants', () => ({
  setDefaultMarkerIcon: mocks.setDefaultMarkerIcon,
  MAP_DEFAULT_ZOOM: 13,
  MAP_MIN_ZOOM: 5,
  MAP_MAX_ZOOM: 18,
}));

vi.mock('../hooks/useGeolocation', () => ({
  useGeolocation: () => mocks.useGeolocation(),
}));

vi.mock('../hooks/useMapAutoResize', () => ({
  useMapAutoResize: () => mocks.useMapAutoResize(),
}));

vi.mock('./LocationMarker', () => ({
  LocationMarker: () => <div>LocationMarker mock</div>,
}));

vi.mock('../../subastas/components/SubastasMarkers', () => ({
  SubastasMarkers: () => <div>SubastasMarkers mock</div>,
}));

vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map-container">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  useMapEvent: (...args: unknown[]) => {
    mocks.useMapEvent(...args);
    return null;
  },
}));

describe('SubastaMap', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('muestra el estado de carga si no hay geolocalización', () => {
    mocks.useGeolocation.mockReturnValue(null);

    render(<SubastaMap />);

    expect(screen.getByText('Cargando mapa...')).toBeInTheDocument();
  });

  it('renderiza el mapa cuando hay geolocalización', () => {
    mocks.useGeolocation.mockReturnValue([40.4168, -3.7038]);

    render(<SubastaMap />);

    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.getByTestId('tile-layer')).toBeInTheDocument();
    expect(screen.getByText('LocationMarker mock')).toBeInTheDocument();
    expect(screen.getByText('SubastasMarkers mock')).toBeInTheDocument();
  });

  it('llama a setDefaultMarkerIcon al montarse', () => {
    mocks.useGeolocation.mockReturnValue([40.4168, -3.7038]);

    render(<SubastaMap />);

    expect(mocks.setDefaultMarkerIcon).toHaveBeenCalled();
  });

  it('registra el evento moveend cuando se renderiza', () => {
    mocks.useGeolocation.mockReturnValue([40.4168, -3.7038]);

    render(<SubastaMap />);

    expect(mocks.useMapEvent).toHaveBeenCalledWith('moveend', expect.any(Function));
  });
});