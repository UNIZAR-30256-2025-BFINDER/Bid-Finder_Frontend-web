import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGeolocation } from '../hooks/useGeolocation';
import { MAP_DEFAULT_CENTER } from '../components/mapConstants';

describe('useGeolocation', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      geolocation: {
        getCurrentPosition: vi.fn(),
      },
    });
  });

  it('debe devolver coordenadas cuando la geolocalización tiene éxito', async () => {
    const mockCoords = { latitude: 10, longitude: 20 };
    
    (navigator.geolocation.getCurrentPosition as Mock).mockImplementationOnce(
      (success: (pos: { coords: { latitude: number; longitude: number } }) => void) =>
        success({ coords: mockCoords })
    );

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => expect(result.current).toEqual([10, 20]));
  });

  it('debe devolver el centro por defecto si la geolocalización falla', async () => {
    (navigator.geolocation.getCurrentPosition as Mock).mockImplementationOnce(
      (
        _success: unknown, 
        error: (err: { code: number; message: string }) => void
      ) => error({ code: 1, message: 'Denied' })
    );

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => expect(result.current).toEqual(MAP_DEFAULT_CENTER));
  });
});