import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { LocalStorageService } from '../lib/services/local-storage.service';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

describe('LocalStorageService', () => {
  let localStorageService: LocalStorageService;
  const fakeLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });
    Object.defineProperty(window, 'localStorage', { value: fakeLocalStorage });
    localStorageService = TestBed.inject(LocalStorageService);
    jest.replaceProperty(
      localStorageService as unknown as { keyList: BehaviorSubject<Set<string>> },
      'keyList',
      new BehaviorSubject(new Set(['a', 'b']))
    );
  });

  it('localStorageService: should be created', () => {
    expect(localStorageService).toBeDefined();
  });

  it('init: should take the keys from localStorage and pass them to keyList', async () => {
    jest.replaceProperty(
      localStorageService as unknown as { keyList: BehaviorSubject<null> },
      'keyList',
      new BehaviorSubject(null)
    );
    Object.defineProperty(window, 'localStorage', { value: { a: 1, b: 2 } });
    localStorageService.init();
    await expect(
      firstValueFrom((localStorageService as unknown as { keyList: BehaviorSubject<Set<string>> }).keyList)
    ).resolves.toEqual(new Set(['a', 'b']));
  });

  it('setItem: should put the key data into localStorage if there is enough memory and the keyList exists, and also put the key into the keyList', fakeAsync(() => {
    localStorageService.setItem('key', 'value').subscribe((response) => {
      expect(response).toBeTruthy();
    });
    (localStorageService as unknown as { keyList: BehaviorSubject<Set<string>> }).keyList.subscribe((keyList) => {
      expect(keyList).toEqual(new Set(['a', 'b', 'key']));
    });
    expect(fakeLocalStorage.setItem).toHaveBeenCalledWith('key', JSON.stringify('value'));
    tick();
  }));

  it('setItem: should throw Error if there is not enough memory and return false', fakeAsync(() => {
    fakeLocalStorage.setItem.mockImplementation(() => {
      throw Error;
    });
    localStorageService.setItem('key', 'value').subscribe((response) => {
      expect(response).toBeFalsy();
    });
    (localStorageService as unknown as { keyList: BehaviorSubject<Set<string>> }).keyList.subscribe((keyList) => {
      expect(keyList).toEqual(new Set(['a', 'b']));
    });
    tick();
  }));

  it('getItem: should return a value from localStorage if keyList contains a key', fakeAsync(() => {
    fakeLocalStorage.getItem.mockReturnValue('value');
    localStorageService.getItem('a').subscribe((response) => {
      expect(response).toBe('value');
    });
    expect(fakeLocalStorage.getItem).toHaveBeenCalledWith('a');
    tick();
  }));

  it('getItem: should return null if not keyList contains a key', fakeAsync(() => {
    localStorageService.getItem('b').subscribe((response) => {
      expect(response).toBeNull();
    });
    expect(fakeLocalStorage.getItem).toHaveBeenCalledWith('b');
    tick();
  }));

  it('removeItem: should return true and remove value from localStorage if keyList contains a key', fakeAsync(() => {
    localStorageService.removeItem('a').subscribe((response) => {
      expect(response).toBe(true);
    });
    (localStorageService as unknown as { keyList: BehaviorSubject<Set<string>> }).keyList.subscribe((keyList) => {
      expect(keyList).toEqual(new Set(['b']));
    });
    expect(fakeLocalStorage.removeItem).toHaveBeenCalledWith('a');
    tick();
  }));

  it('removeItem: should return false if not keyList contains a key', fakeAsync(() => {
    localStorageService.removeItem('c').subscribe((response) => {
      expect(response).toBeFalsy();
    });
    expect(fakeLocalStorage.removeItem).not.toHaveBeenCalledWith('c');
    tick();
  }));

  it('isExistKey: should return true if keyList contains a key', fakeAsync(() => {
    localStorageService.isExistKey('a').subscribe((response) => {
      expect(response).toBe(true);
    });
    tick();
  }));

  it('isExistKey: should return false if not keyList contains a key', fakeAsync(() => {
    localStorageService.isExistKey('c').subscribe((response) => {
      expect(response).toBeFalsy();
    });
    tick();
  }));

  it('clearStorage: should clear keyList and call localStorage.clear()', fakeAsync(() => {
    localStorageService.clearStorage();
    (localStorageService as unknown as { keyList: BehaviorSubject<Set<string>> }).keyList.subscribe((keyList) => {
      expect(keyList).toEqual(new Set());
    });
    expect(fakeLocalStorage.clear).toHaveBeenCalled();
    tick();
  }));
});
