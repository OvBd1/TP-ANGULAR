import { testing } from '@angular/core';
import { MeteoComponent } from './meteo';

describe('MeteoComponent', () => {
  beforeEach(async () => {
    await testing.TestBed.configureTestingModule({
      imports: [MeteoComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = testing.TestBed.createComponent(MeteoComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
