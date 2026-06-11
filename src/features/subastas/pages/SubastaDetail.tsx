/**
 * @fileoverview Página de detalle de una subasta específica.
 * Orquesta la recuperación de datos desde el backend y ensambla los diferentes
 * bloques de información: mapa local, análisis de IA, datos estructurados y comentarios.
 * Soporta multi-lote: muestra un selector de lotes cuando el anuncio contiene más de uno.
 */

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSubasta } from '../hooks/useSubasta';
import { useCatastroInfo } from '../hooks/useCatastroInfo';

import SubastaLoading from '../components/SubastaDetail/SubastaLoading';
import SubastaError from '../components/SubastaDetail/SubastaError';
import SubastaNotFound from '../components/SubastaDetail/SubastaNotFound';
import SubastaMainInfo from '../components/SubastaDetail/SubastaMainInfo';
import SubastaOriginalLink from '../components/SubastaDetail/SubastaOriginalLink';
import SubastaDescription from '../components/SubastaDetail/SubastaDescription';
import SubastaStructuredFields from '../components/SubastaDetail/SubastaStructuredFields';
import SubastaIAInfo from '../components/SubastaDetail/SubastaIAInfo';
import * as catastralUrl from '../../../utils/catastralUrl';
import { SubastaCatastroInfo } from '../components/SubastaDetail/SubastaCatastroInfo';
import SubastaImage from '../components/SubastaDetail/SubastaImage';
import SubastaLocationMap from '../components/SubastaDetail/SubastaLocationMap';
import SubastaOriginalText from '../components/SubastaDetail/SubastaRawText';
import { DashboardNavbar } from '../../map/layout/DashboardNavbar';
import { FavoriteButton } from '../components/SubastaDetail/FavoriteButton';
import { ComentariosSection } from '../components/SubastaDetail/ComentariosSection';
import { authService } from '../../auth/services/authService';
import { ArrowLeft, ChevronDown, ChevronUp, Layers } from 'lucide-react';

/**
 * Componente principal de la vista de detalle de la subasta.
 */
