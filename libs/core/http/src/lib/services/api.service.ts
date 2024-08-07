import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../types/api-url.token';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly apiUrl = inject(API_URL);
  private readonly http = inject(HttpClient);

  public get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${url}`, {
      headers: this.headers,
      params,
    });
  }

  public post<T>(url: string, data: unknown): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${url}`, JSON.stringify(data), {
      headers: this.headers,
    });
  }

  public put<T>(url: string, data: unknown): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${url}`, JSON.stringify(data), {
      headers: this.headers,
    });
  }

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${url}`, {
      headers: this.headers,
    });
  }

  private get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return new HttpHeaders(headersConfig);
  }
}
