import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hello } from './hello/hello';
import { Profil } from './profil/profil';
import { Citation } from './citation/citation';
import { Meteo } from './meteo/meteo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Hello, Profil, Citation, Meteo],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title = 'mon-premier-projet';
}