export const SubastaDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showLoteSelector, setShowLoteSelector] = React.useState(false);

  const isAuthenticated = authService.isAuthenticated();

  const { subasta, loading, error } = useSubasta(id);
  const { catastroInfo, loadingCatastro, catastroError } = useCatastroInfo(subasta);

  /** Funciones de utilidades para la interfaz de detalle */
  const formatPrice = (value?: number | null) => {
    if (value === null || value === undefined) return 'No disponible';
    return `${value.toLocaleString('es-ES')} €`;
  };

  const formatPercentage = (value?: number | null) => {
    if (value === null || value === undefined) return 'No disponible';
    return `${value.toLocaleString('es-ES')}%`;
  };

  if (loading) return <SubastaLoading />;
  if (error) return <SubastaError error={error} />;
  if (!subasta) return <SubastaNotFound id={id!} />;
  const catastralRef = catastralUrl.CatastralRef.fromSubasta(subasta);

  const riesgoContent = subasta.riesgo_legal
    ? `Nivel: ${subasta.riesgo_legal}\nOcupantes: ${subasta.ocupantes || 'Desconocido'}\nCargas Previas: ${subasta.cargas_previas || 'No constan cargas'}`
    : 'No hay datos de riesgo extraídos para esta subasta.';

  const oportunidadContent = `Nivel de oportunidad: ${subasta.nivel_oportunidad || 'No disponible'
    }\nDiferencia vs tasación: ${formatPercentage(subasta.diferencia_porcentual_oportunidad)}`;

  const hasMultipleLotes = (subasta.total_lotes ?? 1) > 1;
  const allLotes = subasta.all_lotes || [];

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col">
      <DashboardNavbar showSearchAndFilters={false} />

      <div className="flex-1 px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 mb-6 transition-colors font-medium cursor-pointer group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Volver al mapa</span>
          </button>

          {/* Alerta/Botonera de lotes si hay más de uno */}
          {hasMultipleLotes && (
            <div className="mb-6 rounded-xl border border-yellow-500/20 bg-yellow-950/10 backdrop-blur-md p-5 transition-all duration-300 hover:border-yellow-500/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-yellow-500/10 text-yellow-400">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-white">Lote con Múltiples Subastas</h4>
                    <p className="text-sm text-slate-300 mt-1">
                      Este lote contiene <span className="font-semibold text-yellow-400">{subasta.total_lotes} subastas</span> individuales. Estás viendo la <span className="font-semibold text-yellow-400">Subasta {subasta.numero_lote}</span>.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLoteSelector(!showLoteSelector)}
                  className="flex items-center gap-2 self-start sm:self-center px-4 py-2 rounded-lg text-sm font-semibold bg-white/10 hover:bg-white/15 text-white hover:text-yellow-400 border border-white/5 transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>{showLoteSelector ? 'Ocultar otras subastas' : 'Ver todas las subastas'}</span>
                  {showLoteSelector ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {showLoteSelector && (
                <div className="mt-5 pt-4 border-t border-slate-800/60 animate-fadeIn">
                  <p className="text-sm text-slate-300 mb-4 font-medium">
                    Haz clic en cualquiera de las siguientes subastas para ver sus detalles individuales:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {allLotes.map((lote) => {
                      const loteId = `${subasta.anuncio_id}__L${lote.numero_lote}`;
                      const isActive = subasta.numero_lote === lote.numero_lote;
                      return (
                        <button
                          key={lote.numero_lote}
                          onClick={() => !isActive && navigate(`/subastas/${loteId}`)}
                          disabled={isActive}
                          className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${isActive
                            ? 'bg-yellow-500/10 border-yellow-500/30 text-white font-medium cursor-default ring-1 ring-yellow-500/20'
                            : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700 hover:text-yellow-400 cursor-pointer'
                            }`}
                        >
                          <div className="flex justify-between items-center mb-1.5">
                            <span className={`font-semibold ${isActive ? 'text-yellow-400' : 'text-slate-200'}`}>
                              Subasta {lote.numero_lote}
                            </span>
                            {lote.precio_salida != null && (
                              <span className="font-mono text-slate-300 font-semibold">
                                {lote.precio_salida.toLocaleString('es-ES')} €
                              </span>
                            )}
                          </div>
                          <p className="truncate text-slate-400 text-xs mt-1">
                            {lote.titulo_resumido || 'Sin título específico'}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="bg-white text-black rounded-2xl shadow-2xl overflow-hidden p-4 md:p-6 lg:p-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-8">
                <SubastaImage
                  src={catastralRef ? catastralUrl.buildCatastralFacadeUrl(catastralRef.getFull()) : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200"}
                  alt={subasta.titulo}
                />

                <SubastaLocationMap
                  lat={subasta.lat}
                  lng={subasta.lng}
                  direccion={subasta.direccion}
                  hasLocation={subasta.hasLocation}
                  type={subasta.type}
                  viabilidad={subasta.viabilidad}
                />

                <SubastaIAInfo
                  blocks={[
                    { title: 'Oportunidad calculada', content: oportunidadContent },
                    { title: 'Advertencias Jurídicas (IA)', content: riesgoContent },
                    { title: 'Resumen IA', content: subasta.descripcion },
                  ]}
                />

                <SubastaOriginalText descripcion={subasta.textoBruto || ''} />
              </div>

              <aside className="xl:col-span-1 space-y-6">
                <SubastaMainInfo
                  titulo={subasta.titulo_resumido || subasta.titulo}
                  subtitulo={subasta.titulo}
                  id={subasta.id}
                  descripcion={
                    hasMultipleLotes
                      ? `Subasta ${subasta.numero_lote} de ${subasta.total_lotes} — Lote ${subasta.anuncio_id}`
                      : `Subasta ID ${subasta.id}`
                  }
                  fechaFinalizacion={subasta.fechaFinalizacion}
                />

                {/* Panel de Precios e Inversión */}
                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 space-y-4 text-black">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Precio de salida</p>
                      <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{formatPrice(subasta.precioSalida)}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Valor de Tasación</p>
                      <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{formatPrice(subasta.valorTasacion)}</p>
                    </div>
                  </div>

                  {subasta.diferencia_porcentual_oportunidad !== null && (
                    <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Descuento Estimado</span>
                      <span className="text-sm font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-200/50">
                        {subasta.diferencia_porcentual_oportunidad}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Niveles de Viabilidad y Riesgo */}
                <div className="flex flex-col gap-3 text-black">
                  <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <span className="text-sm font-medium text-gray-600">Viabilidad de la Inversión</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${subasta.viabilidad === 'green'
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : subasta.viabilidad === 'yellow'
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                      {subasta.viabilidad === 'green' ? '🟢 Alta' : subasta.viabilidad === 'yellow' ? '🟡 Media' : '🔴 Baja'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <span className="text-sm font-medium text-gray-600">Riesgo Legal (IA)</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${subasta.riesgo_legal === 'BAJO'
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : subasta.riesgo_legal === 'MEDIO'
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        : subasta.riesgo_legal === 'ALTO'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}>
                      {subasta.riesgo_legal ? `${subasta.riesgo_legal === 'BAJO' ? '🟢' : subasta.riesgo_legal === 'MEDIO' ? '🟡' : '🔴'} ${subasta.riesgo_legal}` : 'Desconocido'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 items-center flex-wrap">
                  <SubastaOriginalLink url={subasta.urlPdf || ''} text="Ver anuncio original" />
                  {catastralRef && (
                    <>
                      <SubastaOriginalLink
                        url={catastralUrl.buildCatastralUrl(catastralRef.getFull())}
                        text="Ver Ficha Catastral"
                      />
                      <SubastaOriginalLink
                        url={catastralUrl.buildCatastralMapUrl(catastralRef.getFull())}
                        text="Mapa Catastral"
                      />
                    </>
                  )}
                  {isAuthenticated && <FavoriteButton subastaId={subasta.id} />}
                </div>

                <SubastaDescription
                  descripcion={subasta.descripcion}
                  title="Descripción de la oferta"
                />

                <SubastaStructuredFields
                  title="Datos extraídos por IA"
                  type={subasta.type}
                  cargas_previas={subasta.cargas_previas}
                  ocupantes={subasta.ocupantes}
                  riesgo_legal={subasta.riesgo_legal}
                  fields={[
                    `• Dirección: ${subasta.direccion || 'No especificada'}`,
                    `• Ref. Catastral: ${subasta.referenciaCatastral || 'No especificada'}`,
                    `• Valor Tasación: ${formatPrice(subasta.valorTasacion)}`,
                    `• Nivel de oportunidad: ${subasta.nivel_oportunidad || 'No disponible'}`,
                    `• Diferencia vs tasación: ${formatPercentage(
                      subasta.diferencia_porcentual_oportunidad,
                    )}`,
                  ]}
                />

                <SubastaCatastroInfo
                  data={catastroInfo}
                  loading={loadingCatastro}
                  error={catastroError}
                  imageUrl={catastralRef ? catastralUrl.buildCatastralImageUrl(catastralRef.getFull()) : null}
                  satelliteUrl={catastralRef ? catastralUrl.buildCatastralSatelliteUrl(catastralRef.getFull()) : null}
                  facadeUrl={catastralRef ? catastralUrl.buildCatastralFacadeUrl(catastralRef.getFull()) : null}
                />
              </aside>
            </div>

            {!isAuthenticated && (
              <div className="mt-8 p-6 rounded-xl border border-yellow-400/30 bg-yellow-400/5 text-center">
                <p className="text-base font-semibold text-gray-900">
                  Regístrate para guardar subastas y comentar
                </p>
                <div className="mt-4 flex justify-center gap-4">
                  <Link
                    to="/register"
                    className="px-5 py-2.5 bg-yellow-400 text-black text-xs font-bold rounded-lg hover:bg-yellow-300 transition-colors"
                  >
                    Registrarse
                  </Link>
                  <Link
                    to="/login"
                    className="px-5 py-2.5 border border-gray-400 text-gray-900 text-xs font-bold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Iniciar sesión
                  </Link>
                </div>
              </div>
            )}

            <ComentariosSection subastaId={subasta.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubastaDetail;
