import { TestBed } from '@angular/core/testing';

import { FieldApiService } from './field-api-service';

describe('FieldApiService', () => {
  let service: FieldApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
