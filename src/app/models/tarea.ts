export interface Tarea {
  _id?: string;
  titulo: string;
  descripcion: string;
  completada?: boolean;
  fechaCreacion?: string;
  proyecto?: string | any; // ID del proyecto o objeto proyecto poblado
}
