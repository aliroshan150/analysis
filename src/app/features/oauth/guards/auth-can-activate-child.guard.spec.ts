import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { authCanActivateChildGuard } from './auth-can-activate-child.guard';

describe('authCanActivateChildGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authCanActivateChildGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
