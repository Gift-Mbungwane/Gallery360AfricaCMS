import { TestBed } from '@angular/core/testing';

import { PaymentDetailsGuard } from './payment-details.guard';

describe('PaymentDetailsGuard', () => {
  let guard: PaymentDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PaymentDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
