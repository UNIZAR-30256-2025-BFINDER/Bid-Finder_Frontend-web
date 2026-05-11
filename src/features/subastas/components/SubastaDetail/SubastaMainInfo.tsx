/**
 * @fileoverview Componente visual para mostrar el título y la información principal de la subasta.
 */

import React from 'react';

interface Props {
  /** Título principal de la subasta (usualmente el resumido) */
  titulo: string;
  /** Subtítulo de la subasta (usualmente el título original o completo del BOE) */
  subtitulo: string;
  /** Identificador único de la subasta */
  id: string;
  /** Breve descripción general de la subasta */
  descripcion: string;
}

/**
 * Renderiza la cabecera principal con los datos básicos y descriptivos del activo.
 * @param {Props} props - Propiedades del componente.
 */
const SubastaMainInfo: React.FC<Props> = ({ titulo, subtitulo, descripcion }) => (
  <div>
    <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">{titulo}</h1>
    <h2 className="text-xl md:text-2xl text-gray-400 mb-5">{subtitulo}</h2>
    <p className="text-gray-600 text-sm md:text-base">{descripcion}</p>
  </div>
);

export default SubastaMainInfo;