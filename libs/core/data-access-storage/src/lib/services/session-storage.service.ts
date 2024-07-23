import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, take, tap } from 'rxjs';

import { DataStorage } from '../types/storage.models';

@Injectable({ providedIn: 'root' })
export class SessionStorageService implements DataStorage {
  private readonly keyList: BehaviorSubject<Set<string>> = new BehaviorSubject(null).pipe(
    filter((keyList: Set<string> | null): keyList is Set<string> => Boolean(keyList))
  ) as BehaviorSubject<Set<string>>;

  public init(): void {
    const keyList: Set<string> = new Set(Object.keys(sessionStorage));
    this.keyList.next(keyList);
  }

  public setItem(key: string, value: unknown): Observable<boolean> {
    return this.keyList.pipe(
      take(1),
      map((keyList: Set<string>) => {
        try {
          sessionStorage.setItem(key, JSON.stringify(value));
          this.keyList?.next(new Set([...keyList, key]));
          return true;
        } catch {
          return false;
        }
      })
    );
  }

  public getItem<T>(key: string): Observable<T | null> {
    return this.keyList.pipe(
      take(1),
      map((keyList: Set<string>) => {
        if (keyList.has(key)) {
          const valueJSON: string | null = sessionStorage.getItem(key);
          let value = null;
          try {
            value = valueJSON ? (JSON.parse(valueJSON) as T) : null;
          } catch {
            value = valueJSON;
          }
          return value as T;
        }
        return null;
      })
    );
  }

  public removeItem(key: string): Observable<boolean> {
    return this.keyList.pipe(
      take(1),
      map((keyList: Set<string>) => {
        if (keyList.has(key)) {
          sessionStorage.removeItem(key);
          const newKeyList = new Set([...keyList]);
          newKeyList.delete(key);
          this.keyList.next(newKeyList);
          return true;
        }
        return false;
      })
    );
  }

  public isExistKey(key: string): Observable<boolean> {
    return this.keyList.pipe(
      take(1),
      map((keyList: Set<string>) => keyList.has(key))
    );
  }

  public clearStorage(): void {
    this.keyList
      .pipe(
        take(1),
        tap((keyList: Set<string>) => {
          sessionStorage.clear();
          this.keyList?.next(new Set());
        })
      )
      .subscribe(() => true);
  }
}
