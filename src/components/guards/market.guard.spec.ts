import { TestBed } from '@angular/core/testing';

import { MarketGuard } from './market.guard';

describe('MarketGuard', () => {
  let guard: MarketGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MarketGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
