/**
 * @fileoverview Layout enrutador base.
 * Permite envolver las rutas de la aplicación en una estructura común si fuera necesario.
 */

import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * Componente contenedor principal que renderiza el contenido dinámico 
 * de React Router a través del componente Outlet.
 */
export const MainLayout: React.FC = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};