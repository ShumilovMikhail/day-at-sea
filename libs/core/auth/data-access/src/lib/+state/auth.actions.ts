import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterDataDTO } from '../types/register.models';
import { EmailLoginDataDTO, UsernameLoginDataDTO } from '../types/login.models';
import { AuthResponse, Token } from '../types/auth.models';
import { ResponseError } from '@http';
import { UserEntity } from '../types/user.models';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    init: emptyProps(),
    register: props<{ data: RegisterDataDTO }>(),
    login: props<{ data: UsernameLoginDataDTO | EmailLoginDataDTO }>(),
    loadTokenFromStorage: emptyProps(),
    getUser: emptyProps(),
    changeUsername: props<{ id: number; username: string }>(),

    getUserSuccess: props<{ user: UserEntity }>(),
    registerSuccess: props<AuthResponse>(),
    loginSuccess: props<AuthResponse>(),
    loadTokenFromStorageSuccess: props<{ authToken: Token }>(),
    changeUsernameSuccess: props<{ user: UserEntity }>(),

    getUserFailure: props<{ error: ResponseError }>(),
    registerFailure: props<{ error: ResponseError }>(),
    loginFailure: props<{ error: ResponseError }>(),
    loadTokenFromStorageFailure: emptyProps(),
    changeUsernameFailure: props<{ error: ResponseError }>(),
  },
});
