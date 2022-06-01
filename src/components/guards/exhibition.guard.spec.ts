import { TestBed } from '@angular/core/testing';

import { ExhibitionGuard } from './exhibition.guard';

describe('ExhibitionGuard', () => {
  let guard: ExhibitionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExhibitionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
