
export interface Proyecto {
  id: string;         // ID del proyecto
  nombre: string;     // Nombre del proyecto
  descripcion: string; // Descripción del proyecto
  estado: string;     // Estado del proyecto (activo, inactivo, finalizado, etc.)
  fechaInicio: Date;  // Fecha de inicio del proyecto
  fechaFin: Date;     // Fecha de fin del proyecto
}
