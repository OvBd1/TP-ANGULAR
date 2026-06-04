import { ChangeDetectionStrategy, Component, OnInit, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EpisodeService } from '../../services/episode.service';
import { CharacterService } from '../../services/character.service';
import { FavorisService } from '../../services/favoris.service';
import { Episode } from '../../models/episode.model';
import { Character } from '../../models/character.model';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  imports: [RouterLink, CharacterCardComponent, LoaderComponent, ErrorMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './episode-detail.component.html',
  styleUrl: './episode-detail.component.scss',
})
export class EpisodeDetailComponent implements OnInit {
  id = input.required<string>();

  private episodeSvc = inject(EpisodeService);
  private characterSvc = inject(CharacterService);
  protected favoris = inject(FavorisService);

  episode = signal<Episode | null>(null);
  characters = signal<Character[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.episodeSvc.getById(+this.id()).subscribe({
      next: ep => {
        this.episode.set(ep);
        this.loading.set(false);
        const ids = ep.characters.map(url => +url.split('/').pop()!).slice(0, 20);
        if (ids.length) {
          this.characterSvc.getMany(ids).subscribe({
            next: chars => this.characters.set(chars),
          });
        }
      },
      error: () => { this.error.set('Épisode introuvable.'); this.loading.set(false); },
    });
  }
}
