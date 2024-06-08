import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { AuthError, AuthResponse, RegisterDataDTO } from './auth.models';
import { Token } from '../types';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    init: emptyProps(),
    register: props<{ data: RegisterDataDTO }>(),
    loadTokenFromStorage: emptyProps(),

    registerSuccess: props<AuthResponse>(),
    loadTokenFromStorageSuccess: props<{ authToken: Token }>(),

    registerFailure: props<{ error: AuthError }>(),
    loadTokenFromStorageFailure: emptyProps(),
  },
});
