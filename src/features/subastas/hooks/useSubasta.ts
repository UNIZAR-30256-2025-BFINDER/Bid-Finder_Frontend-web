import React from 'react';
import { fetchSubastaById } from '../services/subastasService';
import type { Subasta } from '../../../models/Subasta';

/**
 * Hook personalizado para recuperar y gestionar los datos de una subasta específica.
 * @param id - Identificador de la subasta.
 */
export function useSubasta(id: string | undefined) {
  const [subasta, setSubasta] = React.useState<Subasta | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadSubasta = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!id) {
          setLoading(false);
          return;
        }

        const data = await fetchSubastaById(id);
        setSubasta(data);
      } catch (err) {
        console.error(err);
        setError('No se pudo recuperar la subasta desde el backend.');
      } finally {
        setLoading(false);
      }
    };

    loadSubasta();
  }, [id]);

  return { subasta, loading, error };
}
