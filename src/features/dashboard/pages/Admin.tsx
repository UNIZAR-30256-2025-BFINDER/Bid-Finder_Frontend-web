/**
 * @fileoverview Página principal del panel de administración.
 * Gestiona el layout y la navegación entre las distintas vistas de administración.
 */

import React, { useState } from 'react';
import { DashboardNavbar } from '../../map/layout/DashboardNavbar';
import { BarChart2, Users, ShieldAlert } from 'lucide-react';
import { DashboardView } from '../components/DashboardView';
import { UsersTable } from '../components/UsersTable';
import { ModeracionTable } from '../components/ModeracionTable';

type AdminTab = 'dashboard' | 'usuarios' | 'moderacion';

export const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col">
      <DashboardNavbar showSearchAndFilters={false} />

      <div className="flex flex-1 overflow-hidden">
        {/* MENÚ LATERAL */}
        <aside className="hidden md:flex flex-col w-32 py-10 items-center gap-10 shrink-0 border-r border-white/5 bg-[#050816]">
          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div
              className={`p-4 rounded-full transition-all ${activeTab === 'dashboard' ? 'bg-yellow-400/10 text-yellow-400' : 'bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white'}`}
            >
              <BarChart2 size={26} strokeWidth={1.5} />
            </div>
            <span
              className={`text-sm font-semibold transition-colors ${activeTab === 'dashboard' ? 'text-yellow-400' : 'text-gray-400 group-hover:text-white'}`}
            >
              Dashboard
            </span>
          </div>

          <div
            onClick={() => setActiveTab('usuarios')}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div
              className={`p-4 rounded-full transition-all ${activeTab === 'usuarios' ? 'bg-yellow-400/10 text-yellow-400' : 'bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white'}`}
            >
              <Users size={26} strokeWidth={1.5} />
            </div>
            <span
              className={`text-sm font-semibold transition-colors ${activeTab === 'usuarios' ? 'text-yellow-400' : 'text-gray-400 group-hover:text-white'}`}
            >
              Usuarios
            </span>
          </div>

          <div
            onClick={() => setActiveTab('moderacion')}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div
              className={`p-4 rounded-full transition-all ${activeTab === 'moderacion' ? 'bg-yellow-400/10 text-yellow-400' : 'bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white'}`}
            >
              <ShieldAlert size={26} strokeWidth={1.5} />
            </div>
            <span
              className={`text-sm font-semibold transition-colors ${activeTab === 'moderacion' ? 'text-yellow-400' : 'text-gray-400 group-hover:text-white'}`}
            >
              Moderación
            </span>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 px-5 py-8 md:px-12 md:py-10 max-w-6xl overflow-y-auto custom-scrollbar">
          {activeTab === 'dashboard' && <DashboardView />}

          {activeTab === 'usuarios' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
              <UsersTable />
            </div>
          )}

          {activeTab === 'moderacion' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold mb-4">Panel de Moderación</h2>
              <ModeracionTable />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
