export interface Usuario {
  _id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'user';
  numFavoritos: number;
  numComentarios: number;
}
