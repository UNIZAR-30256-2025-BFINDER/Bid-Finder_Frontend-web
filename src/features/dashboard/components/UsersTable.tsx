/**
 * @fileoverview Componente de tabla interactiva para supervisar usuarios.
 * Incluye búsqueda local (en la página actual) y paginación de servidor.
 */

// src/features/admin/components/AdminUsersTable.tsx
import React, { useEffect, useState, useMemo } from 'react';
import type { Usuario } from '../../../models/Usuario';
import { Search, Filter, UserCheck, UserX, Shield, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchAllUsers } from '../services/userService';
import { Paginador } from '../../../components/ui/Paginador';

export const UsersTable: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [metrics, setMetrics] = useState({
    globalTotal: 0,
    globalAdmins: 0,
    filteredTotal: 0,
    filteredAdmins: 0,
  });
  const [procesandoId, setProcesandoId] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    const loadUsuarios = async () => {
      setLoading(true);
      try {
        const data = await fetchAllUsers(currentPage, ITEMS_PER_PAGE, searchTerm);
        setUsuarios(data.usuarios);
        setTotalItems(data.pagination.totalItems);
        setMetrics(data.metrics);
      } catch {
        toast.error('Error al cargar la lista de usuarios');
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(loadUsuarios, 400);
    return () => clearTimeout(timer);
  }, [currentPage, searchTerm]); // ← searchTerm es dependencia

  if (loading && usuarios.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-400 animate-pulse">Cargando usuarios...</span>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0D14] border border-white/5 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border-b border-white/5">
        <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-yellow-400/10 rounded-full">
            <Users className="text-yellow-400" size={24} />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total usuarios</p>
            <p className="text-2xl font-bold text-white">{metrics.globalTotal}</p>
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-400/10 rounded-full">
            <Shield className="text-blue-400" size={24} />
          </div>
          <div>
            <p className="text-gray-400 text-sm">{'Administradores'}</p>
            <p className="text-2xl font-bold text-white">{metrics.globalAdmins}</p>
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-yellow-400/10 rounded-full">
            <Users className="text-yellow-400" size={24} />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Usuarios filtrados</p>
            <p className="text-2xl font-bold text-white">{metrics.filteredTotal}</p>
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-400/10 rounded-full">
            <Shield className="text-blue-400" size={24} />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Administradores filtrados</p>
            <p className="text-2xl font-bold text-white">{metrics.filteredAdmins}</p>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-white">Gestión de Usuarios</h3>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 text-white text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-yellow-400/50 transition-colors w-full md:w-80"
            />
          </div>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
            <Filter size={16} />
            <span className="hidden md:inline">Filtros</span>
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="w-full overflow-x-auto relative">
        {loading && usuarios.length > 0 && (
          <div className="absolute inset-0 bg-[#0A0D14]/50 z-10 flex items-center justify-center backdrop-blur-sm">
            <span className="text-yellow-400 animate-pulse font-medium">Actualizando...</span>
          </div>
        )}
        <table className="w-full text-left border-collapse relative z-0">
          <thead className="bg-white/[0.02] text-gray-400 text-xs uppercase tracking-wider hidden md:table-header-group text-center">
            <tr>
              <th className="px-6 py-4 font-medium">Usuario</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Favoritos</th>
              <th className="px-6 py-4 font-medium">Comentarios</th>
              <th className="px-6 py-4 font-medium">Rol</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  No hay usuarios que coincidan con la búsqueda.
                </td>
              </tr>
            ) : (
              usuarios.map((usuario) => {
                const procesando = procesandoId === usuario._id;
                return (
                  <tr
                    key={usuario._id}
                    className="group hover:bg-white/[0.02] transition-colors flex flex-col md:table-row"
                  >
                    <td className="px-6 py-4 border-b border-white/5 md:border-none">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 flex items-center justify-center text-yellow-500 font-bold text-xs">
                          {usuario.nombre.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-200">{usuario.nombre}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400 border-b border-white/5 md:border-none text-center">
                      <span className="text-sm font-medium text-gray-200">{usuario.email}</span>
                    </td>
                    <td className="px-6 py-4 border-b border-white/5 md:border-none text-center">
                      <span className="text-sm font-medium text-gray-200">
                        {usuario.numFavoritos} subastas
                      </span>
                    </td>
                    <td className="px-6 py-4 border-b border-white/5 md:border-none text-center">
                      <span className="text-sm font-medium text-gray-200">
                        {usuario.numComentarios}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-b border-white/5 md:border-none text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          usuario.rol === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {usuario.rol === 'admin' ? 'Administrador' : 'Usuario'}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Paginador */}
      <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
        <span>
          Mostrando página {currentPage} (Total: {totalItems} usuarios)
        </span>
        {totalItems > ITEMS_PER_PAGE && (
          <Paginador
            total={totalItems}
            page={currentPage}
            perPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};
