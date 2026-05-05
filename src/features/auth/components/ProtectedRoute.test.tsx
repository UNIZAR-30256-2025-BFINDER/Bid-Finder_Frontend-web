import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { ProtectedRoute } from './ProtectedRoute';

describe('ProtectedRoute', () => {
    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    it('redirige a login si no hay sesión', () => {
        render(
            <MemoryRouter initialEntries={['/dashboard']}>
                <Routes>
                    <Route path="/login" element={<div>Login page</div>} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <div>Dashboard privado</div>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </MemoryRouter>,
        );

        expect(screen.getByText('Login page')).toBeInTheDocument();
        expect(screen.queryByText('Dashboard privado')).not.toBeInTheDocument();
    });

    it('permite acceder si existe token', () => {
        sessionStorage.setItem('bfinder_access_token', 'access-token-test');

        render(
            <MemoryRouter initialEntries={['/dashboard']}>
                <Routes>
                    <Route path="/login" element={<div>Login page</div>} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <div>Dashboard privado</div>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </MemoryRouter>,
        );

        expect(screen.getByText('Dashboard privado')).toBeInTheDocument();
        expect(screen.queryByText('Login page')).not.toBeInTheDocument();
    });
});