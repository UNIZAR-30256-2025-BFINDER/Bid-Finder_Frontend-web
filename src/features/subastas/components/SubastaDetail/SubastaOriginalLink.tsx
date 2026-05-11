/**
 * @fileoverview Botón o enlace externo para navegar al documento oficial.
 */

import React from 'react';

interface Props {
  /** URL de destino del documento oficial o página del BOE */
  url: string;
  /** Texto a mostrar en el botón */
  text: string;
}

/**
 * Renderiza un enlace estilizado como botón que fuerza la apertura en una nueva pestaña
 * garantizando la seguridad con 'noopener noreferrer'.
 * @param {Props} props - Propiedades del componente.
 */
const SubastaOriginalLink: React.FC<Props> = ({ url, text }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center rounded-lg bg-[#0a1020] text-white px-4 py-3 text-sm font-semibold hover:bg-[#111a33] transition-colors"
  >
    {text}
  </a>
);

export default SubastaOriginalLink;