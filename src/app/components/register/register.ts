import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication } from '../../services/authentication';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor(
    private renderer: Renderer2,
    private authenticationService: Authentication,
    private router: Router
  ) { }

  ngOnInit() {
    // Usa Renderer2 para añadir la clase de forma segura
    // Este estilo 'bg-gradient-primary' hace que el fondo sea azul
    this.renderer.addClass(document.body, 'bg-gradient-primary');
  }

  onRegister(form: any): void {
    if (form.valid) {
      this.authenticationService.register(form.value).subscribe(
        (res) => {
          console.log('Usuario registrado exitosamente', res);
          // Guardar el token y datos del usuario
          if (res.token) {
            localStorage.setItem('accessToken', res.token);
          }
          if (res.user?.name) {
            localStorage.setItem('userName', res.user.name);
          }
          // Redirigir directamente al dashboard
          this.router.navigateByUrl('/dashboard');
        },
        (error) => {
          console.error('Error en el registro:', error);
          alert('Error al registrar usuario: ' + (error.error?.message || 'Error desconocido'));
        }
      );
    }
  }
}
