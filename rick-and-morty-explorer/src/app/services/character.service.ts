import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Character } from '../models/character.model';

const BASE = 'https://rickandmortyapi.com/api';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private http = inject(HttpClient);

  getAll(page: number, name?: string, status?: string): Observable<ApiResponse<Character>> {
    let params = new HttpParams().set('page', page);
    if (name) params = params.set('name', name);
    if (status) params = params.set('status', status);
    return this.http.get<ApiResponse<Character>>(`${BASE}/character`, { params });
  }

  getById(id: number): Observable<Character> {
    return this.http.get<Character>(`${BASE}/character/${id}`);
  }

  getMany(ids: number[]): Observable<Character[]> {
    if (ids.length === 0) return new Observable(obs => { obs.next([]); obs.complete(); });
    if (ids.length === 1) {
      return new Observable(obs => {
        this.http.get<Character>(`${BASE}/character/${ids[0]}`).subscribe({
          next: c => { obs.next([c]); obs.complete(); },
          error: e => obs.error(e),
        });
      });
    }
    return this.http.get<Character[]>(`${BASE}/character/${ids.join(',')}`);
  }
}
