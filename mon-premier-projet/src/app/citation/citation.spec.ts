import { testing } from '@angular/core';
import { CitationComponent } from './citation';

describe('CitationComponent', () => {
  beforeEach(async () => {
    await testing.TestBed.configureTestingModule({
      imports: [CitationComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = testing.TestBed.createComponent(CitationComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
