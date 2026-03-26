import React from 'react';

interface Props {
  descripcion: string;
}

const SubastaRawText: React.FC<Props> = ({ descripcion }) => (
  <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
    <h2 className="text-lg font-semibold mb-3">Texto bruto recuperado</h2>
    <pre className="whitespace-pre-wrap break-words text-sm text-gray-800 leading-6 font-sans">
      {descripcion}
    </pre>
  </section>
);

export default SubastaRawText;
