import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { AuthFacade } from '../auth.facade';
import { authGuard } from '../auth.guard';
import { Observable, of } from 'rxjs';

describe('authGuard', () => {
  const fakeAuthFacade = {
    isAuthenticate$: of(false),
  };
  const fakeRouter = {
    router: jest.fn(),
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

    jest.resetAllMocks();
  });

  it('authGuard: should allow access if isAuthenticate is true', () => {
    jest.replaceProperty(fakeAuthFacade, 'isAuthenticate$', of(true));
    const activatedRoute = TestBed.inject(ActivatedRoute);
    const authGuardResponse = TestBed.runInInjectionContext(
      () => authGuard()(activatedRoute.snapshot, {} as RouterStateSnapshot) as Observable<boolean>
    );
    authGuardResponse.subscribe((response: boolean) => {
      expect(response).toBeTruthy();
    });
  });

  it('authGuard: should not allow access if isAuthenticate is false', () => {
    const activatedRoute = TestBed.inject(ActivatedRoute);
    const authGuardResponse = TestBed.runInInjectionContext(
      () => authGuard()(activatedRoute.snapshot, {} as RouterStateSnapshot) as Observable<boolean>
    );
    authGuardResponse.subscribe((response: boolean) => {
      expect(response).toBeFalsy();
    });
  });
});
