import { inject, Injectable } from '@angular/core';
import { filter, Observable, of, switchMap } from 'rxjs';

import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';
import { RemoteStorageService } from './remote-storage.service';
import { StorageList, StorageOperationClearConfig, StorageOperationConfig } from '../types/storage.models';
import { AuthFacade, UserEntity } from '@auth/data-access';

@Injectable({ providedIn: 'root' })
export class StorageFacade {
  private readonly authFacade = inject(AuthFacade);
  private readonly storageList: StorageList;

  constructor(
    localStorageService: LocalStorageService,
    sessionStorageService: SessionStorageService,
    remoteStorageService: RemoteStorageService
  ) {
    this.storageList = {
      local: localStorageService,
      session: sessionStorageService,
      remote: remoteStorageService,
    };
    this.init();
  }

  public init(): void {
    this.authFacade.user$
      .pipe(filter((user: UserEntity | null): user is UserEntity => Boolean(user)))
      .subscribe((user) => {
        for (const key in this.storageList) {
          this.storageList[key].init(user.id);
        }
      });
  }

  public setItem(
    key: string,
    value: unknown,
    config: StorageOperationConfig = { method: 'default' }
  ): Observable<boolean> {
    if (!config.method || config.method === 'default') {
      return this.storageList['local']
        .setItem(key, value)
        .pipe(switchMap((result: boolean) => (result ? of(result) : this.storageList['remote'].setItem(key, value))));
    }
    return this.storageList[config.method].setItem(key, value);
  }

  public getItem<T>(key: string, config: StorageOperationConfig = { method: 'default' }): Observable<T | null> {
    if (!config.method || config.method === 'default') {
      return this.storageList['local']
        .getItem<T>(key)
        .pipe(switchMap((result: T | null) => (result ? of(result) : this.storageList['remote'].getItem<T>(key))));
    }
    return this.storageList[config.method].getItem(key);
  }

  public removeItem(key: string, config: StorageOperationConfig = { method: 'default' }): Observable<boolean> {
    if (!config.method || config.method === 'default') {
      return this.storageList['local']
        .removeItem(key)
        .pipe(switchMap((result: boolean) => (result ? of(result) : this.storageList['remote'].removeItem(key))));
    }
    return this.storageList[config.method].removeItem(key);
  }

  public isExistKey(key: string, config: StorageOperationConfig = { method: 'default' }): Observable<boolean> {
    if (!config.method || config.method === 'default') {
      return this.storageList['local'].isExistKey(key) || this.storageList['remote'].isExistKey(key);
    }
    return this.storageList[config.method].isExistKey(key);
  }

  public clearStorage(config: StorageOperationClearConfig = { method: 'all' }): void {
    if (!config.method || config.method === 'all') {
      for (const key in this.storageList) {
        this.storageList[key].clearStorage();
      }
      return;
    }
    this.storageList[config.method].clearStorage();
  }
}
