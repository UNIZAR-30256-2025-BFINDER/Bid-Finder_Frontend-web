/**
 * @fileoverview Panel lateral genérico.
 * Usado en configuraciones de pantalla dividida que requieren un área de listado.
 */

import React from 'react';

interface SidebarProps {
  /** Título principal del panel lateral */
  title: string;
  /** Subtítulo o texto descriptivo bajo el título principal */
  description?: string;
  /** Elementos hijos a renderizar en el contenedor principal */
  children: React.ReactNode;
}

/**
 * Renderiza una barra lateral con scroll vertical independiente que ocupa
 * un 40% del ancho en pantallas grandes.
 * @param {SidebarProps} props - Propiedades del Sidebar.
 */
export const Sidebar = ({ title, description, children }: SidebarProps) => {
  return (
    <div className="w-full md:w-2/5 p-4 overflow-y-auto border-b md:border-b-0 md:border-r border-gray-200 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">{title}</h1>

      {description && <p className="text-gray-600 mb-4 text-sm md:text-base">{description}</p>}

      <div className="w-full">{children}</div>
    </div>
  );
};