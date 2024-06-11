import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { UserEntity, UserError } from '../types/user.models';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    init: emptyProps(),
    getUser: emptyProps(),

    getUserSuccess: props<{ user: UserEntity }>(),

    getUserFailure: props<{ error: UserError }>(),
  },
});
