import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication } from '../../../services/authentication';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private renderer: Renderer2,
    private authenticationService: Authentication,
    private router: Router) { }

  ngOnInit() {
    // Usa Renderer2 para añadir la clase de forma segura
    // Este estilo 'bg-gradient-primary' hace que el fondo sea azul
    this.renderer.addClass(document.body, 'bg-gradient-primary');
  }

  onLogin(form: any): void {
    this.authenticationService.login(form.value).subscribe(
      (res) => {
        if (res.token) {
          localStorage.setItem('accessToken', res.token);
          this.router.navigateByUrl('/animal');
        }
      },
      (error) => {
        console.error('Error en el login:', error);
        alert('Error al iniciar sesión: ' + (error.error?.message || 'Credenciales inválidas'));
      }
    );
  }
}
