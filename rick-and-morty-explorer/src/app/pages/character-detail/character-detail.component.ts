import {
  ChangeDetectionStrategy, Component, OnInit, inject, input, signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharacterService } from '../../services/character.service';
import { EpisodeService } from '../../services/episode.service';
import { FavorisService } from '../../services/favoris.service';
import { Character } from '../../models/character.model';
import { Episode } from '../../models/episode.model';
import { StatusPipe } from '../../pipes/status.pipe';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [RouterLink, StatusPipe, LoaderComponent, ErrorMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss',
})
export class CharacterDetailComponent implements OnInit {
  id = input.required<string>();

  private characterSvc = inject(CharacterService);
  private episodeSvc = inject(EpisodeService);
  protected favoris = inject(FavorisService);

  character = signal<Character | null>(null);
  episodes = signal<Episode[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.characterSvc.getById(+this.id()).subscribe({
      next: c => {
        this.character.set(c);
        this.loading.set(false);
        const ids = c.episode.map(url => +url.split('/').pop()!);
        this.loadEpisodes(ids.slice(0, 20));
      },
      error: () => {
        this.error.set('Personnage introuvable.');
        this.loading.set(false);
      },
    });
  }

  private loadEpisodes(ids: number[]) {
    if (!ids.length) return;
    this.episodeSvc.getMany(ids).subscribe({
      next: eps => this.episodes.set(eps),
    });
  }

  locationId(url: string): number | null {
    if (!url) return null;
    const id = url.split('/').pop();
    return id ? +id : null;
  }

  toggleFavori() {
    const c = this.character();
    if (c) this.favoris.toggle(c);
  }
}
