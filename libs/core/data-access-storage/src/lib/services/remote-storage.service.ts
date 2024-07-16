import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { REMOTE_STORAGE_URL } from './remote-storage-url.token';
import { DataStorage, KeyListResponse } from '../types/storage.models';
import { BehaviorSubject, catchError, filter, map, Observable, of, Subject, switchMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RemoteStorageService implements DataStorage {
  private readonly http = inject(HttpClient);
  private readonly storageUrl = inject(REMOTE_STORAGE_URL);
  private readonly id$: BehaviorSubject<number> = new BehaviorSubject(null).pipe(
    filter((id: number | null): id is number => Boolean(id))
  ) as BehaviorSubject<number>;
  private readonly keysList: BehaviorSubject<Set<string>> = new BehaviorSubject(null).pipe(
    filter((keyList: Set<string> | null): keyList is Set<string> => Boolean(keyList))
  ) as BehaviorSubject<Set<string>>;
  private id: number | null = null;
  private readonly valuesHash: Map<string, unknown> = new Map();

  public init(...args: unknown[]): void {
    this.id$.next(args[0] as number);
    this.id$
      .pipe(
        switchMap((id: number) => {
          this.id = id;
          return this.http.get<KeyListResponse>(`${this.storageUrl}/${id}.json?shallow=true`);
        }),
        take(1)
      )
      .subscribe((keyList: KeyListResponse) => {
        this.keysList.next(new Set(Object.keys(keyList ?? {})));
      });
  }

  public getItem<T>(key: string): Observable<T | null> {
    if (this.valuesHash.has(key)) {
      return of(this.valuesHash.get(key) as T);
    }
    return this.keysList.pipe(
      take(1),
      map((keyList: Set<string>) => keyList.has(key)),
      switchMap((isExist: boolean) => {
        return this.http
          .get<T>(`${this.storageUrl}/${this.id}/${key}.json`)
          .pipe(tap((value: T) => this.valuesHash.set(key, value)));
      })
    );
  }

  public setItem(key: string, value: unknown): Observable<boolean> {
    return this.keysList.pipe(
      take(1),
      switchMap((keyList: Set<string>) => {
        return this.http.put<unknown>(`${this.storageUrl}/${this.id}/${key}.json`, value).pipe(
          take(1),
          tap((value: unknown) => {
            this.keysList.next(new Set([...keyList, key]));
            this.valuesHash.set(key, value);
          }),
          map((value: unknown) => true),
          catchError((value: unknown) => of(false))
        );
      })
    );
  }

  public removeItem(key: string): Observable<boolean> {
    return this.keysList.pipe(
      take(1),
      map((keyList: Set<string>) => (keyList.has(key) ? keyList : null)),
      switchMap((keyList: Set<string> | null) => {
        return keyList
          ? this.http.delete<null>(`${this.storageUrl}/${this.id}/${key}.json`).pipe(
              tap(() => {
                this.valuesHash.delete(key);
                const newKeysList = new Set([...keyList]);
                newKeysList.delete(key);
                this.keysList.next(newKeysList);
              }),
              map(() => true)
            )
          : of(false);
      })
    );
  }

  public isExistKey(key: string): Observable<boolean> {
    return this.keysList.pipe(
      take(1),
      map((keyList: Set<string>) => {
        return keyList.has(key);
      })
    );
  }

  public clearStorage(): void {
    this.keysList.pipe(
      take(1),
      switchMap((keyList: Set<string>) => {
        return this.http.delete<null>(`${this.storageUrl}/${this.id}.json`).pipe(
          tap(() => {
            this.valuesHash.clear();
            this.keysList.next(new Set());
          })
        );
      })
    );
  }
}
