import { beforeEach, describe, expect, it, vi } from 'vitest';
import { authService } from './authService';

const createAuthResponse = () =>
    new Response(
        JSON.stringify({
            success: true,
            data: {
                _id: 'user-1',
                nombre: 'Javier',
                email: 'javier@test.com',
                rol: 'USER',
                accessToken: 'access-token-test',
                refreshToken: 'refresh-token-test',
            },
        }),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        },
    );

describe('authService', () => {
    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
        vi.restoreAllMocks();
    });

    it('login guarda accessToken, refreshToken y usuario', async () => {
        const fetchMock = vi.fn().mockResolvedValue(createAuthResponse());
        vi.stubGlobal('fetch', fetchMock);

        const user = await authService.login({
            email: 'javier@test.com',
            password: '123456',
        });

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'javier@test.com',
                password: '123456',
            }),
        });

        expect(user.email).toBe('javier@test.com');
        expect(sessionStorage.getItem('bfinder_access_token')).toBe('access-token-test');
        expect(localStorage.getItem('bfinder_refresh_token')).toBe('refresh-token-test');
        expect(authService.isAuthenticated()).toBe(true);
    });

    it('register guarda la sesión igual que login', async () => {
        const fetchMock = vi.fn().mockResolvedValue(createAuthResponse());
        vi.stubGlobal('fetch', fetchMock);

        const user = await authService.register({
            nombre: 'Javier',
            email: 'javier@test.com',
            password: '123456',
        });

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: 'Javier',
                email: 'javier@test.com',
                password: '123456',
            }),
        });

        expect(user.nombre).toBe('Javier');
        expect(sessionStorage.getItem('bfinder_access_token')).toBe('access-token-test');
        expect(localStorage.getItem('bfinder_refresh_token')).toBe('refresh-token-test');
    });

    it('logout limpia la sesión', () => {
        sessionStorage.setItem('bfinder_access_token', 'access');
        localStorage.setItem('bfinder_refresh_token', 'refresh');
        localStorage.setItem('bfinder_user', '{"email":"javier@test.com"}');

        authService.logout();

        expect(sessionStorage.getItem('bfinder_access_token')).toBeNull();
        expect(localStorage.getItem('bfinder_refresh_token')).toBeNull();
        expect(localStorage.getItem('bfinder_user')).toBeNull();
        expect(authService.isAuthenticated()).toBe(false);
    });

    it('lanza error cuando el backend rechaza credenciales', async () => {
        const fetchMock = vi.fn().mockResolvedValue(
            new Response(
                JSON.stringify({
                    error: { message: 'Credenciales inválidas' },
                }),
                {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                },
            ),
        );

        vi.stubGlobal('fetch', fetchMock);

        await expect(
            authService.login({
                email: 'bad@test.com',
                password: 'wrong',
            }),
        ).rejects.toThrow('Credenciales inválidas');
    });
});