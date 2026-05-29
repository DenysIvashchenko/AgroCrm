import { Routes } from '@angular/router';
import { MainLayout } from './core/layout/main-layout/main-layout';
import { roleGuard } from './core/auth/roleGuard.guard';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./core/auth/login/login').then((c) => c.Login),
    },
    {
        path: '',
        component: MainLayout,
        // canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./features/dashboard/dashboard.routes').then((r) => r.DASHBOARD_ROUTES),
                // canActivate: [roleGuard],
                data: { roles: ['ADMIN', 'AGRONOMIST', 'MANAGER', 'OPERATOR'] }
            },
            {
                path: 'farmers',
                loadChildren: () => import('./features/farmers/farmers.routes').then((r) => r.FARMERS_ROUTES),
                // canActivate: [roleGuard],
                data: { roles: ['ADMIN', 'AGRONOMIST'] }
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    }
];
