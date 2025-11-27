import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../../services/proyecto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  

@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './proyecto.html',  // Ruta correcta al archivo HTML
  styleUrls: ['./proyecto.css']
})
export class ProyectoComponent implements OnInit {
  proyectos: any[] = [];
  proyectoSeleccionado: any = null;

  constructor(private proyectoService: ProyectoService) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  // Cargar todos los proyectos
  cargarProyectos(): void {
    this.proyectoService.obtenerProyectos().subscribe((proyectos) => {
      this.proyectos = proyectos;
    });
  }

  // Ver un proyecto por ID
  verProyecto(id: string): void {
    this.proyectoService.obtenerProyecto(id).subscribe((proyecto) => {
      this.proyectoSeleccionado = proyecto;
    });
  }

  // Crear un nuevo proyecto
  crearProyecto(): void {
    const nuevoProyecto = { nombre: 'Nuevo Proyecto', descripcion: 'Descripción', estado: 'Activo' };
    this.proyectoService.crearProyecto(nuevoProyecto).subscribe(() => {
      this.cargarProyectos();
    });
  }

  // Actualizar un proyecto
  actualizarProyecto(): void {
    if (this.proyectoSeleccionado) {
      this.proyectoService
        .actualizarProyecto(this.proyectoSeleccionado._id, this.proyectoSeleccionado)
        .subscribe(() => {
          this.cargarProyectos();
        });
    }
  }

  // Eliminar un proyecto
  eliminarProyecto(id: string): void {
    this.proyectoService.eliminarProyecto(id).subscribe(() => {
      this.cargarProyectos();
    });
  }
}
