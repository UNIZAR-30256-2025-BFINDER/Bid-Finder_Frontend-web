/**
 * @fileoverview Pantalla de fallback para mostrar errores críticos durante
 * la obtención de datos de una subasta específica.
 */

import React from 'react';
import { DashboardNavbar } from '../../../map/layout/DashboardNavbar';

interface Props {
  /** Mensaje de error técnico o amigable proporcionado por el catch */
  error: string;
}

/**
 * Renderiza una vista de error manteniendo la navegación superior activa.
 * (Corregido error de TypeScript de props inexistentes en DashboardNavbar).
 */
const SubastaError: React.FC<Props> = ({ error }) => (
  <div className="min-h-screen bg-[#050816] text-white flex flex-col">
    <DashboardNavbar showSearchAndFilters={false} />
    <div className="px-6 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl text-black p-8 shadow-2xl">
        <h1 className="text-3xl font-bold mb-4">Error al cargar la subasta</h1>
        <p className="text-gray-700">{error}</p>
      </div>
    </div>
  </div>
);

export default SubastaError;