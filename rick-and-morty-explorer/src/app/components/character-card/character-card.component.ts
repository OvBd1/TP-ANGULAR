import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Character } from '../../models/character.model';
import { StatusPipe } from '../../pipes/status.pipe';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [RouterLink, StatusPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="card">
      <a [routerLink]="['/characters', character().id]">
        <img [src]="character().image" [alt]="character().name" loading="lazy" />
        <div class="card-body">
          <h3>{{ character().name }}</h3>
          <p class="status">{{ character().status | status }}</p>
          <p class="species">{{ character().species }}</p>
        </div>
      </a>
      <button class="fav-btn" (click)="toggleFavori.emit(character())" [attr.aria-label]="isFavori() ? 'Retirer des favoris' : 'Ajouter aux favoris'">
        {{ isFavori() ? '⭐' : '☆' }}
      </button>
    </article>
  `,
  styles: [`
    .card {
      position: relative; background: #16213e; border-radius: 12px;
      overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;
      border: 1px solid #0f3460;
    }
    .card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
    a { display: block; text-decoration: none; color: inherit; }
    img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; }
    .card-body { padding: 12px 14px; }
    h3 { margin: 0 0 4px; font-size: 1rem; color: #e0e0e0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .status { margin: 0 0 2px; font-size: 0.85rem; }
    .species { margin: 0; font-size: 0.8rem; color: #aaa; }
    .fav-btn {
      position: absolute; top: 8px; right: 8px;
      background: rgba(0,0,0,0.5); border: none; border-radius: 50%;
      width: 34px; height: 34px; font-size: 1.1rem; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s;
    }
    .fav-btn:hover { background: rgba(0,0,0,0.8); }
  `],
})
export class CharacterCardComponent {
  character = input.required<Character>();
  isFavori = input<boolean>(false);
  toggleFavori = output<Character>();
}
