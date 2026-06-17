import React from 'react';
import * as catastralUrl from '../../../utils/catastralUrl';
import type { Subasta } from '../../../models/Subasta';
import type { CatastroData } from '../components/SubastaDetail/SubastaCatastroInfo';

/**
 * Hook personalizado para cargar y gestionar la información catastral de una subasta.
 * @param subasta - Datos de la subasta seleccionada.
 */
export function useCatastroInfo(subasta: Subasta | null) {
  const [catastroInfo, setCatastroInfo] = React.useState<CatastroData | null>(null);
  const [loadingCatastro, setLoadingCatastro] = React.useState(false);
  const [catastroError, setCatastroError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!subasta) {
      setCatastroInfo(null);
      setCatastroError(null);
      return;
    }

    const ref = catastralUrl.CatastralRef.fromSubasta(subasta);
    if (!ref) {
      setCatastroInfo(null);
      setCatastroError(
        'Esta subasta no dispone de una referencia catastral válida de 20 caracteres.',
      );
      return;
    }

    const loadCatastroInfo = async () => {
      setLoadingCatastro(true);
      setCatastroError(null);
      try {
        const response = await fetch(`${catastralUrl.API_BASE_URL}/catastro/info/${ref.getFull()}`);
        if (response.ok) {
          const data = await response.json();
          setCatastroInfo(data);
        } else {
          setCatastroError('No se pudo establecer conexión con los servicios del Catastro.');
        }
      } catch (err) {
        console.warn('Error loading extended catastral info:', err);
        setCatastroError('Error de red al intentar conectar con la Sede del Catastro.');
      } finally {
        setLoadingCatastro(false);
      }
    };

    loadCatastroInfo();
  }, [subasta]);

  return { catastroInfo, loadingCatastro, catastroError };
}
