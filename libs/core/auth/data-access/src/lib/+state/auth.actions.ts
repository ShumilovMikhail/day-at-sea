import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterDataDTO } from '../types/register.models';
import { EmailLoginDataDTO, LoginDataDTO } from '../types/login.models';
import { AuthResponse, Token } from '../types/auth.models';
import { ResponseError } from '@http';

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

    registerFailure: props<{ error: ResponseError }>(),
    loginFailure: props<{ error: ResponseError }>(),
    loadTokenFromStorageFailure: emptyProps(),
  },
});
