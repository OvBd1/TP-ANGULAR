import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Character } from '../models/character.model';
import { StorageService } from './storage.service';

const STORAGE_KEY = 'rm_favoris';

@Injectable({ providedIn: 'root' })
export class FavorisService {
  private storage = inject(StorageService);
  private _favoris = signal<Character[]>(this.storage.get<Character[]>(STORAGE_KEY) ?? []);

  favoris = this._favoris.asReadonly();
  nombre = computed(() => this._favoris().length);
  parStatut = computed(() => {
    const list = this._favoris();
    return {
      Alive: list.filter(c => c.status === 'Alive').length,
      Dead: list.filter(c => c.status === 'Dead').length,
      unknown: list.filter(c => c.status === 'unknown').length,
    };
  });

  constructor() {
    effect(() => this.storage.set(STORAGE_KEY, this._favoris()));
  }

  isFavori(id: number): boolean {
    return this._favoris().some(c => c.id === id);
  }

  toggle(c: Character): void {
    if (this.isFavori(c.id)) {
      this._favoris.update(list => list.filter(f => f.id !== c.id));
    } else {
      this._favoris.update(list => [...list, c]);
    }
  }
}
