import React from 'react';

interface Props {
  title: string;
  fields: string[];
}

const SubastaStructuredFields: React.FC<Props> = ({ title, fields }) => (
  <section className="rounded-2xl border border-dashed border-yellow-400/60 bg-yellow-50 p-5">
    <h3 className="text-base font-semibold mb-2">{title}</h3>
    <ul className="text-sm text-gray-700 space-y-2">
      {fields.map((field, idx) => (
        <li key={idx}>{field}</li>
      ))}
    </ul>
  </section>
);

export default SubastaStructuredFields;
