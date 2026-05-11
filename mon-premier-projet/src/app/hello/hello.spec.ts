import { testing } from '@angular/core';
import { HelloComponent } from './hello';

describe('HelloComponent', () => {
  beforeEach(async () => {
    await testing.TestBed.configureTestingModule({
      imports: [HelloComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = testing.TestBed.createComponent(HelloComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
