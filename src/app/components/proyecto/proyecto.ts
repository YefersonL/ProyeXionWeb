import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../../services/proyecto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { TareaService } from '../../services/tarea';

@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  proyectos: any[] = [];
  proyectoSeleccionado: any = null;
  modo: 'lista' | 'crear' | 'editar' = 'lista';
  tareasProyecto: any[] = [];

  proyectoForm: any = {
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    estado: 'Activo'
  };

  // Estado del sidebar (para móviles)
  sidebarCollapsed = true;

  constructor(
    private proyectoService: ProyectoService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private tareaService: TareaService
  ) { }

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      if (url[1] && url[1].path === 'crear') {
        this.modo = 'crear';
        this.resetForm();
      } else if (url[1] && url[1].path === 'editar') {
        this.modo = 'editar';
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.cargarProyectoParaEditar(id);
        }
      } else {
        this.modo = 'lista';
        this.cargarProyectos();
      }
    });
  }

  resetForm() {
    this.proyectoForm = {
      nombre: '',
      descripcion: '',
      fechaInicio: new Date().toISOString().split('T')[0],
      estado: 'Activo'
    };
  }

  cargarProyectoParaEditar(id: string) {
    this.proyectoService.obtenerProyecto(id).subscribe(
      (proyecto) => {
        this.proyectoSeleccionado = proyecto;
        this.proyectoForm = { ...proyecto };
        // Formatear fecha para input date
        if (this.proyectoForm.fechaInicio) {
          this.proyectoForm.fechaInicio = new Date(this.proyectoForm.fechaInicio).toISOString().split('T')[0];
        }
        // Cargar tareas asociadas a este proyecto
        this.cargarTareasProyecto(id);
      },
      (error) => console.error("Error cargando proyecto", error)
    );
  }

  cargarTareasProyecto(proyectoId: string) {
    this.tareaService.obtenerTareas().subscribe(
      (tareas) => {
        // Filtrar tareas que pertenecen a este proyecto
        this.tareasProyecto = tareas.filter((t: any) => t.proyecto?._id === proyectoId);
      },
      (error) => console.error("Error cargando tareas", error)
    );
  }

  // Cargar todos los proyectos
  cargarProyectos(): void {
    this.proyectoService.obtenerProyectos().subscribe(
      (proyectos) => {
        this.proyectos = proyectos;
      },
      (error) => {
        console.error("Error cargando proyectos", error);
      }
    );
  }

  // Crear un nuevo proyecto
  crearProyecto(): void {
    this.proyectoService.crearProyecto(this.proyectoForm).subscribe(
      () => {
        this.router.navigate(['/proyectos']);
      },
      (error) => {
        console.error("Error creando proyecto", error);
      }
    );
  }

  // Actualizar un proyecto
  actualizarProyecto(): void {
    if (this.proyectoSeleccionado) {
      this.proyectoService
        .actualizarProyecto(this.proyectoSeleccionado._id, this.proyectoForm)
        .subscribe(
          () => {
            this.router.navigate(['/proyectos']);
          },
          (error) => {
            console.error("Error actualizando proyecto", error);
          }
        );
    }
  }

  cancelar() {
    this.router.navigate(['/proyectos']);
  }

  // Eliminar un proyecto
  eliminarProyecto(id: string): void {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      this.proyectoService.eliminarProyecto(id).subscribe(
        () => {
          this.cargarProyectos(); // Recarga la lista de proyectos después de eliminar
        },
        (error) => {
          console.error("Error eliminando proyecto", error);
        }
      );
    }
  }

  // Método para alternar el estado de la barra lateral
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
