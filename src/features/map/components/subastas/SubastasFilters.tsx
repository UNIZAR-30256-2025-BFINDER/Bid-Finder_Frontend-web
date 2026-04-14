import React from 'react';

export interface FiltrosState {
  provincia: string;
  categoria: string;
}

interface SubastasFiltersProps {
  filtros: FiltrosState;
  onChange: (nuevosFiltros: FiltrosState) => void;
}

export const SubastasFilters: React.FC<SubastasFiltersProps> = ({ filtros, onChange }) => {
  const provincias = [
    'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 
    'Alicante', 'Málaga', 'Murcia', 'Cádiz', 
    'Baleares', 'A Coruña', 'Zaragoza', 'Asturias'
  ];

  const categorias = ['Inmueble', 'Vehículo', 'Otros'];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">
          Provincia
        </label>
        <select
          className="w-full bg-[#0b0f19] border border-white/20 text-white text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-400 p-2.5 outline-none appearance-none cursor-pointer transition-colors hover:border-white/40"
          value={filtros.provincia}
          onChange={(e) => onChange({ ...filtros, provincia: e.target.value })}
        >
          <option value="">Todas las provincias</option>
          {provincias.map(prov => (
            <option key={prov} value={prov}>{prov}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">
          Categoría
        </label>
        <select
          className="w-full bg-[#0b0f19] border border-white/20 text-white text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-400 p-2.5 outline-none appearance-none cursor-pointer transition-colors hover:border-white/40"
          value={filtros.categoria}
          onChange={(e) => onChange({ ...filtros, categoria: e.target.value })}
        >
          <option value="">Todas las categorías</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  );
};