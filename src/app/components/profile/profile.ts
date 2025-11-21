import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Authentication } from '../../services/authentication';

@Component({
    selector: 'app-profile',
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './profile.html',
    styleUrl: './profile.css',
})
export class Profile implements OnInit {
    userInfo = {
        name: '',
        email: '',
        role: ''
    };

    originalUserInfo = {
        name: '',
        email: '',
        role: ''
    };

    isLoading = false;
    isLoadingPassword = false;

    constructor(
        private authService: Authentication,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadUserInfo();
    }

    loadUserInfo() {
        // Cargar información del usuario desde localStorage
        const token = localStorage.getItem('accessToken');
        if (!token) {
            // Si no hay token, redirigir al login
            this.router.navigateByUrl('/login');
            return;
        }

        // Cargar datos guardados
        this.userInfo.name = localStorage.getItem('userName') || 'Usuario';
        this.userInfo.email = localStorage.getItem('userEmail') || '';
        this.userInfo.role = localStorage.getItem('userRole') || 'Miembro de Equipo';

        // Guardar copia original
        this.originalUserInfo = { ...this.userInfo };
    }

    updateInfo(form: any) {
        if (!form.valid) {
            return;
        }

        this.isLoading = true;

        const updateData = {
            name: this.userInfo.name,
            email: this.userInfo.email
        };

        this.authService.updateProfile(updateData).subscribe(
            (res) => {
                this.isLoading = false;

                // Actualizar localStorage
                if (res.user) {
                    localStorage.setItem('userName', res.user.name);
                    localStorage.setItem('userEmail', res.user.email);
                    if (res.user.role) {
                        localStorage.setItem('userRole', res.user.role);
                    }

                    // Actualizar copia original
                    this.originalUserInfo = { ...this.userInfo };
                }

                alert('✅ Información actualizada correctamente');
            },
            (error) => {
                this.isLoading = false;
                console.error('Error al actualizar información:', error);
                alert('❌ Error al actualizar información: ' + (error.error?.message || 'Error desconocido'));
            }
        );
    }

    updatePassword(form: any) {
        if (!form.valid) {
            return;
        }

        const formValue = form.value;

        // Validar que las contraseñas coincidan
        if (formValue.newPassword !== formValue.confirmPassword) {
            alert('❌ Las contraseñas no coinciden');
            return;
        }

        // Validar longitud mínima
        if (formValue.newPassword.length < 6) {
            alert('❌ La nueva contraseña debe tener al menos 6 caracteres');
            return;
        }

        this.isLoadingPassword = true;

        const passwordData = {
            oldPassword: formValue.oldPassword,
            newPassword: formValue.newPassword
        };

        this.authService.updateProfile(passwordData).subscribe(
            (res) => {
                this.isLoadingPassword = false;
                alert('✅ Contraseña actualizada correctamente');
                form.resetForm();
            },
            (error) => {
                this.isLoadingPassword = false;
                console.error('Error al actualizar contraseña:', error);
                alert('❌ Error al actualizar contraseña: ' + (error.error?.message || 'Contraseña actual incorrecta'));
            }
        );
    }

    cancelChanges() {
        // Restaurar valores originales
        this.userInfo = { ...this.originalUserInfo };
    }
}
