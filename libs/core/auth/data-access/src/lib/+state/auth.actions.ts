import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterDataDTO } from '../types/register.models';
import { EmailLoginDataDTO, LoginDataDTO } from '../types/login.models';
import { AuthError, AuthResponse, Token } from '../types/auth.models';

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
