import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RegisterForm } from './RegisterForm';

// Mockear el router
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

describe('RegisterForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renderiza correctamente', () => {
        render(<MemoryRouter><RegisterForm /></MemoryRouter>);
        expect(screen.getByRole('heading', { name: /create your account/i })).toBeDefined();
    });

    it('el botón submit está deshabilitado si falta rellenar campos', () => {
        render(<MemoryRouter><RegisterForm /></MemoryRouter>);
        const submitButton = screen.getByRole('button', { name: /register/i });
        expect(submitButton).toHaveProperty('disabled', true);
    });

    it('muestra errores de validación en tiempo real', () => {
        render(<MemoryRouter><RegisterForm /></MemoryRouter>);
        
        const emailInput = screen.getByPlaceholderText('mail@bif.com');
        fireEvent.change(emailInput, { target: { value: 'email-malo' } });
        
        expect(screen.getByText('Email no válido')).toBeDefined();
    });
});