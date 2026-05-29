import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isLoggedIn()) {
        router.navigate(['/login']);
        return false;
    }

    const expectedRoles = route.data['roles'] as string[];

    if (!expectedRoles || expectedRoles.length === 0) {
        return true;
    }

    if (authService.hasRole(expectedRoles)) {
        return true;
    }

    //update to matirial alert
    alert('Access denied. You do not have permission to view this page.');
    router.navigate(['/dashboard']);
    return false;
};