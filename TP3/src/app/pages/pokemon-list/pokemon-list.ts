import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { PokemonApiService } from '../../services/pokemon-api';

@Component({
  selector: 'app-pokemon-list',
  imports: [RouterLink],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})

export class PokemonList {
  private api = inject(PokemonApiService);
  private pageSize = 20;

  page = signal(0);

  // les données de l'API converties en signal (désabonnement auto)
  data = toSignal(
    toObservable(this.page).pipe(
      switchMap(pageIndex =>
        this.api.getList(this.pageSize, pageIndex * this.pageSize)
      )
    ),
    { initialValue: { items: [], count: 0 } }
  );

  // le terme de recherche
  recherche = signal('');

  // liste filtrée : se recalcule automatiquement
  filtres = computed(() => {
    const q = this.recherche().toLowerCase().trim();
    return this.data().items.filter(p => p.name.includes(q));
  });

  totalPages = computed(() =>
    this.data().count === 0
      ? 1
      : Math.ceil(this.data().count / this.pageSize)
  );

  hasPrev = computed(() => this.page() > 0);
  hasNext = computed(() => (this.page() + 1) * this.pageSize < this.data().count);

  onSearch(event: Event) {
    this.recherche.set((event.target as HTMLInputElement).value);
  }

  prevPage() {
    if (this.hasPrev()) {
      this.page.update(p => p - 1);
    }
  }

  nextPage() {
    if (this.hasNext()) {
      this.page.update(p => p + 1);
    }
  }
}
