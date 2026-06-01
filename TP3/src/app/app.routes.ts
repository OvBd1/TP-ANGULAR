import { Routes } from '@angular/router';
import { PokemonList } from './pages/pokemon-list/pokemon-list';
import { PokemonDetail } from './pages/pokemon-detail/pokemon-detail';
import { Favoris } from './pages/favoris/favoris';

export const routes: Routes = [
  { path: '',               component: PokemonList },
  { path: 'pokemon/:name',  component: PokemonDetail },
  { path: 'favoris',        component: Favoris },
  { path: '**',             redirectTo: '' },
];
