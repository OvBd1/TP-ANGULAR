import { ChangeDetectionStrategy, Component, OnInit, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { CharacterService } from '../../services/character.service';
import { FavorisService } from '../../services/favoris.service';
import { Location } from '../../models/location.model';
import { Character } from '../../models/character.model';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-location-detail',
  standalone: true,
  imports: [RouterLink, CharacterCardComponent, LoaderComponent, ErrorMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './location-detail.component.html',
  styleUrl: './location-detail.component.scss',
})
export class LocationDetailComponent implements OnInit {
  id = input.required<string>();

  private locationSvc = inject(LocationService);
  private characterSvc = inject(CharacterService);
  protected favoris = inject(FavorisService);

  location = signal<Location | null>(null);
  residents = signal<Character[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.locationSvc.getById(+this.id()).subscribe({
      next: loc => {
        this.location.set(loc);
        this.loading.set(false);
        const ids = loc.residents.map(url => +url.split('/').pop()!).slice(0, 20);
        if (ids.length) {
          this.characterSvc.getMany(ids).subscribe({
            next: chars => this.residents.set(chars),
          });
        }
      },
      error: () => { this.error.set('Lieu introuvable.'); this.loading.set(false); },
    });
  }
}
