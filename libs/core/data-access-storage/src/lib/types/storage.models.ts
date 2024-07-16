import { Observable } from 'rxjs';

export interface DataStorage {
  init: (...args: unknown[]) => void;
  setItem(key: string, value: unknown): Observable<boolean>;
  getItem<T>(key: string): Observable<T | null>;
  removeItem(key: string): Observable<boolean>;
  isExistKey(key: string): Observable<boolean>;
  clearStorage(): void;
}

export interface KeyListResponse {
  [key: string]: boolean;
}

export interface StorageList {
  [key: string]: DataStorage;
}

export interface StorageOperationConfig {
  method?: 'local' | 'session' | 'remote' | 'default';
}

export interface StorageOperationClearConfig {
  method?: 'local' | 'session' | 'remote' | 'all';
}
