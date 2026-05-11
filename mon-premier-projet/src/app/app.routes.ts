import { Routes } from '@angular/router';
import { HelloComponent } from './hello/hello';
import { CitationComponent } from './citation/citation';
import { MeteoComponent } from './meteo/meteo';
import { ProfilComponent } from './profil/profil';

export const routes: Routes = [
  { path: '', redirectTo: 'hello', pathMatch: 'full' },
  { path: 'hello', component: HelloComponent },
  { path: 'citation', component: CitationComponent },
  { path: 'meteo', component: MeteoComponent },
  { path: 'profil', component: ProfilComponent },
];
