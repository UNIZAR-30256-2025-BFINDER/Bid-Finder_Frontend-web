import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SubastasMarkers } from '../subastas/SubastasMarkers';
import type { Subasta } from '../../../../models/Subasta';

const mocks = vi.hoisted(() => ({
  navigate: vi.fn(),
}));

vi.mock('./subastasIcons', () => ({
  getSubastaIcon: vi.fn(() => ({})),
}));

vi.mock('../../map/components/mapConstants', () => ({
  createYellowClusterIcon: vi.fn(),
}));

vi.mock('../../map/components/popup/subastaPopupCard', () => ({
  AuctionCard: ({ title }: { title: string }) => <div>{title}</div>,
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => mocks.navigate,
}));

vi.mock('react-leaflet-cluster', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="cluster-group">{children}</div>
  ),
}));

vi.mock('react-leaflet', () => ({
  Marker: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="marker">{children}</div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popup">{children}</div>
  ),
}));

describe('SubastasMarkers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza las subastas recibidas por props', () => {
    const longTitle = 'Resolución de la Delegación del Gobierno para el Plan Nacional sobre Drogas, por la que se anuncia la venta en Subasta Pública Electrónica 4/2026 de Cuadros de distintos artistas.';
    
    const mockSubastas: Subasta[] = [
      {
        id: 'BOE-B-2026-9180',
        titulo: longTitle,
        titulo_resumido: null,
        precio: null,
        descripcion: 'desc',
        urlPdf: '',
        lat: 38.48,
        lng: -5.80,
        hasLocation: true,
        type: 'house',
        viabilidad: 'green',
        precioActual: 0,
        valorSubasta: 0,
        imagen: '',
        urlOriginal: '',
        textoBruto: ''
      }
    ];

    render(<SubastasMarkers subastas={mockSubastas} />);

    expect(screen.getByText(longTitle)).toBeInTheDocument();
    expect(screen.getByTestId('cluster-group')).toBeInTheDocument();
  });
});