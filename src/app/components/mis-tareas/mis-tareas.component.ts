import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TareaService } from '../../services/tarea';
import { Tarea } from '../../models/tarea';

@Component({
  selector: 'app-mis-tareas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-tareas.component.html',
  styleUrls: ['./mis-tareas.component.css']
})
export class MisTareasComponent implements OnInit {

  tareas: Tarea[] = [];
  cargando = false;
  error = '';

  form: Partial<Tarea> = {
    titulo: '',
    descripcion: ''
  };

  editando: Tarea | null = null;

  constructor(private tareaService: TareaService) {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas() {
    this.cargando = true;
    this.tareaService.obtenerTareas().subscribe({
      next: (data) => {
        this.tareas = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar las tareas';
        this.cargando = false;
      }
    });
  }

  guardar() {
    if (this.editando) {
      this.tareaService.actualizarTarea(this.editando._id!, this.form).subscribe(() => {
        this.cargarTareas();
        this.cancelar();
      });
    } else {
      this.tareaService.crearTarea(this.form).subscribe((t) => {
        this.tareas.push(t);
        this.form = { titulo: '', descripcion: '' };
      });
    }
  }

  editar(tarea: Tarea) {
    this.editando = tarea;
    this.form = {
      titulo: tarea.titulo,
      descripcion: tarea.descripcion
    };
  }

  cancelar() {
    this.editando = null;
    this.form = { titulo: '', descripcion: '' };
  }

  eliminar(id: string) {
    if (confirm('¿Eliminar tarea?')) {
      this.tareaService.eliminarTarea(id).subscribe(() => {
        this.tareas = this.tareas.filter(t => t._id !== id);
      });
    }
  }
}
