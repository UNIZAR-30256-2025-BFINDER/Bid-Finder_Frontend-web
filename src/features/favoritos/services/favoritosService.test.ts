import { describe, it, expect, vi, beforeEach } from 'vitest';
import { addFavorito, removeFavorito, fetchFavoritos, getAuthHeaders } from './favoritosService';
import { authService } from '../../auth/services/authService';

vi.mock('../../../auth/services/authService', () => ({
  authService: {
    getAccessToken: vi.fn(),
    logout: vi.fn(),
  },
}));

describe('favoritosService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Mockear fetch sin usar global
    vi.stubGlobal('fetch', vi.fn());
  });

  describe('getAuthHeaders', () => {
    it('incluye token cuando existe', () => {
      const spy = vi.spyOn(authService, 'getAccessToken');
      spy.mockReturnValue('token123');
      expect(getAuthHeaders()).toEqual({
        'Content-Type': 'application/json',
        Authorization: 'Bearer token123',
      });
      spy.mockRestore();
    });

    it('no incluye Authorization si no hay token', () => {
      const spy = vi.spyOn(authService, 'getAccessToken');
      spy.mockReturnValue(null);
      expect(getAuthHeaders()).toEqual({ 'Content-Type': 'application/json' });
      spy.mockRestore();
    });
  });

  describe('fetchFavoritos', () => {
    it('transforma la respuesta en array de IDs', async () => {
      const mockResponse = {
        data: { favoritos: [{ id: 'sub-1' }, { id: 'sub-2' }] },
      };
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });
      vi.stubGlobal('fetch', mockFetch);
      const spy = vi.spyOn(authService, 'getAccessToken');
      spy.mockReturnValue('token');

      const result = await fetchFavoritos();
      expect(result).toEqual(['sub-1', 'sub-2']);
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/favoritos',
        expect.objectContaining({
          headers: { Authorization: 'Bearer token', 'Content-Type': 'application/json' },
        }),
      );
      spy.mockRestore();
    });

    it('llama a logout y devuelve array vacío si 401', async () => {
      const mockFetch = vi.fn().mockResolvedValue({ ok: false, status: 401 });
      vi.stubGlobal('fetch', mockFetch);
      const logoutSpy = vi.spyOn(authService, 'logout');
      const result = await fetchFavoritos();
      expect(logoutSpy).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('addFavorito / removeFavorito', () => {
    it('addFavorito lanza error y logout en 401', async () => {
      const mockFetch = vi.fn().mockResolvedValue({ ok: false, status: 401 });
      vi.stubGlobal('fetch', mockFetch);
      const logoutSpy = vi.spyOn(authService, 'logout');
      await expect(addFavorito('sub-1')).rejects.toThrow(
        'Sesión expirada. Vuelve a iniciar sesión.',
      );
      expect(logoutSpy).toHaveBeenCalled();
    });

    it('removeFavorito funciona correctamente', async () => {
      const mockFetch = vi.fn().mockResolvedValue({ ok: true });
      vi.stubGlobal('fetch', mockFetch);
      await expect(removeFavorito('sub-1')).resolves.not.toThrow();
    });
  });
});
