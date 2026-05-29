import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly API_URL = 'http://localhost:8080/api/auth/login';

  currentUserToken = signal<string | null>(sessionStorage.getItem('token'));

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.API_URL, credentials).pipe(
      tap(response => {
        if (response.token) {
          sessionStorage.setItem('token', response.token);
          this.currentUserToken.set(response.token);
          this.router.navigate(['/dashboard']);
        }
      })
    );
  }

  getUserRole(): string | null {
    const token = this.currentUserToken();
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.role || decoded.authorities?.[0] || null;
    } catch {
      return null;
    }
  }

  hasRole(allowedRoles: string[]): boolean {
    const role = this.getUserRole();
    if (!role) return false;
    return allowedRoles.some(r => role === r || role === `ROLE_${r}`);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserToken();
  }

  logout() {
    sessionStorage.removeItem('token');
    this.currentUserToken.set(null);
    this.router.navigate(['/login']);
  }
}