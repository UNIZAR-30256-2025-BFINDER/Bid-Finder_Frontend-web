import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MobileViewToggle } from '../MobileViewToggle';

describe('MobileViewToggle', () => {
  it('muestra el texto "Lista" cuando la vista actual es mapa', () => {
    render(<MobileViewToggle currentView="map" onToggle={() => {}} />);
    expect(screen.getByText('Lista')).toBeDefined();
  });

  it('muestra el texto "Mapa" cuando la vista actual es lista', () => {
    render(<MobileViewToggle currentView="list" onToggle={() => {}} />);
    expect(screen.getByText('Mapa')).toBeDefined();
  });

  it('ejecuta la función onToggle al hacer clic', () => {
    const onToggleMock = vi.fn();
    render(<MobileViewToggle currentView="map" onToggle={onToggleMock} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });
});