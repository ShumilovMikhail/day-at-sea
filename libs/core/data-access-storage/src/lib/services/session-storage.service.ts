import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { DataStorage } from '../types/storage.models';

@Injectable({ providedIn: 'root' })
export class SessionStorageService implements DataStorage {
  private keysList: Set<string> | null = null;

  public init(): void {
    this.keysList = new Set();
    for (const key in sessionStorage) {
      this.keysList?.add(key);
    }
  }

  public setItem(key: string, value: unknown): Observable<boolean> {
    if (!this.keysList) {
      throw Error('SessionStorageService: You cannot use service methods before initialize');
    }
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      this.keysList?.add(key);
      return of(true);
    } catch {
      return of(false);
    }
  }

  public getItem<T>(key: string): Observable<T | null> {
    if (!this.keysList) {
      throw Error('SessionStorageService: You cannot use service methods before initialize');
    }
    if (this.keysList.has(key)) {
      return of(JSON.parse(sessionStorage.getItem(key)!) as T);
    }
    return of(null);
  }

  public removeItem(key: string): Observable<boolean> {
    if (!this.keysList) {
      throw Error('SessionStorageService: You cannot use service methods before initialize');
    }
    if (this.keysList.has(key)) {
      sessionStorage.removeItem(key);
      this.keysList?.delete(key);
      return of(true);
    }
    return of(false);
  }

  public isExistKey(key: string): Observable<boolean> {
    if (!this.keysList) {
      throw Error('SessionStorageService: You cannot use service methods before initialize');
    }
    return of(this.keysList.has(key));
  }

  public clearStorage(): void {
    if (!this.keysList) {
      throw Error('SessionStorageService: You cannot use service methods before initialize');
    }
    sessionStorage.clear();
    this.keysList?.clear();
  }
}
