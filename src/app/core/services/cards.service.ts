import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../config/app.config';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.config.apiBaseUrl}/cards`);
  }
}