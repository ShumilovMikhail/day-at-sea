import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { ObjectFormStore } from './object-form.store';

export function addObjectGuard(): CanActivateFn {
  return (): Observable<boolean> => {
    const objectFormStore = inject(ObjectFormStore);
    const router = inject(Router);
    return objectFormStore.isNewForm$.pipe(
      filter((isNewForm: boolean | null): isNewForm is boolean => isNewForm !== null),
      map((isNewForm: boolean) => {
        if (!isNewForm) {
          return true;
        }
        router.navigateByUrl('account/add-object');
        return false;
      })
    );
  };
}
