import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MapWidget } from '../MapWidget';

describe('MapWidget', () => {
  it('renderiza los children', () => {
    render(
      <MapWidget>
        <span>Contenido del mapa</span>
      </MapWidget>
    );

    expect(screen.getByText('Contenido del mapa')).toBeInTheDocument();
  });

  it('aplica la className recibida', () => {
    const { container } = render(
      <MapWidget className="custom-class">
        <span>Mapa</span>
      </MapWidget>
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});