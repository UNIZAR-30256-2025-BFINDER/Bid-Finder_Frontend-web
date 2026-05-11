/**
 * @fileoverview Bloque de texto para mostrar la descripción original estructurada
 * o el resumen generado por IA de la subasta.
 */

import React from 'react';

interface Props {
  /** Texto descriptivo del activo */
  descripcion: string;
  /** Título de la sección */
  title: string;
}

/**
 * Renderiza el apartado de descripción con espaciado optimizado para lectura.
 */
const SubastaDescription: React.FC<Props> = ({ descripcion, title }) => (
  <section>
    <h2 className="text-lg font-semibold mb-3">{title}</h2>
    <p className="text-gray-700 leading-7 text-sm md:text-base">{descripcion}</p>
  </section>
);

export default SubastaDescription;