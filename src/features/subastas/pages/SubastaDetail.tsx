import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchSubastaById } from '../services/subastasService';
import { DashboardNavbar } from '../../map/components/DashboardNavbar';

export const SubastaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [subasta, setSubasta] = React.useState<Awaited<ReturnType<typeof fetchSubastaById>> | null>(
    null,
  );
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadSubasta = async () => {
      try {
        if (!id) {
          setLoading(false);
          return;
        }

        const data = await fetchSubastaById(id);
        setSubasta(data);
      } catch (err) {
        console.error(err);
        setError('No se pudo recuperar la subasta desde el backend.');
      } finally {
        setLoading(false);
      }
    };

    loadSubasta();
  }, [id]);

  const formatPrice = (value?: number | null) => {
    if (value === null || value === undefined) return 'No disponible';
    return `${value.toLocaleString('es-ES')} €`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex flex-col">
        <DashboardNavbar mobileView="map" onToggleMobileView={() => {}} />
        <div className="px-6 py-10">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-10 w-64 bg-white/10 rounded-lg" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 h-[420px] bg-white/10 rounded-2xl" />
                <div className="h-[420px] bg-white/10 rounded-2xl" />
              </div>
              <div className="h-64 bg-white/10 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex flex-col">
        <DashboardNavbar mobileView="map" onToggleMobileView={() => {}} />
        <div className="px-6 py-10">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl text-black p-8 shadow-2xl">
            <h1 className="text-3xl font-bold mb-4">Error al cargar la subasta</h1>
            <p className="text-gray-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!subasta) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex flex-col">
        <DashboardNavbar mobileView="map" onToggleMobileView={() => {}} />
        <div className="px-6 py-10">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl text-black p-8 shadow-2xl">
            <h1 className="text-3xl font-bold mb-4">Subasta no encontrada</h1>
            <p className="text-gray-700">
              No hemos podido encontrar la subasta con ID: <span className="font-semibold">{id}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col">
      <DashboardNavbar mobileView="map" onToggleMobileView={() => {}} />

      <div className="flex-1 px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white text-black rounded-2xl shadow-2xl overflow-hidden p-4 md:p-6 lg:p-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-8">
                <div className="overflow-hidden rounded-2xl bg-gray-100 border border-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200"
                    alt={subasta.titulo}
                    className="w-full h-[260px] md:h-[380px] object-cover"
                  />
                </div>

                <section>
                  <h2 className="text-lg md:text-xl font-semibold mb-4">Ubicación</h2>
                  <div className="rounded-2xl overflow-hidden border border-gray-200 bg-[#121723] p-3">
                    <div className="relative h-[220px] md:h-[320px] rounded-xl overflow-hidden bg-[radial-gradient(circle_at_center,_rgba(255,208,0,0.12),_transparent_30%),linear-gradient(180deg,_#1b2233_0%,_#0f1420_100%)]">
                      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-yellow-400 text-black font-bold flex items-center justify-center shadow-lg">
                            📍
                          </div>
                          <p className="text-white/80 text-sm md:text-base text-center px-4">
                            Mapa de ubicación placeholder
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                    <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">Resumen IA</p>
                    <p className="text-sm text-gray-700 leading-6">
                      Placeholder para el resumen automático generado por IA.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                    <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">Riesgos IA</p>
                    <p className="text-sm text-gray-700 leading-6">
                      Placeholder para advertencias jurídicas detectadas por IA.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                    <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
                      Recomendación IA
                    </p>
                    <p className="text-sm text-gray-700 leading-6">
                      Placeholder para la valoración automática de oportunidad.
                    </p>
                  </div>
                </section>

                <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <h2 className="text-lg font-semibold mb-3">Texto bruto recuperado</h2>
                  <pre className="whitespace-pre-wrap break-words text-sm text-gray-800 leading-6 font-sans">
                    {subasta.descripcion}
                  </pre>
                </section>
              </div>

              <aside className="xl:col-span-1 space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
                    {subasta.titulo}
                  </h1>
                  <p className="text-gray-600 text-sm md:text-base">
                    Datos recuperados desde backend · Subasta ID {subasta.id}
                  </p>
                </div>

                <div className="flex items-end gap-4 flex-wrap">
                  <div>
                    <p className="text-sm text-gray-500">Precio actual</p>
                    <p className="text-2xl md:text-3xl font-bold text-black">
                      {formatPrice(subasta.precio)}
                    </p>
                  </div>
                </div>

                <a
                  href={subasta.urlOriginal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-[#0a1020] text-white px-4 py-3 text-sm font-semibold hover:bg-[#111a33] transition-colors"
                >
                  Ver anuncio original
                </a>

                <section>
                  <h2 className="text-lg font-semibold mb-3">Descripción de la oferta</h2>
                  <p className="text-gray-700 leading-7 text-sm md:text-base">
                    {subasta.descripcion}
                  </p>
                </section>

                <section className="rounded-2xl border border-dashed border-yellow-400/60 bg-yellow-50 p-5">
                  <h3 className="text-base font-semibold mb-2">Campos estructurados IA</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Tipo de activo: pendiente de extracción</li>
                    <li>• Estado jurídico: pendiente de extracción</li>
                    <li>• Cargas detectadas: pendiente de extracción</li>
                    <li>• Fecha de cierre: pendiente de extracción</li>
                    <li>• Enlace BOE: ya disponible desde backend</li>
                  </ul>
                </section>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubastaDetail;