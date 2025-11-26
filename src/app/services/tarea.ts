import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private apiUrl = 'http://localhost:5000/api/tareas';

  constructor(private http: HttpClient) {}

  // 🔥 IMPORTANTE: Aquí lees el token correcto
  private getAuthHeaders() {
    const token = localStorage.getItem('accessToken'); // <-- CORREGIDO
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  obtenerTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl, this.getAuthHeaders());
  }

  crearTarea(tarea: Partial<Tarea>): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, tarea, this.getAuthHeaders());
  }

  actualizarTarea(id: string, tarea: Partial<Tarea>): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.apiUrl}/${id}`, tarea, this.getAuthHeaders());
  }

  eliminarTarea(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }
}
