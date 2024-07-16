import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { DataStorage } from '../types/storage.models';

@Injectable({ providedIn: 'root' })
export class LocalStorageService implements DataStorage {
  private keysList: Set<string> | null = null;

  public init(): void {
    this.keysList = new Set();
    for (const key in localStorage) {
      this.keysList?.add(key);
    }
  }

  public setItem(key: string, value: unknown): Observable<boolean> {
    if (!this.keysList) {
      throw Error('LocalStorageService: You cannot use service methods before initialize');
    }
    try {
      localStorage.setItem(key, JSON.stringify(value));
      this.keysList?.add(key);
      return of(true);
    } catch {
      return of(false);
    }
  }

  public getItem<T>(key: string): Observable<T | null> {
    if (!this.keysList) {
      throw Error('LocalStorageService: You cannot use service methods before initialize');
    }
    if (this.keysList.has(key)) {
      const valueJSON: string | null = localStorage.getItem(key);
      let value = null;
      try {
        value = valueJSON ? (JSON.parse(valueJSON) as T) : null;
      } catch {
        value = valueJSON;
      }
      return of(value as T);
    }
    return of(null);
  }

  public removeItem(key: string): Observable<boolean> {
    if (!this.keysList) {
      throw Error('LocalStorageService: You cannot use service methods before initialize');
    }
    if (this.keysList.has(key)) {
      localStorage.removeItem(key);
      this.keysList?.delete(key);
      return of(true);
    }
    return of(false);
  }

  public isExistKey(key: string): Observable<boolean> {
    if (!this.keysList) {
      throw Error('LocalStorageService: You cannot use service methods before initialize');
    }
    return of(this.keysList.has(key));
  }

  public clearStorage(): void {
    if (!this.keysList) {
      throw Error('LocalStorageService: You cannot use service methods before initialize');
    }
    localStorage.clear();
    this.keysList?.clear();
  }
}
