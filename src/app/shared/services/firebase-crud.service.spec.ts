import { TestBed } from '@angular/core/testing';

import { FirebaseCRUDService } from './firebase-crud.service';

describe('FirebaseCRUDService', () => {
  let service: FirebaseCRUDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseCRUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
