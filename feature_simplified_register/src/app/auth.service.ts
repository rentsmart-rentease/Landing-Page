// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://your-api-url.com'; // Reemplaza con tu API URL

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      map(response => {
        localStorage.setItem('auth_token', response.token);
        return true;
      }),
      catchError(error => {
        console.error('Login error', error);
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}
// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://your-api-url.com'; // Reemplaza con tu API URL

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      map(response => {
        localStorage.setItem('auth_token', response.token);
        return true;
      }),
      catchError(error => {
        console.error('Login error', error);
        return of(false);
      })
    );
  }

  register(user: { nombre: string, apellido: string, telefono: string, email: string, password: string }): Observable<boolean> {
    return this.http.post<{ success: boolean }>(`${this.apiUrl}/register`, user).pipe(
      map(response => response.success),
      catchError(error => {
        console.error('Registration error', error);
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}
