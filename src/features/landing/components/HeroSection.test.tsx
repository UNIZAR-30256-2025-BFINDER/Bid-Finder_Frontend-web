import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from './HeroSection';

describe('HeroSection', () => {
  it('renderiza el título correctamente', () => {
    render(<HeroSection title="Título de Prueba" />);
    expect(screen.getByText('Título de Prueba')).toBeDefined();
  });
});