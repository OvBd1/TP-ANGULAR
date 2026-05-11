import { testing } from '@angular/core';
import { AppComponent } from './app';

describe('AppComponent', () => {
  beforeEach(async () => {
    await testing.TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = testing.TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
