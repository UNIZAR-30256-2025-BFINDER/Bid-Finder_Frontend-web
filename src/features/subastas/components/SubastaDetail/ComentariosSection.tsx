/**
 * @fileoverview Sección de comentarios (foro) para una subasta específica.
 * Permite a los usuarios autenticados publicar dudas y a todos los usuarios leer el hilo.
 */

import React, { useEffect, useState } from 'react';
import { Comentario } from '../../../../models/Comentario';
import { Trash2 } from 'lucide-react';
import {
  getComentarios,
  postComentario,
  deleteComentario,
} from '../../services/comentariosService';
import { authService } from '../../../auth/services/authService';
import { Button } from '../../../../components/ui/Button';

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
  const [error, setError] = useState<string | null>(null);
  const [eliminandoId, setEliminandoId] = useState<string | null>(null);

  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();
  const isAdmin = currentUser?.rol === 'admin';

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const data = await getComentarios(subastaId);
        setComentarios(data);
      } catch {
        setError('No se pudieron cargar los comentarios.');
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
    setError(null);

    try {
      const nuevoComentario = await postComentario(subastaId, nuevoTexto);
      setComentarios((prev) => [nuevoComentario, ...prev]);
      setNuevoTexto('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Error al publicar el comentario');
      }
    } finally {
      setEnviando(false);
    }
  };

  /**
   * Gestiona el borrado del comentario.
   */
  const handleDelete = async (comentarioId: string) => {
    if (!confirm('¿Eliminar este comentario permanentemente?')) return;
    setEliminandoId(comentarioId);
    try {
      await deleteComentario(subastaId, comentarioId);
      setComentarios((prev) => prev.filter((c) => c._id !== comentarioId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
    } finally {
      setEliminandoId(null);
    }
  };

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

  /**
   * Determina si el usuario actual puede eliminar un comentario.
   */
  const puedeEliminar = (comentario: Comentario): boolean => {
    if (!isAuthenticated) return false;
    // Admin puede eliminar cualquier comentario
    if (isAdmin) return true;
    // Usuario normal solo puede eliminar sus propios comentarios
    return comentario.usuario_id?._id === currentUser?._id;
  };

  return (
    <div className="mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 text-black">
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
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
            const puedeBorrar = puedeEliminar(comentario);
            return (
              <div
                key={comentario._id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-100"
              >
                <div className="flex justify-between items-center mb-2">
                  {currentUser?._id === comentario.usuario_id._id ? (
                    <>
                      {/* Izquierda: botón de eliminar + fecha */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleDelete(comentario._id!)}
                          disabled={eliminandoId === comentario._id}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title="Eliminar comentario"
                        >
                          {eliminandoId === comentario._id ? (
                            <span className="text-xs">...</span>
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                        <span className="text-xs text-gray-400">
                          {formatDate(comentario.createdAt)}
                        </span>
                      </div>
                      {/* Derecha: nombre */}
                      <span className="font-semibold text-blue-900">
                        {comentario.usuario_id?.nombre || 'Usuario Anónimo'}
                      </span>
                    </>
                  ) : (
                    <>
                      {/* Sin permisos: nombre a la izquierda, fecha a la derecha */}
                      <span className="font-semibold text-blue-900">
                        {comentario.usuario_id?.nombre || 'Usuario Anónimo'}
                      </span>
                      <div className="flex items-center gap-3">
                        {puedeBorrar && (
                          <button
                            onClick={() => handleDelete(comentario._id!)}
                            disabled={eliminandoId === comentario._id}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            title="Eliminar comentario"
                          >
                            {eliminandoId === comentario._id ? (
                              <span className="text-xs">...</span>
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>
                        )}
                        <span className="text-xs text-gray-400">
                          {formatDate(comentario.createdAt)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{comentario.texto}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
