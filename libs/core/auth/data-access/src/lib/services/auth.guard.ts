import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthFacadeSignal } from './auth.facade-signal';
import { toObservable } from '@angular/core/rxjs-interop';

export function authGuard(): CanActivateFn {
  return (): Observable<boolean> => {
    const authFacade = inject(AuthFacadeSignal);
    const router = inject(Router);
    return toObservable(authFacade.isAuthenticate$).pipe(
      tap((isAuthenticate) => {
        if (isAuthenticate) {
          return;
        }
        router.navigate(['/']);
      })
    );
  };
}
