import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProyectoService } from '../../services/proyecto';
import { TareaService } from '../../services/tarea';

@Component({
  selector: 'app-homei',
  imports: [CommonModule, RouterModule],
  templateUrl: './homei.html',
  styleUrl: './homei.css',
})
export class Homei {
  // Estado del sidebar (para móviles)
  sidebarCollapsed = true;

  // Información del usuario
  userName = 'Usuario';

  // Estadísticas
  totalProyectos = 0;
  tareasActivas = 0;
  tareasCompletadas = 0;
  totalMiembros = 0;

  // Proyectos recientes (datos reales)
  proyectosRecientes: any[] = [];

  // Tareas pendientes (datos reales)
  tareasPendientes: any[] = [];

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private proyectoService: ProyectoService,
    private tareaService: TareaService
  ) { }

  ngOnInit() {
    // Cargar nombre del usuario desde localStorage o servicio
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      this.userName = storedUser;
    }

    // Remover el fondo degradado del body si existe
    this.renderer.removeClass(document.body, 'bg-gradient-primary');

    // Cargar datos reales
    this.cargarProyectos();
    this.cargarTareas();
  }

  cargarProyectos() {
    this.proyectoService.obtenerProyectos().subscribe(
      (proyectos) => {
        // Mostrar solo los 3 proyectos más recientes
        this.proyectosRecientes = proyectos.slice(0, 3);

        // Calcular estadísticas
        this.totalProyectos = proyectos.length;
      },
      (error) => {
        console.error('Error cargando proyectos', error);
      }
    );
  }

  cargarTareas() {
    this.tareaService.obtenerTareas().subscribe(
      (tareas) => {
        // Filtrar tareas no completadas
        this.tareasPendientes = tareas.filter(t => !t.completada).slice(0, 4);

        // Calcular estadísticas
        this.tareasActivas = tareas.filter(t => !t.completada).length;
        this.tareasCompletadas = tareas.filter(t => t.completada).length;
      },
      (error) => {
        console.error('Error cargando tareas', error);
      }
    );
  }

  ngOnDestroy() {
    // Limpiar al salir del componente
    this.renderer.removeClass(document.body, 'bg-gradient-primary');
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  logout() {
    // Limpiar datos de sesión
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');

    // Redirigir al login
    this.router.navigateByUrl('/login');
  }
}
