import { fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { lastValueFrom, Observable, of } from 'rxjs';

import { AuthFacade } from '../lib/services/auth.facade';
import { authGuard } from '../lib/services/auth.guard';

describe('authGuard', () => {
  const fakeAuthFacade = {
    isAuthenticate$: of(false),
  };
  const fakeRouter = {
    navigate: jest.fn(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {},
          },
        },
        {
          provide: AuthFacade,
          useValue: fakeAuthFacade,
        },
        {
          provide: Router,
          useValue: fakeRouter,
        },
      ],
    });
  });

  it('authGuard: should not allow access if isAuthenticate is false', fakeAsync(() => {
    jest.replaceProperty(fakeAuthFacade, 'isAuthenticate$', of(false));
    const activatedRoute = TestBed.inject(ActivatedRoute);
    const authGuardResponse = TestBed.runInInjectionContext(
      () => authGuard()(activatedRoute.snapshot, {} as RouterStateSnapshot) as Observable<boolean>
    );
    authGuardResponse.subscribe(() => {
      expect(fakeRouter.navigate).toHaveBeenCalledWith(['/']);
    });
  }));

  it('authGuard: should allow access if isAuthenticate is true', async () => {
    jest.replaceProperty(fakeAuthFacade, 'isAuthenticate$', of(true));
    const activatedRoute = TestBed.inject(ActivatedRoute);
    const authGuardResponse = TestBed.runInInjectionContext(
      () => authGuard()(activatedRoute.snapshot, {} as RouterStateSnapshot) as Observable<boolean>
    );
    await expect(lastValueFrom(authGuardResponse)).resolves.toBeTruthy();
  });
});
