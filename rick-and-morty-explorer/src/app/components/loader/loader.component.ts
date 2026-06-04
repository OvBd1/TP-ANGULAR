import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="loader-wrapper">
      <div class="spinner"></div>
      <p>Chargement...</p>
    </div>
  `,
  styles: [`
    .loader-wrapper { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 40px; }
    .spinner {
      width: 48px; height: 48px; border: 5px solid #e0e0e0;
      border-top-color: #97ce4c; border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    p { color: #97ce4c; font-weight: 600; }
  `],
})
export class LoaderComponent {}
