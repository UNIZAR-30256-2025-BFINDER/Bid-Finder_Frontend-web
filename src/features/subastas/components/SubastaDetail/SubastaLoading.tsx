/**
 * @fileoverview Pantalla de esqueleto para mostrar mientras
 * se recuperan los detalles de la subasta desde el backend.
 */

import React from 'react';
import { DashboardNavbar } from '../../../map/layout/DashboardNavbar';

/**
 * Renderiza una vista con marcadores de posición animados simulando la estructura
 * final de la página de detalle para mejorar la percepción de carga.
 */
const SubastaLoading: React.FC = () => (
  <div className="min-h-screen bg-[#050816] text-white flex flex-col">
    <DashboardNavbar showSearchAndFilters={false} />
    <div className="px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-64 bg-white/10 rounded-lg" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-[420px] bg-white/10 rounded-2xl" />
            <div className="h-[420px] bg-white/10 rounded-2xl" />
          </div>
          <div className="h-64 bg-white/10 rounded-2xl" />
        </div>
      </div>
    </div>
  </div>
);

export default SubastaLoading;