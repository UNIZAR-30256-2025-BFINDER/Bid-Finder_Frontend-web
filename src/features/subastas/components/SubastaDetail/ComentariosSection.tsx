import React, { useEffect, useState } from 'react';
import { Comentario } from '../../../../models/Comentario';
import { getComentarios, postComentario } from '../../services/comentariosService';
import { authService } from '../../../auth/services/authService';
import { Button } from '../../../../components/ui/Button';

interface ComentariosSectionProps {
  subastaId: string;
}

export const ComentariosSection: React.FC<ComentariosSectionProps> = ({ subastaId }) => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [nuevoTexto, setNuevoTexto] = useState('');
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = authService.isAuthenticated();

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
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
            <p className="text-gray-600 mb-4">Debes iniciar sesión para participar en la conversación.</p>
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
          <p className="text-gray-500 italic">No hay comentarios todavía. ¡Sé el primero en opinar!</p>
        ) : (
          comentarios.map((comentario) => (
            <div key={comentario._id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-blue-900">{comentario.usuario_id?.nombre || 'Usuario Anónimo'}</span>
                <span className="text-xs text-gray-400">{formatDate(comentario.createdAt)}</span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{comentario.texto}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};