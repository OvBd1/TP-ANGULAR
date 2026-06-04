import { ChangeDetectionStrategy, Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharacterService } from '../../services/character.service';
import { LocationService } from '../../services/location.service';
import { EpisodeService } from '../../services/episode.service';
import { FavorisService } from '../../services/favoris.service';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private characterSvc = inject(CharacterService);
  private locationSvc = inject(LocationService);
  private episodeSvc = inject(EpisodeService);
  protected favoris = inject(FavorisService);

  totalCharacters = signal(0);
  totalLocations = signal(0);
  totalEpisodes = signal(0);
  loading = signal(true);

  nombreFavoris = computed(() => this.favoris.nombre());
  parStatut = computed(() => this.favoris.parStatut());

  ngOnInit() {
    let done = 0;
    const check = () => { if (++done === 3) this.loading.set(false); };

    this.characterSvc.getAll(1).subscribe({ next: r => { this.totalCharacters.set(r.info.count); check(); }, error: () => check() });
    this.locationSvc.getAll(1).subscribe({ next: r => { this.totalLocations.set(r.info.count); check(); }, error: () => check() });
    this.episodeSvc.getAll(1).subscribe({ next: r => { this.totalEpisodes.set(r.info.count); check(); }, error: () => check() });
  }
}
