import { TestBed } from '@angular/core/testing';
import { LocalStorageJwtService } from '../local-storage-jwt.service';

describe('LocalStorageJwtService', () => {
  let localStorageJwtService: LocalStorageJwtService;
  const fakeLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  };
  const jwtKey = 'Token';
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageJwtService],
    });
    localStorageJwtService = TestBed.inject(LocalStorageJwtService);
    jest.replaceProperty(localStorageJwtService as unknown as { jwtKey: string }, 'jwtKey', jwtKey);
    jest.spyOn(localStorage, 'getItem');
    jest.spyOn(localStorage, 'setItem');
    jest.spyOn(localStorage, 'removeItem');
    Object.defineProperty(window, 'localStorage', { value: fakeLocalStorage });
  });

  it('LocalStorageJwtService: should be created', () => {
    expect(localStorageJwtService).toBeDefined();
  });

  it('setToken: should be call localStorage.setItem with the specified data', () => {
    localStorageJwtService.setToken('token');
    expect(localStorage.setItem).toHaveBeenCalledWith(jwtKey, 'token');
  });

  it('getToken: should be call localStorage.getItem with token and return token', () => {
    fakeLocalStorage.getItem.mockReturnValue('token');
    expect(localStorageJwtService.getToken()).toBe('token');
    expect(localStorage.getItem).toHaveBeenCalledWith(jwtKey);
  });

  it('removeToken: should be call localStorage.removeItem with token', () => {
    localStorageJwtService.removeToken();
    expect(localStorage.removeItem).toHaveBeenCalledWith(jwtKey);
  });
});
