import React from 'react';


interface Props {
  descripcion: string;
  title: string;
}

const SubastaDescription: React.FC<Props> = ({ descripcion, title }) => (
  <section>
    <h2 className="text-lg font-semibold mb-3">{title}</h2>
    <p className="text-gray-700 leading-7 text-sm md:text-base">{descripcion}</p>
  </section>
);

export default SubastaDescription;
