import { TestBed } from '@angular/core/testing';

import { EmailAuthenticatorService } from './email-authenticator.service';

describe('EmailAuthenticatorService', () => {
  let service: EmailAuthenticatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailAuthenticatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
