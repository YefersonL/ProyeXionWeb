import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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
  totalProyectos = 12;
  tareasActivas = 8;
  tareasCompletadas = 24;
  totalMiembros = 15;

  // Proyectos recientes (datos de ejemplo)
  proyectosRecientes = [
    {
      nombre: 'Sistema de Gestión de Inventarios',
      descripcion: 'Desarrollo de plataforma web para control de inventarios en tiempo real',
      estado: 'Activo',
      fechaInicio: new Date('2024-01-15')
    },
    {
      nombre: 'App Móvil de Delivery',
      descripcion: 'Aplicación móvil multiplataforma para servicio de entregas',
      estado: 'Activo',
      fechaInicio: new Date('2024-02-01')
    },
    {
      nombre: 'Portal de Clientes',
      descripcion: 'Portal web para gestión de clientes y servicios',
      estado: 'Completado',
      fechaInicio: new Date('2023-12-10')
    }
  ];

  // Tareas pendientes (datos de ejemplo)
  tareasPendientes = [
    {
      titulo: 'Diseñar mockups de interfaz',
      descripcion: 'Crear diseños de las pantallas principales',
      completada: false,
      fechaCreacion: new Date('2024-11-18')
    },
    {
      titulo: 'Implementar autenticación JWT',
      descripcion: 'Configurar sistema de autenticación con tokens',
      completada: false,
      fechaCreacion: new Date('2024-11-19')
    },
    {
      titulo: 'Revisar código del módulo de reportes',
      descripcion: 'Code review y corrección de bugs',
      completada: false,
      fechaCreacion: new Date('2024-11-20')
    },
    {
      titulo: 'Actualizar documentación técnica',
      descripcion: 'Documentar nuevas funcionalidades implementadas',
      completada: false,
      fechaCreacion: new Date('2024-11-20')
    }
  ];

  constructor(
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit() {
    // Cargar nombre del usuario desde localStorage o servicio
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      this.userName = storedUser;
    }

    // Remover el fondo degradado del body si existe
    this.renderer.removeClass(document.body, 'bg-gradient-primary');
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
