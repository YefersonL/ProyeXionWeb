import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const token = localStorage.getItem('accessToken');

    if (token) {
        // Usuario autenticado, permitir acceso
        return true;
    } else {
        // No autenticado, redirigir al login
        router.navigate(['/login']);
        return false;
    }
};
