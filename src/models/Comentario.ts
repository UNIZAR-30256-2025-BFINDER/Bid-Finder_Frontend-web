/**
 * @fileoverview Interfaz del modelo de dominio para los comentarios de las subastas.
 */

export interface UsuarioComentario {
  _id: string;
  nombre: string;
}

/**
 * Representa un comentario publicado por un usuario en el foro de una subasta.
 */
export interface Comentario {
  _id: string;
  subasta_id: string;
  usuario_id: UsuarioComentario;
  texto: string;
  createdAt: string;
  updatedAt?: string;
}