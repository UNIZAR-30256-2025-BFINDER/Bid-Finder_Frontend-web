import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchSubastas, fetchSubastaById } from './subastasService';

describe('subastasService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetchSubastas mapea correctamente un array de subastas del backend', async () => {
    const mockBackendData = {
      data: [
        {
          id: '123',
          titulo: 'Test BOE',
          texto: 'Texto crudo',
          urlPdf: '/pdf123',
          categoria: 'Vehiculo',
        },
      ],
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockBackendData,
    });

    const result = await fetchSubastas();
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('123');
    expect(result[0].type).toBe('car');
  });

  it('fetchSubastaById devuelve null si el servidor responde con 404', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    const result = await fetchSubastaById('not-found-id');
    expect(result).toBeNull();
  });
});