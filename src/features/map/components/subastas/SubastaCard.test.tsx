import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SubastaCard } from './SubastaCard';

describe('SubastaCard', () => {
  it('muestra el precio formateado correctamente', () => {
    render(
      <SubastaCard 
        title="Test" 
        subtitle="Sub" 
        price={1500} 
      />
    );
    expect(screen.getByText(/1.*500.*€/)).toBeDefined();
  });

  it('aplica estilos de seleccionada cuando el prop selected es true', () => {
    const { container } = render(
      <SubastaCard 
        title="Test" 
        subtitle="Sub" 
        price={1500} 
        selected={true} 
      />
    );
    expect(container.firstChild).toHaveProperty('className', expect.stringContaining('border-yellow-400'));
  });
});