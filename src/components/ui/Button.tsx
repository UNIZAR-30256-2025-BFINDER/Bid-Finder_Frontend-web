/**
 * @fileoverview Componente de Botón genérico y reutilizable para toda la UI.
 */

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Estilo visual del botón ('primary', 'secondary', 'danger') */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Indica si el botón debe ocupar todo el ancho del contenedor padre */
  fullWidth?: boolean;
  /** Contenido interno del botón */
  children: React.ReactNode;
}

/**
 * Renderiza un botón estandarizado que hereda las propiedades nativas de HTML
 * combinadas con las clases de utilidad de Tailwind definidas en los estilos base.
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseClass = `btn btn-${variant}`;
  const widthClass = fullWidth ? 'w-full' : '';
  const combinedClasses = `${baseClass} ${widthClass} ${className}`.trim();

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};