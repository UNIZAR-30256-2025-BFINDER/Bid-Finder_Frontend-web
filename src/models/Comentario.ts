export interface UsuarioComentario {
  _id: string;
  nombre: string;
}

export interface Comentario {
  _id: string;
  subasta_id: string;
  usuario_id: UsuarioComentario;
  texto: string;
  createdAt: string;
  updatedAt?: string;
}