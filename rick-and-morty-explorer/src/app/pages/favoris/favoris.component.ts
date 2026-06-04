import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavorisService } from '../../services/favoris.service';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-favoris',
  standalone: true,
  imports: [RouterLink, CharacterCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './favoris.component.html',
  styleUrl: './favoris.component.scss',
})
export class FavorisComponent {
  protected favoris = inject(FavorisService);

  toggle(c: Character) {
    this.favoris.toggle(c);
  }
}
