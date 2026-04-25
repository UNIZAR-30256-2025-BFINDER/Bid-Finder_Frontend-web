import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LoginForm } from './LoginForm';

const mocks = vi.hoisted(() => ({
    login: vi.fn(),
    navigate: vi.fn(),
}));

vi.mock('../services/authService', () => ({
    authService: {
        login: mocks.login,
    },
}));

vi.mock('react-router-dom', () => ({
    Link: ({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) => (
        <a href={to} className={className}>
            {children}
        </a>
    ),
    useNavigate: () => mocks.navigate,
}));

describe('LoginForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('muestra error si se envía vacío', () => {
        render(<LoginForm />);

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        expect(screen.getByText('Introduce email y contraseña.')).toBeInTheDocument();
        expect(mocks.login).not.toHaveBeenCalled();
        expect(mocks.navigate).not.toHaveBeenCalled();
    });

    it('hace login y redirige a dashboard si las credenciales son válidas', async () => {
        mocks.login.mockResolvedValue({
            _id: 'user-1',
            nombre: 'Javier',
            email: 'javier@test.com',
            rol: 'USER',
        });

        render(<LoginForm />);

        fireEvent.change(screen.getByPlaceholderText('mail@bif.com'), {
            target: { value: 'javier@test.com' },
        });

        fireEvent.change(screen.getByPlaceholderText('••••••••'), {
            target: { value: '123456' },
        });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(mocks.login).toHaveBeenCalledWith({
                email: 'javier@test.com',
                password: '123456',
            });
        });

        expect(mocks.navigate).toHaveBeenCalledWith('/dashboard');
    });

    it('muestra error si el backend rechaza el login', async () => {
        mocks.login.mockRejectedValue(new Error('Credenciales inválidas'));

        render(<LoginForm />);

        fireEvent.change(screen.getByPlaceholderText('mail@bif.com'), {
            target: { value: 'javier@test.com' },
        });

        fireEvent.change(screen.getByPlaceholderText('••••••••'), {
            target: { value: 'wrong' },
        });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        expect(await screen.findByText('Credenciales inválidas')).toBeInTheDocument();
        expect(mocks.navigate).not.toHaveBeenCalled();
    });
});