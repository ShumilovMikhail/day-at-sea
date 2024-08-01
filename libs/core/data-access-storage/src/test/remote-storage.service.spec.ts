import { BehaviorSubject, of } from 'rxjs';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RemoteStorageService } from '../lib/services/remote-storage.service';
import { HttpClient } from '@angular/common/http';
import { REMOTE_STORAGE_URL } from '../lib/services/remote-storage-url.token';

describe('RemoteStorageService', () => {
  const fakeHttpClient = {
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };
  const fakeStorageUrl = 'fakeurl';
  let remoteStorageService: RemoteStorageService;

  beforeEach(() => {
    jest.resetAllMocks();
    TestBed.configureTestingModule({
      providers: [
        RemoteStorageService,
        {
          provide: HttpClient,
          useValue: fakeHttpClient,
        },
        {
          provide: REMOTE_STORAGE_URL,
          useValue: fakeStorageUrl,
        },
      ],
    });
    remoteStorageService = TestBed.inject(RemoteStorageService);
  });

  it('remoteStorageService: should be created', () => {
    expect(remoteStorageService).toBeDefined();
  });

  it('init: should send request to remote storage and update keyList', fakeAsync(() => {
    const id = 2;
    jest.spyOn(fakeHttpClient, 'get').mockReturnValue(of({ a: true, b: true }));
    remoteStorageService.init(id);
    expect((remoteStorageService as unknown as { id: number }).id).toBe(2);
    expect(fakeHttpClient.get).toHaveBeenCalledWith('fakeurl/2.json?shallow=true');
    (remoteStorageService as unknown as { keyList: BehaviorSubject<Set<string>> }).keyList.subscribe((keyList) => {
      expect(keyList).toEqual(new Set(['a', 'b']));
    });
    tick();
  }));

  it('getItem: should return value from remote storage if it not exist in hash', fakeAsync(() => {
    const fakeRemoteStorageService = remoteStorageService as unknown as {
      keyList: BehaviorSubject<Set<string>>;
      id: number;
    };
    fakeRemoteStorageService.keyList.next(new Set(['a']));
    fakeRemoteStorageService.id = 2;
    fakeHttpClient.get.mockReturnValue(of(2));
    remoteStorageService.getItem('a').subscribe((value) => {
      expect(value).toBe(2);
    });
    expect(fakeHttpClient.get).toHaveBeenCalledWith('fakeurl/2/a.json');
    tick();
  }));

  it('getItem: should return value from hash if it exist in hash', fakeAsync(() => {
    const fakeRemoteStorageService = remoteStorageService as unknown as { valuesHash: Map<string, unknown> };
    jest.spyOn(fakeRemoteStorageService.valuesHash, 'get');
    fakeRemoteStorageService.valuesHash.set('a', 2);
    remoteStorageService.getItem('a').subscribe((value) => {
      expect(value).toBe(2);
    });
    expect(fakeRemoteStorageService.valuesHash.get).toHaveBeenCalledWith('a');
    tick();
  }));

  it('setItem: should send request to remote storage with put method and update valuesHash and keyList then return true', fakeAsync(() => {
    const fakeRemoteStorageService = remoteStorageService as unknown as {
      valuesHash: Map<string, unknown>;
      keyList: BehaviorSubject<Set<string>>;
      id: number;
    };
    fakeRemoteStorageService.keyList.next(new Set());
    fakeHttpClient.put.mockReturnValue(of(2));
    remoteStorageService.setItem('a', 2).subscribe((response) => {
      expect(response).toBeTruthy();
    });
    fakeRemoteStorageService.keyList.subscribe((keyList) => {
      expect(keyList).toEqual(new Set(['a']));
    });
    expect(fakeRemoteStorageService.valuesHash.get('a')).toBe(2);
    tick();
  }));

  it('removeItem: should send request to remote storage with delete method and update valuesHash and keyList then return true', fakeAsync(() => {
    const fakeRemoteStorageService = remoteStorageService as unknown as {
      valuesHash: Map<string, unknown>;
      keyList: BehaviorSubject<Set<string>>;
      id: number;
    };
    fakeRemoteStorageService.keyList.next(new Set('a'));
    fakeHttpClient.delete.mockReturnValue(of(null));
    remoteStorageService.removeItem('a').subscribe((response) => {
      expect(response).toBeTruthy();
    });
    fakeRemoteStorageService.keyList.subscribe((keyList) => {
      expect(keyList).toEqual(new Set([]));
    });
    expect(fakeRemoteStorageService.valuesHash.get('a')).toBeUndefined();
    tick();
  }));

  it('isExistKey: should return true if key exist in keyList', fakeAsync(() => {
    const fakeRemoteStorageService = remoteStorageService as unknown as {
      keyList: BehaviorSubject<Set<string>>;
    };
    fakeRemoteStorageService.keyList.next(new Set('a'));
    remoteStorageService.isExistKey('a').subscribe((response) => {
      expect(response).toBeTruthy();
    });
    tick();
  }));

  it('isExistKey: should return false if key not exist in keyList', fakeAsync(() => {
    const fakeRemoteStorageService = remoteStorageService as unknown as {
      keyList: BehaviorSubject<Set<string>>;
    };
    fakeRemoteStorageService.keyList.next(new Set());
    remoteStorageService.isExistKey('a').subscribe((response) => {
      expect(response).toBeFalsy();
    });
    tick();
  }));

  it('removeItem: should send request to remote storage and clear valuesHash and keyList', fakeAsync(() => {
    const fakeRemoteStorageService = remoteStorageService as unknown as {
      valuesHash: Map<string, unknown>;
      keyList: BehaviorSubject<Set<string>>;
      id: number;
    };
    fakeRemoteStorageService.id = 2;
    fakeRemoteStorageService.keyList.next(new Set('a'));
    fakeRemoteStorageService.valuesHash.set('a', 2);
    fakeHttpClient.delete.mockReturnValue(of(null));
    remoteStorageService.clearStorage();
    fakeRemoteStorageService.keyList.subscribe((keyList) => {
      expect(keyList).toEqual(new Set([]));
    });
    expect(fakeHttpClient.delete).toHaveBeenCalledWith('fakeurl/2.json');
    expect(fakeRemoteStorageService.valuesHash).toEqual(new Map());
    tick();
  }));
});
