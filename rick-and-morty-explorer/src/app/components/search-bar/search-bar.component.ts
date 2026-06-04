import {
  ChangeDetectionStrategy, Component, OnInit, OnDestroy,
  output, ElementRef, ViewChild, AfterViewInit,
} from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="search-bar">
      <span class="icon">🔍</span>
      <input #searchInput type="text" placeholder="Rechercher un personnage..." />
    </div>
  `,
  styles: [`
    .search-bar {
      display: flex; align-items: center; gap: 10px;
      background: #16213e; border: 2px solid #97ce4c; border-radius: 10px;
      padding: 8px 16px;
    }
    .icon { font-size: 1.1rem; }
    input {
      flex: 1; background: transparent; border: none; outline: none;
      color: #e0e0e0; font-size: 1rem;
    }
    input::placeholder { color: #888; }
  `],
})
export class SearchBarComponent implements AfterViewInit, OnDestroy {
  searched = output<string>();

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  private destroy$ = new Subject<void>();
  private input$ = new Subject<string>();

  ngAfterViewInit() {
    const el = this.searchInput.nativeElement;
    el.addEventListener('input', () => this.input$.next(el.value));

    this.input$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    ).subscribe(val => this.searched.emit(val));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
