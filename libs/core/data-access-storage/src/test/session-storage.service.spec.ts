import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SessionStorageService } from '../lib/services/session-storage.service';

describe('SessionStorageService', () => {
  let sessionStorageService: SessionStorageService;
  const fakeSessionStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
    TestBed.configureTestingModule({
      providers: [SessionStorageService],
    });
    Object.defineProperty(window, 'sessionStorage', { value: fakeSessionStorage });
    sessionStorageService = TestBed.inject(SessionStorageService);
    jest.replaceProperty(
      sessionStorageService as unknown as { keyList: BehaviorSubject<Set<string>> },
      'keyList',
      new BehaviorSubject(new Set(['a', 'b']))
    );
  });

  it('sessionStorageService: should be created', () => {
    expect(sessionStorageService).toBeDefined();
  });

  it('init: should take the keys from sessionStorage and pass them to keyList', async () => {
    jest.replaceProperty(
      sessionStorageService as unknown as { keyList: BehaviorSubject<null> },
      'keyList',
      new BehaviorSubject(null)
    );
    Object.defineProperty(window, 'sessionStorage', { value: { a: 1, b: 1 } });
    sessionStorageService.init();
    await expect(
      firstValueFrom((sessionStorageService as unknown as { keyList: BehaviorSubject<Set<string>> }).keyList)
    ).resolves.toEqual(new Set(['a', 'b']));
  });

  it('setItem: should put the key data into sessionStorage if there is enough memory and the keyList exists, and also put the key into the keyList', fakeAsync(() => {
    sessionStorageService.setItem('key', 'value').subscribe((response) => {
      expect(response).toBeTruthy();
    });
    (sessionStorageService as unknown as { keyList: BehaviorSubject<Set<string>> }).keyList.subscribe((keyList) => {
      expect(keyList).toEqual(new Set(['a', 'b', 'key']));
    });
    expect(fakeSessionStorage.setItem).toHaveBeenCalledWith('key', JSON.stringify('value'));
    tick();
  }));

  it('setItem: should throw Error if there is not enough memory and return false', fakeAsync(() => {
    fakeSessionStorage.setItem.mockImplementation(() => {
      throw Error;
    });
    sessionStorageService.setItem('key', 'value').subscribe((response) => {
      expect(response).toBeFalsy();
    });
    (sessionStorageService as unknown as { keyList: BehaviorSubject<Set<string>> }).keyList.subscribe((keyList) => {
      expect(keyList).toEqual(new Set(['a', 'b']));
    });
    tick();
  }));

  it('getItem: should return a value from sessionStorage if keyList contains a key', fakeAsync(() => {
    fakeSessionStorage.getItem.mockReturnValue('value');
    sessionStorageService.getItem('a').subscribe((response) => {
      expect(response).toBe('value');
    });
    expect(fakeSessionStorage.getItem).toHaveBeenCalledWith('a');
    tick();
  }));

  it('getItem: should return null if not keyList contains a key', fakeAsync(() => {
    sessionStorageService.getItem('b').subscribe((response) => {
      expect(response).toBeNull();
    });
    expect(fakeSessionStorage.getItem).toHaveBeenCalledWith('b');
    tick();
  }));

  it('removeItem: should return true and remove value from sessionStorage if keyList contains a key', fakeAsync(() => {
    sessionStorageService.removeItem('a').subscribe((response) => {
      expect(response).toBe(true);
    });
    (sessionStorageService as unknown as { keyList: BehaviorSubject<Set<string>> }).keyList.subscribe((keyList) => {
      expect(keyList).toEqual(new Set(['b']));
    });
    expect(fakeSessionStorage.removeItem).toHaveBeenCalledWith('a');
    tick();
  }));

  it('removeItem: should return false if not keyList contains a key', fakeAsync(() => {
    sessionStorageService.removeItem('c').subscribe((response) => {
      expect(response).toBeFalsy();
    });
    expect(fakeSessionStorage.removeItem).not.toHaveBeenCalledWith('c');
    tick();
  }));

  it('isExistKey: should return true if keyList contains a key', fakeAsync(() => {
    sessionStorageService.isExistKey('a').subscribe((response) => {
      expect(response).toBe(true);
    });
    tick();
  }));

  it('isExistKey: should return false if not keyList contains a key', fakeAsync(() => {
    sessionStorageService.isExistKey('c').subscribe((response) => {
      expect(response).toBeFalsy();
    });
    tick();
  }));

  it('clearStorage: should clear keyList and call sessionStorage.clear()', fakeAsync(() => {
    sessionStorageService.clearStorage();
    (sessionStorageService as unknown as { keyList: BehaviorSubject<Set<string>> }).keyList.subscribe((keyList) => {
      expect(keyList).toEqual(new Set());
    });
    expect(fakeSessionStorage.clear).toHaveBeenCalled();
    tick();
  }));
});
