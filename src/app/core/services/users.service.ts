import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../config/app.config';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.config.apiBaseUrl}/users`);
  }

  updateUser(userId: string, userData: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.config.apiBaseUrl}/users/admin/edit/${userId}`, userData);
  }
}