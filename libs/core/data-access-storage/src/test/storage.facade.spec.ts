import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { StorageFacade } from '../lib/services/storage.facade';
import { LocalStorageService } from '../lib/services/local-storage.service';
import { UserFacade } from '@auth/data-access';
import { SessionStorageService } from '../lib/services/session-storage.service';
import { RemoteStorageService } from '../lib/services/remote-storage.service';
import { of } from 'rxjs';

describe('StorageFacade', () => {
  const fakeUserFacade = {
    user$: of({ id: 2 }),
  };
  const fakeStorageService = {
    init: jest.fn(),
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    isExistKey: jest.fn(),
    clearStorage: jest.fn(),
  };
  let storageFacade: StorageFacade;
  beforeEach(() => {
    jest.resetAllMocks();
    TestBed.configureTestingModule({
      providers: [
        StorageFacade,
        {
          provide: UserFacade,
          useValue: fakeUserFacade,
        },
        {
          provide: LocalStorageService,
          useValue: fakeStorageService,
        },
        {
          provide: SessionStorageService,
          useValue: fakeStorageService,
        },
        {
          provide: RemoteStorageService,
          useValue: fakeStorageService,
        },
      ],
    });
    storageFacade = TestBed.inject(StorageFacade);
  });

  it('storageFacade: should be created', () => {
    expect(storageFacade).toBeTruthy();
    expect(fakeStorageService.init).toHaveBeenNthCalledWith(3, 2);
  });

  it('setItem: should call the setItem method of the storage class depending on the method and return response', fakeAsync(() => {
    fakeStorageService.setItem.mockReturnValue(of(true));
    storageFacade.setItem('a', 2).subscribe((result) => {
      expect(result).toBeTruthy();
    });
    storageFacade.setItem('a', 2, { method: 'local' });
    storageFacade.setItem('a', 2, { method: 'session' });
    storageFacade.setItem('a', 2, { method: 'remote' });
    expect(fakeStorageService.setItem).toHaveBeenNthCalledWith(4, 'a', 2);
    tick();
  }));

  it('setItem: should call the setItem of the remoteStorage if localStorage return false and method is default', () => {
    fakeStorageService.setItem.mockReturnValue(of(false));
    storageFacade.setItem('a', 2, { method: 'default' });
    expect(fakeStorageService.setItem).toHaveBeenCalledWith('a', 2);
  });

  it('getItem: should call the getItem method of the storage class depending on the method and return response', fakeAsync(() => {
    fakeStorageService.getItem.mockReturnValue(of(2));
    storageFacade.getItem('a').subscribe((result) => {
      expect(result).toBe(2);
    });
    storageFacade.getItem('a', { method: 'local' });
    storageFacade.getItem('a', { method: 'session' });
    storageFacade.getItem('a', { method: 'remote' });
    expect(fakeStorageService.getItem).toHaveBeenNthCalledWith(4, 'a');
    tick();
  }));

  it('getItem: should call the getItem of the remoteStorage if localStorage return null and method is default', () => {
    fakeStorageService.getItem.mockReturnValue(of(null));
    storageFacade.getItem('a', { method: 'default' }).subscribe();
    expect(fakeStorageService.getItem).toHaveBeenNthCalledWith(2, 'a');
  });

  it('removeItem: should call the removeItem method of the storage class depending on the method and return response', fakeAsync(() => {
    fakeStorageService.removeItem.mockReturnValue(of(true));
    storageFacade.removeItem('a').subscribe((result) => {
      expect(result).toBeTruthy();
    });
    storageFacade.removeItem('a', { method: 'local' });
    storageFacade.removeItem('a', { method: 'session' });
    storageFacade.removeItem('a', { method: 'remote' });
    expect(fakeStorageService.removeItem).toHaveBeenNthCalledWith(4, 'a');
    tick();
  }));

  it('removeItem: should call the removeItem of the remoteStorage if localStorage return false and method is default', () => {
    fakeStorageService.removeItem.mockReturnValue(of(false));
    storageFacade.removeItem('a', { method: 'default' }).subscribe();
    expect(fakeStorageService.removeItem).toHaveBeenNthCalledWith(2, 'a');
  });

  it('isExistKey: should call the isExistKey method of the storage class depending on the method and return response', fakeAsync(() => {
    fakeStorageService.isExistKey.mockReturnValue(of(true));
    storageFacade.isExistKey('a').subscribe((result) => {
      expect(result).toBeTruthy();
    });
    storageFacade.isExistKey('a', { method: 'local' });
    storageFacade.isExistKey('a', { method: 'session' });
    storageFacade.isExistKey('a', { method: 'remote' });
    expect(fakeStorageService.isExistKey).toHaveBeenNthCalledWith(4, 'a');
    tick();
  }));

  it('cleatStorage: should call the clearStorage method of all storage classes', fakeAsync(() => {
    storageFacade.clearStorage();
    expect(fakeStorageService.clearStorage).toHaveBeenCalledTimes(3);
    tick();
  }));
});
