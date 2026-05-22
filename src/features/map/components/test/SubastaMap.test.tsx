/**
 * @fileoverview Tests unitarios para el componente SubastaMap.
 */

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
  MAP_DEFAULT_CENTER: [40.416775, -3.70379] as [number, number],
  MAP_DEFAULT_ZOOM: 6,
  MAP_MIN_ZOOM: 5,
  MAP_MAX_ZOOM: 18,
  MAP_ZOOM_DELTA: 0.5,
  MAP_ZOOM_SNAP: 0.5,
  SPAIN_MAX_BOUNDS: [[24.0, -22.0], [45.5, 6.0]],
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
      on: vi.fn(),
      off: vi.fn(),
    }),
    useMapEvents: vi.fn(),
    useMapEvent: vi.fn(),
  };
});

describe('SubastaMap', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('muestra el mapa con el centro por defecto si no hay geolocalización', () => {
    mocks.useGeolocation.mockReturnValue(null);

    render(
      <MemoryRouter>
        <SubastaMap subastas={[]} onBoundsChange={vi.fn()} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });

  it('renderiza el mapa cuando hay geolocalización', () => {
    mocks.useGeolocation.mockReturnValue([40.4168, -3.7038]);

    render(
      <MemoryRouter>
        <SubastaMap subastas={[]} onBoundsChange={vi.fn()} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.getByText('LocationMarker mock')).toBeInTheDocument();
    expect(screen.getByText('SubastasMarkers mock')).toBeInTheDocument();
  });
});