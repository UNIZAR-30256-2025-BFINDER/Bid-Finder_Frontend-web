/**
 * @fileoverview Sección de comentarios (foro) para una subasta específica.
 * Permite a los usuarios autenticados publicar dudas y a todos los usuarios leer el hilo.
 */

import React, { useEffect, useState } from 'react';
import { Comentario } from '../../../../models/Comentario';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  getComentarios,
  postComentario,
  deleteComentario,
} from '../../services/comentariosService';
import { authService } from '../../../auth/services/authService';
import { Button } from '../../../../components/ui/Button';
import { ConfirmModal } from '../../../../components/ui/ConfirmModal';

interface ComentariosSectionProps {
  /** Identificador único de la subasta a la que pertenecen los comentarios */
  subastaId: string;
}

/**
 * Renderiza el listado de comentarios y el formulario de inserción.
 * Gestiona sus propios estados de carga, error y envío.
 */
export const ComentariosSection: React.FC<ComentariosSectionProps> = ({ subastaId }) => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [nuevoTexto, setNuevoTexto] = useState('');
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);

  const [eliminandoId, setEliminandoId] = useState<string | null>(null);
  const [modalConfirm, setModalConfirm] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();
  const isAdmin = currentUser?.rol === 'admin';

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const data = await getComentarios(subastaId);
        setComentarios(data);
      } catch {
        toast.error('No se pudieron cargar los comentarios.');
      } finally {
        setLoading(false);
      }
    };
    fetchComentarios();
  }, [subastaId]);

  /**
   * Gestiona el envío del formulario para crear un nuevo comentario.
   */
  const handleEnviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoTexto.trim()) return;

    setEnviando(true);

    try {
      const nuevoComentario = await postComentario(subastaId, nuevoTexto);
      setComentarios((prev) => [nuevoComentario, ...prev]);
      setNuevoTexto('');
      toast.success('Comentario publicado');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al publicar el comentario';
      toast.error(message);
    } finally {
      setEnviando(false);
    }
  };

  /**
   * Maneja el borrado real en la base de datos.
   */
  const confirmarEliminacion = async () => {
    if (!modalConfirm) return;
    const comentarioId = modalConfirm;
    setModalConfirm(null);
    setIsDeleting(true);
    setEliminandoId(comentarioId);
    try {
      await deleteComentario(subastaId, comentarioId);
      setComentarios((prev) => prev.filter((c) => c._id !== comentarioId));
      toast.success('Comentario eliminado');
    } catch (err) {
      const mensaje = err instanceof Error ? err.message : 'Error al eliminar';
      toast.error(mensaje);
    } finally {
      setIsDeleting(false);
      setEliminandoId(null);
    }
  };

  const cancelarEliminacion = () => setModalConfirm(null);

  /**
   * Formatea una fecha ISO a una cadena legible.
   * @param {string} dateString - Fecha original de creación.
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 text-black relative">
      <h3 className="text-2xl font-bold mb-6 border-b pb-2">Comentarios</h3>

      <div className="mb-8">
        {isAuthenticated ? (
          <form onSubmit={handleEnviar} className="space-y-4">
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Escribe tu comentario o duda sobre esta subasta..."
              value={nuevoTexto}
              onChange={(e) => setNuevoTexto(e.target.value)}
              disabled={enviando}
            />
            <div className="flex justify-end">
              <Button type="submit" variant="primary" disabled={enviando || !nuevoTexto.trim()}>
                {enviando ? 'Enviando...' : 'Publicar comentario'}
              </Button>
            </div>
          </form>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <p className="text-gray-600 mb-4">
              Debes iniciar sesión para participar en la conversación.
            </p>
            <a href="/login">
              <Button variant="secondary">Iniciar Sesión</Button>
            </a>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {loading ? (
          <p className="text-gray-500 animate-pulse">Cargando comentarios...</p>
        ) : comentarios.length === 0 ? (
          <p className="text-gray-500 italic">
            No hay comentarios todavía. ¡Sé el primero en opinar!
          </p>
        ) : (
          comentarios.map((comentario) => {
            const esMio = currentUser?._id === comentario.usuario_id._id;
            const puedeBorrar = esMio || isAdmin;

            return (
              <div
                key={comentario._id}
                className={`p-4 rounded-lg border transition-all ${
                  esMio ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 border-gray-100'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  {/* Izquierda: Nombre */}
                  <span className={`font-semibold ${esMio ? 'text-blue-700' : 'text-gray-700'}`}>
                    {esMio ? 'Yo' : comentario.usuario_id?.nombre || 'Usuario Anónimo'}
                  </span>

                  {/* Derecha: Fecha y Acciones */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">
                      {formatDate(comentario.createdAt)}
                    </span>
                    {puedeBorrar && (
                      <button
                        // En lugar de borrar directo, abrimos el modal
                        onClick={() => setModalConfirm(comentario._id!)}
                        disabled={eliminandoId === comentario._id}
                        className="text-red-400 hover:text-red-600 transition-colors p-1"
                        title="Eliminar comentario"
                      >
                        {eliminandoId === comentario._id ? (
                          <span className="text-xs animate-pulse">Borrando...</span>
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-gray-800 whitespace-pre-wrap mt-1">{comentario.texto}</p>
              </div>
            );
          })
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
