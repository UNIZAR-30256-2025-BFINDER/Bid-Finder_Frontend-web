import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SubastasFilters, FiltrosState } from './SubastasFilters';

describe('SubastasFilters Component', () => {
  const mockFiltros: FiltrosState = { provincia: '', categoria: '' };
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza correctamente los selects con los valores por defecto', () => {
    render(<SubastasFilters filtros={mockFiltros} onChange={mockOnChange} />);

    expect(screen.getByText('Provincia')).toBeInTheDocument();
    expect(screen.getByText('Categoría')).toBeInTheDocument();

    expect(screen.getByDisplayValue('Todas las provincias')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Todas las categorías')).toBeInTheDocument();
  });

  it('llama a onChange con la provincia correcta al seleccionarla', () => {
    render(<SubastasFilters filtros={mockFiltros} onChange={mockOnChange} />);

    const selects = screen.getAllByRole('combobox');
    const provinciaSelect = selects[0];

    fireEvent.change(provinciaSelect, { target: { value: 'Madrid' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith({
      provincia: 'Madrid',
      categoria: '' 
    });
  });

  it('llama a onChange con la categoría correcta al seleccionarla', () => {
    const filtrosConProvincia = { provincia: 'Valencia', categoria: '' };
    render(<SubastasFilters filtros={filtrosConProvincia} onChange={mockOnChange} />);

    const selects = screen.getAllByRole('combobox');
    const categoriaSelect = selects[1];

    fireEvent.change(categoriaSelect, { target: { value: 'Inmueble' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith({
      provincia: 'Valencia',
      categoria: 'Inmueble'  
    });
  });
});