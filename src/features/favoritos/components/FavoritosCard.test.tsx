import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavoritosCard } from './FavoritosCard';

describe('FavoritosCard', () => {
  const props = {
    title: 'Subasta Test',
    subtitle: 'Descripción larga',
    price: 120000,
    location: 'Madrid',
    onRemove: vi.fn(),
  };

  it('renderiza correctamente la información de la subasta', () => {
    render(<FavoritosCard {...props} />);
    expect(screen.getByText('Subasta Test')).toBeDefined();
    expect(screen.getByText('120.000 €')).toBeDefined();
    expect(screen.getByText('Madrid')).toBeDefined();
  });

  it('llama a onRemove cuando se pulsa el botón de eliminar', () => {
    render(<FavoritosCard {...props} />);
    const removeBtn = screen.getByTitle('Quitar de favoritos');
    fireEvent.click(removeBtn);
    expect(props.onRemove).toHaveBeenCalled();
  });
});