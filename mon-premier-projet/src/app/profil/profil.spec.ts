import { testing } from '@angular/core';
import { ProfilComponent } from './profil';

describe('ProfilComponent', () => {
  beforeEach(async () => {
    await testing.TestBed.configureTestingModule({
      imports: [ProfilComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = testing.TestBed.createComponent(ProfilComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
