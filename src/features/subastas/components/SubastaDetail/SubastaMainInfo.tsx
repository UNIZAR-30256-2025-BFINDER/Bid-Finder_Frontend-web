import React from 'react';

interface Props {
  titulo: string;
  subtitulo: string;
  id: string;
  descripcion: string;
}

const SubastaMainInfo: React.FC<Props> = ({ titulo, subtitulo, descripcion }) => (
  <div>
    <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">{titulo}</h1>
    <h2 className="text-xl md:text-2xl text-gray-400 mb-5">{subtitulo}</h2>
    <p className="text-gray-600 text-sm md:text-base">{descripcion}</p>
  </div>
);

export default SubastaMainInfo;
