import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { AuthFacade } from '../lib/services/auth.facade';

describe('AuthFacade', () => {
  let authFacade: AuthFacade;
  const storeSpy = {
    select: jest.fn(),
    dispatch: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthFacade,
        {
          provide: Store,
          useValue: storeSpy,
        },
      ],
    });
    authFacade = TestBed.inject(AuthFacade);
    storeSpy.select.mockReturnValue(of(''));
  });

  it('authFacade: should be created', () => {
    expect(authFacade).toBeDefined();
  });

  it('init: should dispatch [Auth] init action', () => {
    authFacade.init();
    expect(storeSpy.dispatch).toHaveBeenCalledWith({ type: '[Auth] init' });
  });

  it('register: should dispatch [Auth] register action with the specified data', () => {
    authFacade.register({ username: 'username', email: 'email', fullName: 'Ivan Ivanovich', password: 'password' });
    expect(storeSpy.dispatch).toHaveBeenCalledWith({
      type: '[Auth] register',
      data: {
        username: 'username',
        email: 'email',
        full_name: 'Ivan Ivanovich',
        password: 'password',
      },
    });
  });

  it('login: should dispatch [Auth] login action with the UsernameLoginDataDTO data type if the user has entered a username', () => {
    authFacade.login({ usernameOrEmail: 'username', password: 'password' });
    expect(storeSpy.dispatch).toHaveBeenCalledWith({
      type: '[Auth] login',
      data: {
        username: 'username',
        password: 'password',
      },
    });
  });

  it('login: should dispatch [Auth] login action with the EmailLoginDataDTO data type if the user has entered a email', () => {
    authFacade.login({ usernameOrEmail: 'email@gmail.com', password: 'password' });
    expect(storeSpy.dispatch).toHaveBeenCalledWith({
      type: '[Auth] login',
      data: {
        email: 'email@gmail.com',
        password: 'password',
      },
    });
  });
});
