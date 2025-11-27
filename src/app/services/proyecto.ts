import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private apiUrl = 'http://localhost:5000/api/proyectos'; // URL del backend

  constructor(private http: HttpClient) {}

  // Método para obtener los headers de autorización
  private getAuthHeaders() {
    const token = localStorage.getItem('accessToken');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  // Obtener todos los proyectos
  obtenerProyectos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.getAuthHeaders()); // Aseguramos que se pase el token
  }

  // Obtener un proyecto por ID
  obtenerProyecto(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, this.getAuthHeaders()); // Aseguramos que se pase el token
  }

  // Crear un nuevo proyecto
  crearProyecto(proyecto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, proyecto, this.getAuthHeaders()); // Aseguramos que se pase el token
  }

  // Actualizar un proyecto
  actualizarProyecto(id: string, proyecto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, proyecto, this.getAuthHeaders()); // Aseguramos que se pase el token
  }

  // Eliminar un proyecto
  eliminarProyecto(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.getAuthHeaders()); // Aseguramos que se pase el token
  }
}
