/**
 * @fileoverview Formulario de filtros para la búsqueda avanzada de subastas.
 * Permite filtrar por provincia, categoría, rango de precios y nivel de viabilidad.
 */

import React from 'react';

/** Estructura del estado de filtros en la aplicación */
export interface FiltrosState {
  provincia: string;
  categoria: string;
  precio_min?: number;
  precio_max?: number;
  nivel_oportunidad: string;
}

interface SubastasFiltersProps {
  filtros: FiltrosState;
  /** Callback para notificar cambios en cualquier campo del filtro al componente padre */
  onChange: (nuevosFiltros: FiltrosState) => void;
}

/**
 * Componente de interfaz que renderiza los selectores e inputs de filtrado.
 */
export const SubastasFilters: React.FC<SubastasFiltersProps> = ({ filtros, onChange }) => {
  const provincias = [
    'Madrid', 'Barcelona', 'Valencia', 'Sevilla',
    'Alicante', 'Málaga', 'Murcia', 'Cádiz',
    'Baleares', 'A Coruña', 'Zaragoza', 'Asturias'
  ];

  const categorias = ['Inmueble', 'Vehículo', 'Otros'];

  return (
    <div className="flex flex-col gap-4">
      {/* Selector de Provincia */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">Provincia</label>
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

      {/* Selector de Categoría */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">Categoría</label>
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

      {/* Rango de Precios */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Mínimo (€)</label>
          <input
            type="number"
            placeholder="0"
            value={filtros.precio_min ?? ''}
            onChange={(e) =>
              onChange({
                ...filtros,
                precio_min: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full bg-[#0b0f19] border border-white/20 text-white text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-400 p-2.5 outline-none transition-colors hover:border-white/40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Máximo (€)</label>
          <input
            type="number"
            placeholder="Máx."
            value={filtros.precio_max ?? ''}
            onChange={(e) =>
              onChange({
                ...filtros,
                precio_max: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full bg-[#0b0f19] border border-white/20 text-white text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-400 p-2.5 outline-none transition-colors hover:border-white/40"
          />
        </div>
      </div>

      {/* Selector de Viabilidad */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">Nivel de Oportunidad</label>
        <select
          className="w-full bg-[#0b0f19] border border-white/20 text-white text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-400 p-2.5 outline-none appearance-none cursor-pointer transition-colors hover:border-white/40"
          value={filtros.nivel_oportunidad}
          onChange={(e) => onChange({ ...filtros, nivel_oportunidad: e.target.value })}
        >
          <option value="">Todos</option>
          <option value="ALTO">🟢 Alto</option>
          <option value="MEDIO">🟡 Medio</option>
          <option value="BAJO">🔴 Bajo</option>
        </select>
      </div>
    </div>
  );
};