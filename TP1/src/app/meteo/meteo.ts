import { Component } from '@angular/core';

@Component({
  selector: 'app-meteo',
  imports: [],
  templateUrl: './meteo.html',
  styleUrl: './meteo.scss',
})
export class Meteo {
  meteo = {
    nom: 'Paris', condition: 'Ensoleillé', temperature: 18, humidite: 45, vent: 12
  };

  get conditionEmoji(): string {
    switch (this.meteo.condition) {
      case 'Ensoleillé':
        return '☀️';
      case 'Nuageux':
        return '☁️';
      case 'Pluvieux':
        return '🌧️';
      default:
          return '🌤️';
    }
  }
}
