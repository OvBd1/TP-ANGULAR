import {
  ChangeDetectionStrategy, Component, OnInit, OnDestroy, inject, signal,
} from '@angular/core';
import { Subject, switchMap, takeUntil, of, startWith, combineLatest } from 'rxjs';
import { CharacterService } from '../../services/character.service';
import { FavorisService } from '../../services/favoris.service';
import { Character } from '../../models/character.model';
import { Info } from '../../models/info.model';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CharacterCardComponent, SearchBarComponent, PaginatorComponent, LoaderComponent, ErrorMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss',
})
export class CharactersListComponent implements OnInit, OnDestroy {
  private characterSvc = inject(CharacterService);
  protected favoris = inject(FavorisService);

  characters = signal<Character[]>([]);
  info = signal<Info | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  currentPage = signal(1);
  searchTerm = signal('');
  selectedStatus = signal('');

  private destroy$ = new Subject<void>();
  private reload$ = new Subject<void>();

  readonly statuses = ['', 'alive', 'dead', 'unknown'];
  readonly statusLabels: Record<string, string> = {
    '': 'Tous',
    'alive': '🟢 Vivant',
    'dead': '🔴 Mort',
    'unknown': '⚪ Inconnu',
  };

  ngOnInit() {
    this.reload$.pipe(
      startWith(null),
      switchMap(() => {
        this.loading.set(true);
        this.error.set(null);
        return this.characterSvc.getAll(
          this.currentPage(),
          this.searchTerm() || undefined,
          this.selectedStatus() || undefined,
        );
      }),
      takeUntil(this.destroy$),
    ).subscribe({
      next: res => {
        this.characters.set(res.results);
        this.info.set(res.info);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erreur lors du chargement des personnages.');
        this.loading.set(false);
      },
    });
  }

  onSearch(term: string) {
    this.searchTerm.set(term);
    this.currentPage.set(1);
    this.reload$.next();
  }

  onStatus(status: string) {
    this.selectedStatus.set(status);
    this.currentPage.set(1);
    this.reload$.next();
  }

  onPrev() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
      this.reload$.next();
    }
  }

  onNext() {
    const info = this.info();
    if (info && this.currentPage() < info.pages) {
      this.currentPage.update(p => p + 1);
      this.reload$.next();
    }
  }

  onToggleFavori(c: Character) {
    this.favoris.toggle(c);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
