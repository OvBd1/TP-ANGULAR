import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location.model';
import { Info } from '../../models/info.model';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [RouterLink, PaginatorComponent, LoaderComponent, ErrorMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './locations-list.component.html',
  styleUrl: './locations-list.component.scss',
})
export class LocationsListComponent implements OnInit {
  private locationSvc = inject(LocationService);

  locations = signal<Location[]>([]);
  info = signal<Info | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  currentPage = signal(1);

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.locationSvc.getAll(this.currentPage()).subscribe({
      next: res => { this.locations.set(res.results); this.info.set(res.info); this.loading.set(false); },
      error: () => { this.error.set('Erreur lors du chargement des lieux.'); this.loading.set(false); },
    });
  }

  onPrev() { if (this.currentPage() > 1) { this.currentPage.update(p => p - 1); this.load(); } }
  onNext() {
    const info = this.info();
    if (info && this.currentPage() < info.pages) { this.currentPage.update(p => p + 1); this.load(); }
  }
}
