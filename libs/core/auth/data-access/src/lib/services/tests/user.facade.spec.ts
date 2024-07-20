import { Store } from '@ngrx/store';
import { UserFacade } from '../user.facade';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

describe('UserFacade', () => {
  let userFacade: UserFacade;
  const storeSpy = {
    select: jest.fn(),
    dispatch: jest.fn(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserFacade,
        {
          provide: Store,
          useValue: storeSpy,
        },
      ],
    });
    userFacade = TestBed.inject(UserFacade);
    storeSpy.select.mockReturnValue(of(''));
    jest.replaceProperty(
      userFacade,
      'user$',
      of({
        id: 1,
        username: '',
        email: '',
        password: '',
      })
    );
  });

  it('userFacade: should be created', () => {
    expect(userFacade).toBeDefined();
  });

  it('changeUsername: should dispatch [Auth] changeUsername action with the specified data', () => {
    userFacade.changeUsername('name');
    expect(storeSpy.dispatch).toHaveBeenCalledWith({ id: 1, username: 'name', type: '[Auth] changeUsername' });
  });

  it('changeUsername: should throw error if user in null', () => {
    jest.replaceProperty(userFacade, 'user$', of(null));
    userFacade.changeUsername('name');
    expect(userFacade.changeUsername).toThrow(Error);
  });

  it('changeUserEmail: should dispatch [Auth] changeUserEmail action with the specified data', () => {
    userFacade.changeUserEmail('email');
    expect(storeSpy.dispatch).toHaveBeenCalledWith({ id: 1, email: 'email', type: '[Auth] changeUserEmail' });
  });

  it('changeUserEmail: should throw error if user in null', () => {
    jest.replaceProperty(userFacade, 'user$', of(null));
    userFacade.changeUserEmail('email');
    expect(userFacade.changeUserEmail).toThrow(Error);
  });

  it('changeUserPassword: should dispatch [Auth] changeUserPassword action with the specified data', () => {
    userFacade.changeUserPassword('password');
    expect(storeSpy.dispatch).toHaveBeenCalledWith({ id: 1, password: 'password', type: '[Auth] changeUserPassword' });
  });

  it('changeUserPassword: should throw error if user in null', () => {
    jest.replaceProperty(userFacade, 'user$', of(null));
    userFacade.changeUserPassword('password');
    expect(userFacade.changeUserPassword).toThrow(Error);
  });
});
