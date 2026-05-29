import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ENV } from '../../../environment/environment.token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private URL = inject(ENV).apiEndpoint;
  private _userInfo = signal<{ username: string; roles: string, email: string } | null>(null);
  private readonly API_URL = `${this.URL}/auth/login`;

  public userInfo = this._userInfo.asReadonly();
  public currentUserToken = signal<string | null>(sessionStorage.getItem('token'));

  constructor() {
    this.decodeAndSetUserInfo(this.currentUserToken());
  }

  public login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.API_URL, credentials).pipe(
      tap(response => {
        if (response.token) {
          sessionStorage.setItem('token', response.token);
          this.currentUserToken.set(response.token);
          this.decodeAndSetUserInfo(response.token);
          this.router.navigate(['/dashboard']);
        }
      })
    );
  }

  public getUserRole(): string | null {
    const token = this.currentUserToken();
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.roles || null;
    } catch {
      return null;
    }
  }

  public hasRole(allowedRoles: string[]): boolean {
    const roles = this.getUserRole();
    const userRoles = roles ? roles.split(',').map((r: string) => r.trim()) : [];

    if (!roles) return false;
    return userRoles.some(userRole => allowedRoles.includes(userRole));
  }

  public isLoggedIn(): boolean {
    return !!this.currentUserToken();
  }

  public logout() {
    sessionStorage.removeItem('token');
    this.currentUserToken.set(null);
    this.router.navigate(['/login']);
  }

  private decodeAndSetUserInfo(token: string | null): void {
    if (!token) {
      this._userInfo.set(null);
      return;
    }
    try {
      const decoded: any = jwtDecode(token);
      this._userInfo.set({
        username: decoded.username || null,
        roles: decoded.roles || null,
        email: decoded.sub || null
      });
    } catch {
      this._userInfo.set(null);
    }
  }
}