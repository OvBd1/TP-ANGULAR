import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Episode } from '../models/episode.model';

const BASE = 'https://rickandmortyapi.com/api';

@Injectable({ providedIn: 'root' })
export class EpisodeService {
  private http = inject(HttpClient);

  getAll(page: number): Observable<ApiResponse<Episode>> {
    const params = new HttpParams().set('page', page);
    return this.http.get<ApiResponse<Episode>>(`${BASE}/episode`, { params });
  }

  getById(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${BASE}/episode/${id}`);
  }

  getMany(ids: number[]): Observable<Episode[]> {
    if (ids.length === 0) return new Observable(obs => { obs.next([]); obs.complete(); });
    if (ids.length === 1) {
      return new Observable(obs => {
        this.http.get<Episode>(`${BASE}/episode/${ids[0]}`).subscribe({
          next: e => { obs.next([e]); obs.complete(); },
          error: err => obs.error(err),
        });
      });
    }
    return this.http.get<Episode[]>(`${BASE}/episode/${ids.join(',')}`);
  }
}
