import { TestBed } from '@angular/core/testing';

import { HuntingsService } from './huntings.service';

describe('HuntingsService', () => {
  let service: HuntingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HuntingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
