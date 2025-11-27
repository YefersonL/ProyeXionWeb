import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../../services/proyecto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './proyecto.component.html',  // Ruta correcta al archivo HTML
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  proyectos: any[] = [];
  proyectoSeleccionado: any = null;

  // Estado del sidebar (para móviles)
  sidebarCollapsed = true;

  constructor(private proyectoService: ProyectoService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.cargarProyectos();
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

  // Ver un proyecto por ID
  verProyecto(id: string): void {
    this.proyectoService.obtenerProyecto(id).subscribe(
      (proyecto) => {
        this.proyectoSeleccionado = proyecto;
      },
      (error) => {
        console.error("Error obteniendo proyecto", error);
      }
    );
  }

  // Crear un nuevo proyecto
  crearProyecto(): void {
    const nuevoProyecto = { nombre: 'Nuevo Proyecto', descripcion: 'Descripción', estado: 'Activo' };
    this.proyectoService.crearProyecto(nuevoProyecto).subscribe(
      () => {
        this.cargarProyectos(); // Recarga la lista de proyectos
      },
      (error) => {
        console.error("Error creando proyecto", error);
      }
    );
  }

  // Actualizar un proyecto
  actualizarProyecto(id: string): void {
    if (this.proyectoSeleccionado) {
      this.proyectoService
        .actualizarProyecto(this.proyectoSeleccionado._id, this.proyectoSeleccionado)
        .subscribe(
          () => {
            this.cargarProyectos(); // Recarga la lista de proyectos
          },
          (error) => {
            console.error("Error actualizando proyecto", error);
          }
        );
    } else {
      console.log('No hay proyecto seleccionado');
    }
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

  // ngOnDestroy ya no es necesario si no estás usando el Renderer2 para limpiar algo del DOM
  ngOnDestroy() {
    // Si no estás manipulando el DOM directamente, este método ya no es necesario
    // this.renderer.removeClass(document.body, 'bg-gradient-primary');
  }
}
