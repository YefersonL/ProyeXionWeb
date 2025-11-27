import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Homei } from './components/homei/homei';
import { Login } from './components/authentication/login/login';
import { Animal } from './components/base/animal/animal';
import { Users } from './components/base/users/users';
import { Logout } from './components/authentication/logout/logout';
import { Profile } from './components/profile/profile';
import { authGuard } from './guards/auth.guard';
import { ProyectoComponent } from './components/proyecto/proyecto';

export const routes: Routes = [

    // 🔹 RUTA POR DEFECTO → Login
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    // 🔹 AUTENTICACIÓN
    { path: 'login', component: Login },
    { path: 'register', component: Register },

    // 🔹 DASHBOARD
    { path: 'dashboard', component: Homei, canActivate: [authGuard] },

    // 🔹 MIS TAREAS (CARGA DIFERIDA)
    {
        path: 'mis-tareas',
        loadComponent: () =>
            import('./components/mis-tareas/mis-tareas.component')
                .then(m => m.MisTareasComponent),
        canActivate: [authGuard]
    },

    // 🔹 PROYECTOS
    { path: 'proyectos', component: ProyectoComponent },             // Ruta para ver los proyectos
    { path: 'proyectos/crear', component: ProyectoComponent },     // Ruta para crear un proyecto
    { path: 'proyectos/editar/:id', component: ProyectoComponent },// Ruta para editar un proyecto


    // 🔹 PERFIL
    { path: 'profile', component: Profile, canActivate: [authGuard] },

    // 🔹 BASE
    { path: 'animal', component: Animal },
    { path: 'users', component: Users },

    // 🔹 LOGOUT
    { path: 'logout', component: Logout }

];
