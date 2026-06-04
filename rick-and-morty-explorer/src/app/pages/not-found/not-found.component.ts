import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="not-found">
      <div class="portal"></div>
      <h1>404</h1>
      <p>Cette dimension n'existe pas !</p>
      <a routerLink="/dashboard">Retour à l'accueil</a>
    </div>
  `,
  styles: [`
    .not-found {
      display: flex; flex-direction: column; align-items: center;
      justify-content: center; min-height: 60vh; gap: 20px; text-align: center;
    }
    .portal {
      width: 120px; height: 120px; border-radius: 50%;
      background: radial-gradient(circle, #97ce4c 0%, #44b74a 40%, transparent 70%);
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
    h1 { font-size: 5rem; margin: 0; color: #97ce4c; }
    p { font-size: 1.2rem; color: #aaa; }
    a {
      padding: 12px 28px; background: #97ce4c; color: #1a1a2e;
      border-radius: 8px; text-decoration: none; font-weight: 700;
    }
  `],
})
export class NotFoundComponent {}
