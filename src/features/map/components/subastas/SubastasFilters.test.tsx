import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SubastasFilters, FiltrosState } from './SubastasFilters';

describe('SubastasFilters Component', () => {
  const mockFiltros: FiltrosState = {
    provincia: '',
    categoria: '',
    precio_min: undefined,
    precio_max: undefined,
    nivel_oportunidad: ''
  };
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza correctamente los campos con los valores por defecto', () => {
    render(<SubastasFilters filtros={mockFiltros} onChange={mockOnChange} />);

    expect(screen.getByText('Provincia')).toBeInTheDocument();
    expect(screen.getByText('Categoría')).toBeInTheDocument();
    expect(screen.getByText('Precio Mínimo (€)')).toBeInTheDocument();
    expect(screen.getByText('Precio Máximo (€)')).toBeInTheDocument();
    expect(screen.getByText('Nivel de Oportunidad')).toBeInTheDocument();

    expect(screen.getByDisplayValue('Todas las provincias')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Todas las categorías')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Precio minimo')).toHaveValue(null);
    expect(screen.getByPlaceholderText('Precio maximo')).toHaveValue(null);
  });

  it('llama a onChange con la provincia correcta al seleccionarla', () => {
    render(<SubastasFilters filtros={mockFiltros} onChange={mockOnChange} />);

    const selects = screen.getAllByRole('combobox');
    const provinciaSelect = selects[0];

    fireEvent.change(provinciaSelect, { target: { value: 'Madrid' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockFiltros,
      provincia: 'Madrid'
    });
  });

  it('llama a onChange con la categoría correcta al seleccionarla', () => {
    const filtrosConProvincia = { ...mockFiltros, provincia: 'Valencia' };
    render(<SubastasFilters filtros={filtrosConProvincia} onChange={mockOnChange} />);

    const selects = screen.getAllByRole('combobox');
    const categoriaSelect = selects[1];

    fireEvent.change(categoriaSelect, { target: { value: 'Inmueble' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith({
      ...filtrosConProvincia,
      categoria: 'Inmueble'
    });
  });

  it('llama a onChange al cambiar el precio mínimo', () => {
    render(<SubastasFilters filtros={mockFiltros} onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Precio minimo');
    fireEvent.change(input, { target: { value: '1000' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockFiltros,
      precio_min: 1000
    });
  });

  it('llama a onChange al cambiar el precio máximo', () => {
    render(<SubastasFilters filtros={mockFiltros} onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Precio maximo');
    fireEvent.change(input, { target: { value: '50000' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockFiltros,
      precio_max: 50000
    });
  });

  it('llama a onChange al cambiar el nivel de oportunidad', () => {
    render(<SubastasFilters filtros={mockFiltros} onChange={mockOnChange} />);

    const selects = screen.getAllByRole('combobox');
    const nivelSelect = selects[2];

    fireEvent.change(nivelSelect, { target: { value: 'ALTO' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockFiltros,
      nivel_oportunidad: 'ALTO'
    });
  });
});
