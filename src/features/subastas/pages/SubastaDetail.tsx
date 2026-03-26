import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchSubastaById } from '../services/subastasService';

import SubastaLoading from '../components/SubastaDetail/SubastaLoading';
import SubastaError from '../components/SubastaDetail/SubastaError';
import SubastaNotFound from '../components/SubastaDetail/SubastaNotFound';
import SubastaMainInfo from '../components/SubastaDetail/SubastaMainInfo';
import SubastaPrice from '../components/SubastaDetail/SubastaPrice';
import SubastaOriginalLink from '../components/SubastaDetail/SubastaOriginalLink';
import SubastaDescription from '../components/SubastaDetail/SubastaDescription';
import SubastaStructuredFields from '../components/SubastaDetail/SubastaStructuredFields';
import SubastaIAInfo from '../components/SubastaDetail/SubastaIAInfo';
import SubastaImage from '../components/SubastaDetail/SubastaImage';
import SubastaLocationPlaceholder from '../components/SubastaDetail/SubastaLocationPlaceholder';
import SubastaRawText from '../components/SubastaDetail/SubastaRawText';
import { DashboardNavbar } from '../../map/layout/DashboardNavbar';

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
    return <SubastaLoading />;
  }

  if (error) {
    return <SubastaError error={error} />;
  }

  if (!subasta) {
    return <SubastaNotFound id={id} />;
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col">
      <DashboardNavbar mobileView="map" onToggleMobileView={() => {}} />
      <div className="flex-1 px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white text-black rounded-2xl shadow-2xl overflow-hidden p-4 md:p-6 lg:p-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-8">
                <SubastaImage src={"https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200"} alt={subasta.titulo} />
                <SubastaLocationPlaceholder />
                <SubastaIAInfo
                  blocks={[
                    {
                      title: 'Resumen IA',
                      content: 'Placeholder para el resumen automático generado por IA.',
                    },
                    {
                      title: 'Riesgos IA',
                      content: 'Placeholder para advertencias jurídicas detectadas por IA.',
                    },
                    {
                      title: 'Recomendación IA',
                      content: 'Placeholder para la valoración automática de oportunidad.',
                    },
                  ]}
                />
                <SubastaRawText descripcion={subasta.descripcion} />
              </div>
              <aside className="xl:col-span-1 space-y-6">
                <SubastaMainInfo
                  titulo={subasta.titulo}
                  id={subasta.id}
                  descripcion={`Datos recuperados desde backend · Subasta ID ${subasta.id}`}
                />
                <SubastaPrice
                  price={formatPrice(subasta.precio)}
                  label="Precio actual"
                />
                <SubastaOriginalLink
                  url={subasta.urlPdf|| ''}
                  text="Ver anuncio original"
                />
                <SubastaDescription
                  descripcion={subasta.descripcion}
                  title="Descripción de la oferta"
                />
                <SubastaStructuredFields
                  title="Campos estructurados IA"
                  fields={[
                    '• Tipo de activo: pendiente de extracción',
                    '• Estado jurídico: pendiente de extracción',
                    '• Cargas detectadas: pendiente de extracción',
                    '• Fecha de cierre: pendiente de extracción',
                    '• Enlace BOE: ya disponible desde backend',
                  ]}
                />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubastaDetail;