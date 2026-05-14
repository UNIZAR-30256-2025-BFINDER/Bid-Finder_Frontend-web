/**
 * @fileoverview Componente de tabla interactiva para moderar comentarios.
 * Incluye búsqueda local (en la página actual), paginación de servidor y borrado.
 */

import React, { useEffect, useState } from 'react';
import type { Comentario } from '../../../models/Comentario';
import { Search, Trash2, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchAllComentarios, deleteComentarioAdmin } from '../services/moderacionService';
import { Paginador } from '../../../components/ui/Paginador';
import { ConfirmModal } from '../../../components/ui/ConfirmModal';

export const ModeracionTable: React.FC = () => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [procesandoId, setProcesandoId] = useState<string | null>(null);
  const [modalConfirm, setModalConfirm] = useState<{
    subastaId: string;
    comentarioId: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    const loadComentarios = async () => {
      setLoading(true);
      try {
        const data = await fetchAllComentarios(currentPage, ITEMS_PER_PAGE, searchTerm);
        setComentarios(data.comentarios);
        setTotalItems(data.pagination.totalItems);
      } catch {
        toast.error('Error al cargar la lista de moderación');
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(loadComentarios, 400);
    return () => clearTimeout(timer);
  }, [currentPage, searchTerm]);

  /**
   * Abre el modal de confirmación de borrado.
   */
  const handleBorrar = (subastaId: string, comentarioId: string) => {
    setModalConfirm({ subastaId, comentarioId });
  };

  /**
   * Maneja el borrado real en la base de datos.
   */
  const confirmarEliminacion = async () => {
    if (!modalConfirm) return;
    const { subastaId, comentarioId } = modalConfirm;
    setIsDeleting(true);
    setModalConfirm(null);
    setProcesandoId(comentarioId);
    try {
      await deleteComentarioAdmin(subastaId, comentarioId);
      setComentarios((prev) => prev.filter((c) => c._id !== comentarioId));
      setTotalItems((prev) => prev - 1);
      toast.success('Comentario eliminado');
    } catch {
      toast.error('No se pudo eliminar el comentario');
    } finally {
      setIsDeleting(false);
      setProcesandoId(null);
    }
  };

  const cancelarEliminacion = () => {
    setModalConfirm(null);
  };

  if (loading && comentarios.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-400 animate-pulse">Cargando reportes...</span>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0D14] border border-white/5 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
      <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-white">Reportes de Usuarios</h3>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar en esta página..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 text-white text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-yellow-400/50 transition-colors w-full md:w-64"
            />
          </div>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
            <Filter size={16} />
            <span className="hidden md:inline">Ordenar: Más recientes</span>
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto relative">
        {loading && comentarios.length > 0 && (
          <div className="absolute inset-0 bg-[#0A0D14]/50 z-10 flex items-center justify-center backdrop-blur-sm">
            <span className="text-yellow-400 animate-pulse font-medium">Actualizando...</span>
          </div>
        )}
        <table className="w-full text-left border-collapse relative z-0">
          <thead className="bg-white/[0.02] text-gray-400 text-xs uppercase tracking-wider hidden md:table-header-group">
            <tr>
              <th className="px-6 py-4 font-medium">Usuario</th>
              <th className="px-6 py-4 font-medium">Comentario / Reporte</th>
              <th className="px-6 py-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {comentarios.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                  No hay reportes pendientes en esta vista.
                </td>
              </tr>
            ) : (
              comentarios.map((comentario) => {
                const procesando = procesandoId === comentario._id;
                return (
                  <tr
                    key={comentario._id}
                    className="group hover:bg-white/[0.02] transition-colors flex flex-col md:table-row"
                  >
                    <td className="px-6 py-4 border-b border-white/5 md:border-none">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 flex items-center justify-center text-yellow-500 font-bold text-xs shrink-0">
                          {(comentario.usuario_id?.nombre || 'U').charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-200">
                          {comentario.usuario_id?.nombre || 'Usuario Anónimo'}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-400 max-w-xl truncate border-b border-white/5 md:border-none">
                      {comentario.texto}
                    </td>

                    <td className="px-6 py-4 md:text-right">
                      <div className="flex items-center md:justify-end gap-2">
                        <button
                          onClick={() => handleBorrar(comentario.subasta_id, comentario._id!)}
                          disabled={procesando}
                          className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 rounded hover:bg-red-500/20 transition-all w-full md:w-auto md:ml-auto disabled:opacity-50"
                        >
                          {procesando ? (
                            <span className="animate-pulse">Borrando...</span>
                          ) : (
                            <>
                              <Trash2 size={14} />
                              Borrar
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
        <span>
          Mostrando página {currentPage} (Total: {totalItems} reportes)
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
      <ConfirmModal
        isOpen={modalConfirm !== null}
        title="Eliminar comentario"
        message="¿Estás seguro de que quieres eliminar este comentario? Esta acción no se puede deshacer."
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        variant="red"
        onConfirm={confirmarEliminacion}
        onCancel={cancelarEliminacion}
        isLoading={isDeleting}
      />
    </div>
  );
};
