/**
 * @fileoverview Servicio encargado de la comunicación asíncrona para la gestión 
 * de la comunidad y comentarios dentro de las subastas.
 */

import { Comentario } from '../../../models/Comentario';
import { authService } from '../../auth/services/authService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

/**
 * Obtiene el hilo de comentarios público de una subasta específica.
 * @param {string} subastaId - Identificador único de la subasta.
 * @returns {Promise<Comentario[]>} Array con los comentarios asociados.
 */
export const getComentarios = async (subastaId: string): Promise<Comentario[]> => {
  const response = await fetch(`${API_BASE_URL}/subastas/${subastaId}/comentarios`);
  
  if (!response.ok) {
    throw new Error('Error al cargar los comentarios');
  }

  const result = await response.json();
  return result.data;
};

/**
 * Publica un nuevo comentario en el foro de una subasta.
 * Requiere que el usuario esté autenticado.
 * @param {string} subastaId - Identificador único de la subasta.
 * @param {string} texto - Contenido del mensaje del usuario.
 * @returns {Promise<Comentario>} Objeto de comentario creado.
 * @throws {Error} Si el token es inválido, el contenido viola políticas o falla el servidor.
 */
export const postComentario = async (subastaId: string, texto: string): Promise<Comentario> => {
  const token = authService.getAccessToken();
  
  const response = await fetch(`${API_BASE_URL}/subastas/${subastaId}/comentarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    body: JSON.stringify({ texto })
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || result.error?.message || 'Error al enviar el comentario');
  }

  return result.data;
};