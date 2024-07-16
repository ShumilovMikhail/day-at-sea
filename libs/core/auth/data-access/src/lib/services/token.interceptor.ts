import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LocalStorageJwtService } from './local-storage-jwt.service';
import { API_URL } from '@http';

const shouldIntercept = (req: HttpRequest<unknown>): boolean => {
  const apiUrl = inject(API_URL);
  const urls: string[] = [`${apiUrl}/user`, `${apiUrl}/auth/me`, `${apiUrl}/agencies`, `${apiUrl}/objects`];

  for (const url of urls) {
    if (req.url.includes(url)) {
      console.log(req.url);
      return true;
    }
  }

  return false;
};

export const tokenInterceptor = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const localStorageJwtService = inject(LocalStorageJwtService);
  const token: string | null = localStorageJwtService.getToken();

  if (token && shouldIntercept(request)) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorageJwtService.removeToken();
      }
      return throwError(() => error);
    })
  );
};
