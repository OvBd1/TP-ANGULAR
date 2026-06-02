import { Component, OnInit, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardApiService } from '../../services/card-api.service';
import { Card } from '../../models';

@Component({
  selector: 'app-card-detail',
  imports: [RouterLink],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss',
})
export class CardDetailComponent implements OnInit {
  private api = inject(CardApiService);
  id = input.required<string>();

  card = signal<Card | null>(null);
  loading = signal(true);

  ngOnInit() {
    this.api.getCardById(Number(this.id())).subscribe({
      next: (c) => {
        this.card.set(c);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
