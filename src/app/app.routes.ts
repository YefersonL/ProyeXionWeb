import { Routes } from '@angular/router';

import { Register } from './components/register/register';
import { Homei } from './components/homei/homei';
import { Login } from './components/authentication/login/login';
import { Animal } from './components/base/animal/animal';
import { Users } from './components/base/users/users';
import { Logout } from './components/authentication/logout/logout';
import { Profile } from './components/profile/profile';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'dashboard', component: Homei, canActivate: [authGuard] },
    { path: 'profile', component: Profile, canActivate: [authGuard] },
    { path: 'animal', component: Animal },
    { path: 'users', component: Users },
    { path: 'logout', component: Logout }
];
