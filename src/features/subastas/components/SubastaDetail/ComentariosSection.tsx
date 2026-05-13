/**
 * @fileoverview Sección de comentarios (foro) para una subasta específica.
 * Permite a los usuarios autenticados publicar dudas y a todos los usuarios leer el hilo.
 */

import React, { useEffect, useState } from 'react';
import { Comentario } from '../../../../models/Comentario';
import { Trash2, AlertTriangle } from 'lucide-react';
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
  const [comentarioConfirmar, setComentarioConfirmar] = useState<string | null>(null);

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
   * Ejecuta el borrado real tras la confirmación del modal.
   */
  const confirmarBorrado = async () => {
    if (!comentarioConfirmar) return;
    
    const idParaBorrar = comentarioConfirmar;
    setComentarioConfirmar(null); // Cerramos el modal inmediatamente
    setEliminandoId(idParaBorrar); // Mostramos el feedback visual de carga

    try {
      await deleteComentario(subastaId, idParaBorrar);
      setComentarios((prev) => prev.filter((c) => c._id !== idParaBorrar));
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
            const esMio = currentUser?._id === comentario.usuario_id._id;
            const puedeBorrar = esMio || isAdmin;
            const estaEliminandose = eliminandoId === comentario._id;

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
                        onClick={() => setComentarioConfirmar(comentario._id!)}
                        disabled={estaEliminandose}
                        className="text-red-400 hover:text-red-600 transition-colors p-1"
                        title="Eliminar comentario"
                      >
                        {estaEliminandose ? (
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

      {comentarioConfirmar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm transform transition-all scale-100 opacity-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2 rounded-full text-red-600">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Eliminar comentario</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que quieres eliminar este comentario? Esta acción no se puede deshacer.
            </p>
            
            <div className="flex justify-end gap-3">
              <Button 
                variant="secondary" 
                onClick={() => setComentarioConfirmar(null)}
              >
                Cancelar
              </Button>
              <button
                onClick={confirmarBorrado}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-sm transition-colors"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};