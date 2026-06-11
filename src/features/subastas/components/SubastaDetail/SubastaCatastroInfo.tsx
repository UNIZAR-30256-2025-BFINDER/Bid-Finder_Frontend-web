/**
 * @fileoverview Componente para mostrar los datos catastrales oficiales
 * recuperados en tiempo real desde la Sede Electrónica del Catastro (WMS y API).
 * Soporta alternar entre la fotografía de fachada, cartografía lineal oficial y ortofotografía aérea (PNOA).
 */

import React from 'react';
import { Loader2 } from 'lucide-react';

export interface CatastroData {
  referenciaCatastral: string;
  clase: string;
  usoPrincipal: string;
  superficieConstruida: number | null;
  superficieGrafica: number | null;
  anoConstruccion: number | null;
  direccion: string;
  participacion: string | null;
}

interface Props {
  data: CatastroData | null;
  loading: boolean;
  error?: string | null;
  imageUrl: string | null;
  satelliteUrl: string | null;
  facadeUrl: string | null;
}

export const SubastaCatastroInfo: React.FC<Props> = ({ data, loading, error, imageUrl, satelliteUrl, facadeUrl }) => {
  const [activeTab, setActiveTab] = React.useState<'facade' | 'mapa' | 'satelite'>('facade');
  const [imageErrors, setImageErrors] = React.useState<{ [key: string]: boolean }>({});

  // Si no hay fachada pero hay mapa, cambiar al mapa
  React.useEffect(() => {
    if (!facadeUrl) {
      if (imageUrl) {
        setActiveTab('mapa');
      } else if (satelliteUrl) {
        setActiveTab('satelite');
      }
    }
  }, [facadeUrl, imageUrl, satelliteUrl]);

  if (loading) {
    return (
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 text-black flex flex-col items-center justify-center min-h-[200px]">
        <Loader2 className="w-8 h-8 text-yellow-500 animate-spin mb-2" />
        <p className="text-sm font-medium text-slate-600">Consultando datos oficiales en la Sede del Catastro...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="bg-slate-50 border border-red-200/60 rounded-2xl p-6 text-black flex flex-col items-center text-center justify-center min-h-[200px] space-y-2">
        <span className="text-2xl">⚠️</span>
        <h4 className="text-sm font-bold text-slate-800">Catastro Oficial No Disponible</h4>
        <p className="text-xs text-slate-500 max-w-xs">{error}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 md:p-6 text-black space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/85 pb-4 gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Datos Oficiales del Catastro
          </h3>
        </div>
        <span className="font-mono text-xs font-semibold bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-slate-700 shadow-sm self-start sm:self-center">
          RC: {data.referenciaCatastral}
        </span>
      </div>

      {/* Grid de Atributos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {data.superficieConstruida !== null && (
          <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">
              Construido
            </div>
            <p className="text-lg font-bold text-slate-800">{data.superficieConstruida.toLocaleString('es-ES')} m²</p>
          </div>
        )}

        {data.superficieGrafica !== null && (
          <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">
              Suelo
            </div>
            <p className="text-lg font-bold text-slate-800">{data.superficieGrafica.toLocaleString('es-ES')} m²</p>
          </div>
        )}

        {data.anoConstruccion !== null && (
          <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">
              Año Const.
            </div>
            <p className="text-lg font-bold text-slate-800">{data.anoConstruccion}</p>
          </div>
        )}

        <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm hover:shadow-md transition-shadow col-span-2 sm:col-span-1">
          <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">
            Clase de Suelo
          </div>
          <p className="text-sm font-bold text-slate-800 truncate" title={data.clase}>
            {data.clase}
          </p>
        </div>

        <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm hover:shadow-md transition-shadow col-span-2">
          <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">
            Uso Principal
          </div>
          <p className="text-sm font-bold text-slate-800 truncate" title={data.usoPrincipal}>
            {data.usoPrincipal}
          </p>
        </div>

        {data.participacion && (
          <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm hover:shadow-md transition-shadow col-span-1">
            <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">
              Participación
            </div>
            <p className="text-sm font-bold text-slate-800">{data.participacion} %</p>
          </div>
        )}
      </div>

      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Dirección Catastral</span>
        <p className="text-sm font-semibold text-slate-800 mt-1">{data.direccion}</p>
      </div>

      {(imageUrl || satelliteUrl || facadeUrl) && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-800 text-sm font-bold tracking-tight">
              Visualización del Inmueble
            </span>
            <div className="flex bg-slate-200/60 p-0.5 rounded-lg text-[10px] font-bold">
              {facadeUrl && (
                <button
                  type="button"
                  onClick={() => setActiveTab('facade')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeTab === 'facade'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Fachada
                </button>
              )}
              {imageUrl && (
                <button
                  type="button"
                  onClick={() => setActiveTab('mapa')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeTab === 'mapa'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Plano
                </button>
              )}
              {satelliteUrl && (
                <button
                  type="button"
                  onClick={() => setActiveTab('satelite')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeTab === 'satelite'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Satélite
                </button>
              )}
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-white group flex justify-center items-center shadow-md min-h-[300px]">
            {imageErrors[activeTab] ? (
              <div className="flex flex-col items-center justify-center p-8 text-center space-y-3 min-h-[300px]">
                <span className="text-3xl">🖼️</span>
                <p className="text-sm font-bold text-slate-800">
                  {activeTab === 'facade' ? 'Fotografía de fachada no disponible' :
                   activeTab === 'mapa' ? 'Plano cartográfico no disponible' :
                   'Vista satelital no disponible'}
                </p>
                <p className="text-xs text-slate-500 max-w-xs">
                  La Sede Electrónica del Catastro no dispone de esta visualización para la parcela {data.referenciaCatastral}.
                </p>
              </div>
            ) : (
              <>
                {activeTab === 'facade' && facadeUrl && (
                  <>
                    <img
                      src={facadeUrl}
                      alt={`Fachada del inmueble ${data.referenciaCatastral}`}
                      className="max-h-[480px] w-full object-cover transition-transform duration-500 group-hover:scale-102"
                      loading="lazy"
                      onError={() => {
                        // Si falla la fachada principal, marcamos el error para no dejar la imagen rota
                        setImageErrors(prev => ({ ...prev, facade: true }));
                      }}
                    />
                    <div className="absolute bottom-4 right-4 bg-slate-900/85 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-1 rounded-md border border-white/10 shadow-sm pointer-events-none tracking-wide">
                      Fachada D.G. del Catastro
                    </div>
                  </>
                )}
                {activeTab === 'mapa' && imageUrl && (
                  <>
                    <img
                      src={imageUrl}
                      alt={`Plano de la parcela ${data.referenciaCatastral}`}
                      className="max-h-[480px] w-full object-contain transition-transform duration-500 group-hover:scale-102"
                      loading="lazy"
                      onError={() => {
                        setImageErrors(prev => ({ ...prev, mapa: true }));
                      }}
                    />
                    <div className="absolute bottom-4 right-4 bg-slate-900/85 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-1 rounded-md border border-white/10 shadow-sm pointer-events-none tracking-wide">
                      WMS INSPIRE de la D.G. del Catastro
                    </div>
                  </>
                )}
                {activeTab === 'satelite' && satelliteUrl && (
                  <>
                    <img
                      src={satelliteUrl}
                      alt={`Vista satélite de la parcela ${data.referenciaCatastral}`}
                      className="max-h-[480px] w-full object-cover transition-transform duration-500 group-hover:scale-102"
                      loading="lazy"
                      onError={() => {
                        setImageErrors(prev => ({ ...prev, satelite: true }));
                      }}
                    />
                    <div className="absolute bottom-4 right-4 bg-slate-900/85 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-1 rounded-md border border-white/10 shadow-sm pointer-events-none tracking-wide">
                      Ortofotonavegador PNOA © IGN
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubastaCatastroInfo;
