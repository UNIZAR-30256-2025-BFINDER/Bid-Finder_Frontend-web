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
    expect(screen.getByText('Mínimo (€)')).toBeInTheDocument();
    expect(screen.getByText('Máximo (€)')).toBeInTheDocument();
    expect(screen.getByText('Nivel de Oportunidad')).toBeInTheDocument();
  });

  it('llama a onChange con la provincia correcta al seleccionarla', () => {
    render(<SubastasFilters filtros={mockFiltros} onChange={mockOnChange} />);
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: 'Madrid' } });

    expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({ provincia: 'Madrid' }));
  });

  it('llama a onChange al cambiar el precio mínimo', () => {
    render(<SubastasFilters filtros={mockFiltros} onChange={mockOnChange} />);
    const input = screen.getByPlaceholderText('0');
    fireEvent.change(input, { target: { value: '1000' } });

    expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({ precio_min: 1000 }));
  });

  it('llama a onChange al cambiar el precio máximo', () => {
    render(<SubastasFilters filtros={mockFiltros} onChange={mockOnChange} />);
    const input = screen.getByPlaceholderText('Máx.');
    fireEvent.change(input, { target: { value: '50000' } });

    expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({ precio_max: 50000 }));
  });
});