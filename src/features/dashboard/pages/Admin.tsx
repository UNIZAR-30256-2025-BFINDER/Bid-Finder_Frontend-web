import React, { useEffect, useState } from 'react';
import { getSystemStatus, SystemStatus } from '../services/systemService';
import { DashboardNavbar } from '../../map/layout/DashboardNavbar';
import { BarChart2, Users, ShieldAlert, Plus, Activity, Clock } from 'lucide-react';
import CategoryPieChart from '../../../components/graphs/CategoryPieChart';  // Importa el gráfico circular

export const Admin: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await getSystemStatus();
        setStatus(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Sin registros';
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(new Date(dateString));
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col">
      <DashboardNavbar
        mobileView="map"
        onToggleMobileView={() => { }}
        showSearchAndFilters={false}
      />

      <div className="flex flex-1 overflow-hidden">

        <aside className="hidden md:flex flex-col w-32 py-10 items-center gap-10 shrink-0 border-r border-white/5 bg-[#050816]">
          <div className="flex flex-col items-center gap-3 cursor-pointer">
            <div className="bg-yellow-400/10 p-4 rounded-full text-yellow-400">
              <BarChart2 size={26} strokeWidth={1.5} />
            </div>
            <span className="text-sm font-semibold text-yellow-400">Dashboard</span>
          </div>
          <div className="flex flex-col items-center gap-3 cursor-pointer group">
            <div className="bg-white/5 p-4 rounded-full text-gray-400 group-hover:bg-white/10 group-hover:text-white transition-all">
              <Users size={26} strokeWidth={1.5} />
            </div>
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Usuarios</span>
          </div>
          <div className="flex flex-col items-center gap-3 cursor-pointer group">
            <div className="bg-white/5 p-4 rounded-full text-gray-400 group-hover:bg-white/10 group-hover:text-white transition-all">
              <ShieldAlert size={26} strokeWidth={1.5} />
            </div>
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Moderación</span>
          </div>
        </aside>

        <main className="flex-1 px-5 py-8 md:px-12 md:py-10 max-w-6xl">
          {loading ? (
            <p className="text-gray-400 animate-pulse">Cargando datos del sistema...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Tarjetas de información */}
              <div className="bg-[#0A0D14] border border-white/5 rounded-2xl p-6 flex justify-between items-center relative overflow-hidden group shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:bg-[#0d111a] transition-colors">
                <div className="z-10">
                  <h3 className="text-white text-base font-medium mb-3">Estado del Servidor</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm">Status:</span>
                    <span className="text-xl font-bold text-white flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                      {status?.estado_backend || 'DESCONOCIDO'}
                    </span>
                  </div>
                </div>
                <div className="z-10 text-emerald-500 border-[2.5px] border-emerald-500 rounded-full p-1.5 flex items-center justify-center">
                  <Activity size={22} strokeWidth={2.5} />
                </div>
              </div>

              <div className="bg-[#0A0D14] border border-white/5 rounded-2xl p-6 flex justify-between items-center relative overflow-hidden group shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:bg-[#0d111a] transition-colors">
                <div className="z-10">
                  <h3 className="text-white text-base font-medium mb-3">Subastas Procesadas</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm">Hoy:</span>
                    <span className="text-2xl font-bold text-white">{status?.ingresadasHoy || 0}</span>
                  </div>
                </div>
                <div className="z-10 text-yellow-400 border-[2.5px] border-yellow-400 rounded-full p-1.5 flex items-center justify-center">
                  <Plus size={22} strokeWidth={2.5} />
                </div>
              </div>

              <div className="bg-[#0A0D14] border border-white/5 rounded-2xl p-6 flex justify-between items-center relative overflow-hidden group shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:bg-[#0d111a] transition-colors">
                <div className="z-10">
                  <h3 className="text-white text-base font-medium mb-3">Última Ingesta</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm">Fecha:</span>
                    <span className="text-lg font-bold text-white">
                      {formatDate(status?.ultimaIngesta)}
                    </span>
                  </div>
                </div>
                <div className="z-10 text-black bg-white border-[2.5px] border-white rounded-full p-1.5 flex items-center justify-center">
                  <Clock size={22} strokeWidth={2.5} fill="currentColor" />
                </div>
              </div>

              {/* Agregamos el gráfico circular */}
              <div className="col-span-1 md:col-span-2">
                <CategoryPieChart />  {/* Aquí va el gráfico circular de distribución de categorías */}
              </div>

            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;