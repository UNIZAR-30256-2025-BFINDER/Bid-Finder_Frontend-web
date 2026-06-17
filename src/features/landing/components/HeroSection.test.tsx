import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HeroSection } from './HeroSection';

describe('HeroSection', () => {
  it('renderiza el título correctamente', () => {
    render(
      <MemoryRouter>
        <HeroSection title="Título de Prueba" />
      </MemoryRouter>,
    );
    expect(screen.getByText('Título de Prueba')).toBeDefined();
  });
});
