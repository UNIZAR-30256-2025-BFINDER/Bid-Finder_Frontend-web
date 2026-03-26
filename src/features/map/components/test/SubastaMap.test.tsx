import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; 
import { SubastaMap } from '../SubastaMap';

const mocks = vi.hoisted(() => ({
  useGeolocation: vi.fn(),
  useMapAutoResize: vi.fn(),
  setDefaultMarkerIcon: vi.fn(),
}));

vi.mock('../../hooks/useGeolocation', () => ({
  useGeolocation: () => mocks.useGeolocation(),
}));

vi.mock('../../hooks/useMapAutoResize', () => ({
  useMapAutoResize: () => mocks.useMapAutoResize(),
}));

vi.mock('../mapConstants', () => ({
  setDefaultMarkerIcon: () => mocks.setDefaultMarkerIcon(),
  MAP_DEFAULT_ZOOM: 13,
  MAP_MIN_ZOOM: 5,
  MAP_MAX_ZOOM: 18,
}));

vi.mock('../LocationMarker', () => ({
  LocationMarker: () => <div>LocationMarker mock</div>,
}));

vi.mock('../subastas/SubastasMarkers', () => ({
  SubastasMarkers: () => <div>SubastasMarkers mock</div>,
}));

vi.mock('react-leaflet', () => {
  const DummyContainer = ({ children }: { children?: React.ReactNode }) => <div>{children}</div>;
  
  return {
    MapContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="map-container">{children}</div>
    ),
    TileLayer: () => <div data-testid="tile-layer" />,
    FeatureGroup: DummyContainer,
    LayerGroup: DummyContainer,
    Marker: DummyContainer,
    Popup: DummyContainer,
    Circle: DummyContainer,
    CircleMarker: DummyContainer,
    Polygon: DummyContainer,
    ZoomControl: DummyContainer,
    useMap: () => ({
      fitBounds: vi.fn(),
      setView: vi.fn(),
      getBounds: vi.fn(),
    }),
    useMapEvents: vi.fn(),
    useMapEvent: vi.fn(),
  };
});

describe('SubastaMap', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('muestra el estado de carga si no hay geolocalización', () => {
    mocks.useGeolocation.mockReturnValue(null);

    render(
      <MemoryRouter>
        <SubastaMap onBoundsChange={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText('Cargando mapa...')).toBeInTheDocument();
  });

  it('renderiza el mapa cuando hay geolocalización', () => {
    mocks.useGeolocation.mockReturnValue([40.4168, -3.7038]);

    render(
      <MemoryRouter>
        <SubastaMap onBoundsChange={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.getByText('LocationMarker mock')).toBeInTheDocument();
    expect(screen.getByText('SubastasMarkers mock')).toBeInTheDocument();
  });
});