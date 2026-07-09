import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const snackBar = inject(MatSnackBar);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'Something went wrong';

            if (error.status === 0) {
                errorMessage = 'Network error - no internet connection';
            } else if (error.status === 400) {
                errorMessage = error.error?.message || 'Bad request';
            } else if (error.status === 401) {
                errorMessage = 'Unauthorized - please login again';
            } else if (error.status === 403) {
                errorMessage = 'Access denied';
            } else if (error.status === 404) {
                errorMessage = 'Resource not found';
            } else if (error.status === 500) {
                errorMessage = 'Server error - please try again later';
            } else if (error.status >= 500) {
                errorMessage = 'Server error occurred';
            }

            snackBar.open(errorMessage, 'Close', {
                duration: 5000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ['error-snackbar']
            });

            console.error('HTTP Error:', {
                status: error.status,
                statusText: error.statusText,
                url: error.url,
                message: errorMessage
            });

            return throwError(() => error);
        })
    );
};