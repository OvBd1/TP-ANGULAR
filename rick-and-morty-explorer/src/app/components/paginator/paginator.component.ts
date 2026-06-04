import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="paginator">
      <button [disabled]="currentPage() <= 1" (click)="prev.emit()">← Précédent</button>
      <span>Page {{ currentPage() }} / {{ totalPages() }}</span>
      <button [disabled]="currentPage() >= totalPages()" (click)="next.emit()">Suivant →</button>
    </nav>
  `,
  styles: [`
    .paginator {
      display: flex; align-items: center; justify-content: center; gap: 16px;
      padding: 20px 0;
    }
    button {
      padding: 8px 20px; background: #97ce4c; color: #1a1a2e;
      border: none; border-radius: 8px; cursor: pointer; font-weight: 600;
      transition: background 0.2s;
    }
    button:disabled { background: #ccc; cursor: not-allowed; color: #888; }
    button:not(:disabled):hover { background: #7db83a; }
    span { font-weight: 600; color: #e0e0e0; min-width: 120px; text-align: center; }
  `],
})
export class PaginatorComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  prev = output<void>();
  next = output<void>();
}
