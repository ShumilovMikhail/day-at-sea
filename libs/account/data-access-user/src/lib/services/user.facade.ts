import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  selectUser,
  selectUserError,
  selectUserLoading,
} from '../+state/user.selectors';
import { UserEntity, UserError } from '../types/user.models';
import { userActions } from '../+state/user.actions';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  private readonly store = inject(Store);

  loading$: Observable<boolean> = this.store.select(selectUserLoading);
  user$: Observable<UserEntity | null> = this.store.select(selectUser).pipe(
    tap((user: UserEntity | null) => {
      if (!user) {
        this.store.dispatch(userActions.getUser());
      }
    })
  );
  error$: Observable<UserError | null> = this.store.select(selectUserError);

  init() {
    this.store.dispatch(userActions.init());
  }
}
