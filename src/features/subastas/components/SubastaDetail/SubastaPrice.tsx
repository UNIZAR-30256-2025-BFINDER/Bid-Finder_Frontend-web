/**
 * @fileoverview Componente visual para destacar el precio o valor principal del activo.
 */

import React from 'react';

interface Props {
  /** Precio ya formateado como cadena de texto */
  price: string;
  /** Etiqueta descriptiva superior */
  label: string;
}

/**
 * Renderiza un bloque tipográfico grande con el precio y su respectiva etiqueta.
 * @param {Props} props - Propiedades del componente.
 */
const SubastaPrice: React.FC<Props> = ({ price, label }) => (
  <div className="flex items-end gap-4 flex-wrap">
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl md:text-3xl font-bold text-black">{price}</p>
    </div>
  </div>
);

export default SubastaPrice;