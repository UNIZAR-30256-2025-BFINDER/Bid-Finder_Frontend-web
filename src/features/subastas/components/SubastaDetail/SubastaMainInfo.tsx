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
  fechaFinalizacion?: string | null;
}

/**
 * Renderiza la cabecera principal con los datos básicos y descriptivos del activo.
 */
const SubastaMainInfo: React.FC<Props> = ({
  titulo,
  subtitulo,
  descripcion,
  fechaFinalizacion,
}) => {
  const isDuplicatedTitle = titulo.toLowerCase() === subtitulo.toLowerCase();

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">{titulo}</h1>
      </div>
      {!isDuplicatedTitle && (
        <h2 className="text-xl md:text-2xl text-gray-400 mb-5">{subtitulo}</h2>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-gray-600 text-sm md:text-base font-medium">{descripcion}</p>

        {fechaFinalizacion && (
          <div className="inline-flex items-center gap-2 text-sm text-yellow-500 font-semibold bg-yellow-500/10 px-3 py-1.5 rounded-lg w-fit">
            <span>Límite de pujas:</span>
            <span>
              {new Date(`${fechaFinalizacion.split('T')[0]}T12:00:00`).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubastaMainInfo;
