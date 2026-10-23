import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../config/app.config';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  id: string
  username: string
  access_token: string
  refresh_token: string
  permission_level: number
  validation_level: number
  duration: number
  server_time: string
  version: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.config.apiBaseUrl}/auth`, { username, password })
      .pipe(
        tap(response => {
          if (response.access_token) {
            localStorage.setItem('jwt_token', response.access_token);
            localStorage.setItem('current_user', JSON.stringify(response));
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('current_user');
  }
}