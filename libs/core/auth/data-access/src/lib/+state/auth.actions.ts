import { createActionGroup, emptyProps, props } from '@ngrx/store';

import {
  AuthError,
  AuthResponse,
  EmailLoginDataDTO,
  LoginDataDTO,
  RegisterDataDTO,
} from './auth.models';
import { Token } from '../types';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    init: emptyProps(),
    register: props<{ data: RegisterDataDTO }>(),
    login: props<{ data: LoginDataDTO | EmailLoginDataDTO }>(),
    loadTokenFromStorage: emptyProps(),

    registerSuccess: props<AuthResponse>(),
    loginSuccess: props<AuthResponse>(),
    loadTokenFromStorageSuccess: props<{ authToken: Token }>(),

    registerFailure: props<{ error: AuthError }>(),
    loginFailure: props<{ error: AuthError }>(),
    loadTokenFromStorageFailure: emptyProps(),
  },
});
