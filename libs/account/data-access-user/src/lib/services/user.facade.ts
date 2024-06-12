import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  selectUser,
  selectUserError,
  selectUserLoading,
} from '../+state/user.selectors';
import { UserEntity } from '../types/user.models';
import { userActions } from '../+state/user.actions';
import { ResponseError } from '@http';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  private readonly store = inject(Store);

  loading$: Observable<boolean> = this.store.select(selectUserLoading);
  user$: Observable<UserEntity | null> = this.store.select(selectUser);
  error$: Observable<ResponseError | null> = this.store.select(selectUserError);

  init() {
    this.store.dispatch(userActions.init());
  }
}
