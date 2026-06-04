import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="error-box">
      <span class="icon">⚠️</span>
      <p>{{ message() }}</p>
      <button (click)="retry.emit()">Réessayer</button>
    </div>
  `,
  styles: [`
    .error-box {
      display: flex; flex-direction: column; align-items: center; gap: 12px;
      padding: 32px; background: #fff3f3; border: 1px solid #f28b82;
      border-radius: 12px; color: #c0392b;
    }
    .icon { font-size: 2rem; }
    p { margin: 0; font-weight: 500; }
    button {
      padding: 8px 20px; background: #c0392b; color: #fff;
      border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem;
    }
    button:hover { background: #a93226; }
  `],
})
export class ErrorMessageComponent {
  message = input.required<string>();
  retry = output<void>();
}
