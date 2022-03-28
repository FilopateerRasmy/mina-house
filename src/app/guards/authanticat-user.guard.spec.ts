import { TestBed } from '@angular/core/testing';

import { AuthanticatUserGuard } from './authanticat-user.guard';

describe('AuthanticatUserGuard', () => {
  let guard: AuthanticatUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthanticatUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
