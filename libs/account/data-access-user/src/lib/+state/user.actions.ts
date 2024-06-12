import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { UserEntity } from '../types/user.models';
import { ResponseError } from '@http';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    init: emptyProps(),
    getUser: emptyProps(),

    getUserSuccess: props<{ user: UserEntity }>(),

    getUserFailure: props<{ error: ResponseError }>(),
  },
});
