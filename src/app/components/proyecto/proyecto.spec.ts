import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../../services/proyecto';
import { Router, ActivatedRoute } from '@angular/router';
import { Proyecto } from '../../models/proyectos-module';  // Asegúrate de importar el modelo Proyecto
import { DatePipe } from '@angular/common';  // Importa DatePipe desde @angular/common

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.html',
  styleUrls: ['./proyecto.css'],
  providers: [DatePipe]  // Añadimos DatePipe a los providers de este componente
})
export class ProyectoComponent implements OnInit {

  proyectos: Proyecto[] = [];  // Arreglo de proyectos
  proyecto: Proyecto = { nombre: '', descripcion: '', estado: '', fechaInicio: new Date(), fechaFin: new Date() };  // Proyecto vacío por defecto
  isEditing: boolean = false;

  constructor(
    public router: Router,
    private proyectoService: ProyectoService,
    private route: ActivatedRoute,
    private datePipe: DatePipe  // Inyectamos DatePipe en el constructor
  ) {}

  ngOnInit(): void {
    this.obtenerProyectos();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.cargarProyecto(id);
    }
  }

  obtenerProyectos(): void {
    this.proyectoService.listarProyectos().subscribe((data: Proyecto[]) => {
      this.proyectos = data;
    });
  }

  cargarProyecto(id: string): void {
    this.proyectoService.obtenerProyecto(id).subscribe((data: Proyecto) => {
      this.proyecto = data;
    });
  }

  guardarProyecto(): void {
    if (this.isEditing) {
      this.proyectoService.actualizarProyecto(this.proyecto.id, this.proyecto).subscribe(() => {
        this.router.navigate(['/proyectos']);
      });
    } else {
      this.proyectoService.crearProyecto(this.proyecto).subscribe(() => {
        this.obtenerProyectos();
        this.proyecto = { nombre: '', descripcion: '', estado: '', fechaInicio: new Date(), fechaFin: new Date() };
      });
    }
  }

  eliminarProyecto(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      this.proyectoService.eliminarProyecto(id).subscribe(() => {
        this.obtenerProyectos();
      });
    }
  }
}
