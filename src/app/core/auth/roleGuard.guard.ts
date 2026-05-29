import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const roleGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const snackBar = inject(MatSnackBar);

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

    snackBar.open('Access denied. You do not have permission to view this page.', 'Close', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
    });

    router.navigate(['/dashboard']);
    return false;
};