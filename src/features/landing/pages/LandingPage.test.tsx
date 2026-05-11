import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LandingPage } from './LandingPage';

// Mock de SubastaMap ya que usa Leaflet y puede fallar en tests unitarios
vi.mock('../../map/components/SubastaMap', () => ({
  SubastaMap: () => <div data-testid="mock-map">Map</div>
}));

describe('LandingPage', () => {
  it('renderiza todas las secciones principales', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Oportunidades del/i)).toBeDefined();
    expect(screen.getByText(/Todo lo que necesitas/i)).toBeDefined();
    expect(screen.getByTestId('mock-map')).toBeDefined();
  });
});