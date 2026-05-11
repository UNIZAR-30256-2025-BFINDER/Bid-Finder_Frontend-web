import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getStatsCategorias, getStatsProvincias } from './statsService';

// Mock del authService para que no intente leer de localStorage
vi.mock('../../auth/services/authService', () => ({
    authService: {
        getAccessToken: vi.fn(() => 'fake-token-123'),
    },
}));

describe('statsService', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('getStatsCategorias formatea y devuelve los datos correctamente', async () => {
        const mockResponse = {
            success: true,
            data: [{ categoria: 'Viviendas', total: 10 }],
        };

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockResponse,
        });

        const data = await getStatsCategorias();
        expect(data).toEqual(mockResponse.data);
        expect(globalThis.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/estadisticas/categorias'),
            expect.objectContaining({
                headers: { Authorization: 'Bearer fake-token-123' },
            })
        );
    });

    it('getStatsProvincias lanza un error si la API falla', async () => {
        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: async () => ({ message: 'No autorizado' }),
        });

        await expect(getStatsProvincias()).rejects.toThrow('No autorizado');
    });
});