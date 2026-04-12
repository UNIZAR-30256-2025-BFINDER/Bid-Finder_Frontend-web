import React, { JSX } from 'react';

interface Props {
  title: string;
  type?: string;
  cargas_previas?: string | null;
  ocupantes?: string | null;
  riesgo_legal?: string | null;
  fields?: string[]; 
}

const getTipoLegible = (type?: string): string => {
  if (!type) return 'no conocido';
  const mapping: Record<string, string> = {
    house: 'Vivienda',
    car: 'Vehículo',
  };
  return mapping[type] ?? 'no conocido';
};

const getColorCircle = (riesgo_legal?: string | null): JSX.Element => {
  const defaultColor = 'bg-gray-400';
  if (!riesgo_legal) {
    return (
      <span
        className={`inline-block w-3 h-3 rounded-full ${defaultColor}`}
        title="Riesgo desconocido"
      />
    );
  }

  const colorMapping: Record<string, string> = {
    alto: 'bg-red-500',
    medio: 'bg-yellow-500',
    bajo: 'bg-green-500',
  };
  const colorClass = colorMapping[riesgo_legal.toLowerCase()] || defaultColor;

  return (
    <span
      className={`inline-block w-3 h-3 rounded-full ${colorClass}`}
      title={` - "Alto": si hay ocupantes sin título o cargas previas no cancelables.
  - "Medio": si hay ocupantes con título (ej. inquilinos con contrato) o cargas asumibles.
  - "Bajo": si no hay ocupantes ni cargas, o el texto indica que está libre de cargas y ocupantes.
  - "no conocido": si no hay suficiente información para categorizar.`}
    />
  );
};

const SubastaStructuredFields: React.FC<Props> = ({
  title,
  type,
  cargas_previas,
  ocupantes,
  riesgo_legal,
  fields = [], 
}) => (
  <section className="rounded-2xl border border-dashed border-yellow-400/60 bg-yellow-50 p-5 text-black">
    <h3 className="text-base font-semibold mb-2">{title}</h3>
    <ul className="text-sm text-gray-700 space-y-2">
      <li>• Tipo de activo: {getTipoLegible(type)}</li>
      <li>• Riesgo legal detectado: {riesgo_legal || 'no conocido'} {getColorCircle(riesgo_legal)}</li>
      <li>• Ocupantes detectados: {ocupantes || 'no constan'}</li>
      <li>• Cargas detectadas: {cargas_previas || 'no constan'}</li>
      
      {fields.map((field, index) => (
        <li key={index}>{field}</li>
      ))}
      
    </ul>
  </section>
);

export default SubastaStructuredFields;