import { TestBed } from '@angular/core/testing';

import { User } from '@/core/services/user/user';

describe('User', () => {
  let service: User;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(User);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
