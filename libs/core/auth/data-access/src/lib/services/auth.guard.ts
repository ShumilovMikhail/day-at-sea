import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthFacade } from './auth.facade';
import { toObservable } from '@angular/core/rxjs-interop';

export function authGuard(): CanActivateFn {
  return (): Observable<boolean> => {
    const authFacade = inject(AuthFacade);
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
