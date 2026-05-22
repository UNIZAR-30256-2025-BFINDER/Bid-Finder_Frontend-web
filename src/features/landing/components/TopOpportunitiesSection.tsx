/**
 * @fileoverview Sección de Top Oportunidades de la Landing Page.
 * Realiza una consulta a la API para mostrar subastas reales marcadas como alta oportunidad por la IA.
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Subasta } from '../../../models/Subasta';
import { fetchSubastas } from '../../subastas/services/subastasService';
import { SubastaCard } from '../../map/components/subastas/SubastaCard';
import { Loader2 } from 'lucide-react';

/**
 * Renderiza una cuadrícula dinámica con las 3 subastas más rentables detectadas.
 */
export const TopOpportunitiesSection: React.FC = () => {
  const [oportunidades, setOportunidades] = useState<Subasta[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarOportunidades = async () => {
      try {
        setLoading(true);
        let data = await fetchSubastas({ nivel_oportunidad: 'ALTO' });

        if (data.length === 0) {
          data = await fetchSubastas({});
        }

        setOportunidades(data.slice(0, 3));
      } catch (err) {
        console.error('Error cargando oportunidades:', err);
      } finally {
        setLoading(false);
      }
    };

    cargarOportunidades();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-8 md:px-16 bg-[#0b0f19] flex justify-center">
        <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
      </section>
    );
  }

  return (
    <section className="py-24 px-8 md:px-16 bg-[#0b0f19]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-yellow-400">
            Oportunidades destacadas de hoy
          </h2>
          <p className="text-xl text-gray-300">
            Subastas analizadas en tiempo real con mayor margen de rentabilidad detectado por
            nuestra IA.
          </p>
        </div>

        {oportunidades.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {oportunidades.map((subasta) => (
              <SubastaCard
                key={subasta.id}
                id={subasta.id}
                title={subasta.titulo_resumido || subasta.titulo}
                subtitle={subasta.descripcion}
                price={subasta.precioActual ?? subasta.precioSalida ?? 0}
                image={subasta.imagen || '/Bfinder_logo.png'}
                location={subasta.type}
                onClick={() => navigate(`/subastas/${subasta.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border border-white/10 rounded-xl bg-white/5">
            <p className="text-gray-400">
              En este momento los algoritmos están analizando el mercado. Vuelve más tarde.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
