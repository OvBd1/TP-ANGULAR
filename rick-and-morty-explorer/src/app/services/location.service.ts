import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Location } from '../models/location.model';

const BASE = 'https://rickandmortyapi.com/api';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private http = inject(HttpClient);

  getAll(page: number): Observable<ApiResponse<Location>> {
    const params = new HttpParams().set('page', page);
    return this.http.get<ApiResponse<Location>>(`${BASE}/location`, { params });
  }

  getById(id: number): Observable<Location> {
    return this.http.get<Location>(`${BASE}/location/${id}`);
  }
}
