import { TestBed } from '@angular/core/testing';

import { WalletSignService } from './wallet-sign.service';

describe('WalletSignService', () => {
  let service: WalletSignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletSignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
