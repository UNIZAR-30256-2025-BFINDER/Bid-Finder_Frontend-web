import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SubastaDetail from './SubastaDetail';

const mocks = vi.hoisted(() => ({
  fetchSubastaById: vi.fn(),
}));

vi.mock('../services/subastasService', () => ({
  fetchSubastaById: (...args: unknown[]) => mocks.fetchSubastaById(...args),
}));



describe('SubastaDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('muestra skeleton de carga inicialmente', () => {
    mocks.fetchSubastaById.mockReturnValue(new Promise(() => {}));

    render(
      <MemoryRouter initialEntries={['/subastas/1']}>
        <Routes>
          <Route path="/subastas/:id" element={<SubastaDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText((_content, node) => {
      const hasText = (node: Element | null) =>
        !!node && node.textContent?.replace(/\s/g, '') === 'B-FINDER';
      const nodeHasText = hasText(node as Element);
      const childrenDontHaveText = Array.from(node?.children || []).every(
        (child) => !hasText(child as Element)
      );
      return nodeHasText && childrenDontHaveText;
    })).toBeInTheDocument();
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('muestra los datos de la subasta cuando la petición funciona', async () => {
    mocks.fetchSubastaById.mockResolvedValue({
      id: 1,
      titulo: 'Subasta test',
      precio: 1000,
      descripcion: 'Descripción test',
      urlOriginal: 'https://subastas.boe.es/test',
    });

    render(
      <MemoryRouter initialEntries={['/subastas/1']}>
        <Routes>
          <Route path="/subastas/:id" element={<SubastaDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
        expect(screen.getByText('Subasta test')).toBeInTheDocument();
        expect(screen.getByText('Texto bruto recuperado')).toBeInTheDocument();
        expect(screen.getByText('Ver anuncio original')).toBeInTheDocument();
      });
      
      expect(screen.getAllByText('Descripción test')).toHaveLength(2);
  });

  it('muestra mensaje de error si falla la petición', async () => {
    mocks.fetchSubastaById.mockRejectedValue(new Error('error'));

    render(
      <MemoryRouter initialEntries={['/subastas/1']}>
        <Routes>
          <Route path="/subastas/:id" element={<SubastaDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Error al cargar la subasta')).toBeInTheDocument();
      expect(
        screen.getByText('No se pudo recuperar la subasta desde el backend.'),
      ).toBeInTheDocument();
    });
  });

  it('muestra mensaje de no encontrada cuando el servicio devuelve null', async () => {
    mocks.fetchSubastaById.mockResolvedValue(null);

    render(
      <MemoryRouter initialEntries={['/subastas/999']}>
        <Routes>
          <Route path="/subastas/:id" element={<SubastaDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Subasta no encontrada')).toBeInTheDocument();
      expect(
        screen.getByText(/No hemos podido encontrar la subasta con ID:/i),
      ).toBeInTheDocument();
    });
  });
});