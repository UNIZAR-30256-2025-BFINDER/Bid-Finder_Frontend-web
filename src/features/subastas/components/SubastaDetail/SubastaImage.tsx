/**
 * @fileoverview Componente para la visualización de la imagen principal de la subasta.
 */

import React from 'react';

interface Props {
  /** URL de la imagen principal del activo */
  src: string;
  /** Texto alternativo para accesibilidad (generalmente el título de la subasta) */
  alt: string;
}

/**
 * Renderiza la imagen destacada del activo con proporciones ajustadas para escritorio y móvil.
 */
const SubastaImage: React.FC<Props> = ({ src, alt }) => (
  <div className="overflow-hidden rounded-2xl bg-gray-100 border border-gray-200">
    <img
      src={src}
      alt={alt}
      className="w-full h-[260px] md:h-[380px] object-cover"
    />
  </div>
);

export default SubastaImage;