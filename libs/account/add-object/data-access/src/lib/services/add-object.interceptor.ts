import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { API_URL } from '@http';
import { AgencyFacade } from '@account/data-access-agency';

const shouldIntercept = (req: HttpRequest<unknown>, apiUrl: string): boolean => {
  return req.url === `${apiUrl}/add-object`;
};

export const addObjectInterceptor = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const agencyFacade = inject(AgencyFacade);
  const apiUrl = inject(API_URL);
  if (shouldIntercept(request, apiUrl)) {
    return agencyFacade.id$.pipe(
      filter((id: number | null): id is number => Boolean(id)),
      take(1),
      switchMap((id: number) => {
        const newUrl = `${apiUrl}/agencies/${id}/objects`;
        request = request.clone({
          url: newUrl,
        });
        return next(request).pipe(
          catchError((error: HttpErrorResponse) => {
            return throwError(() => error);
          })
        );
      })
    );
  }
  return next(request.clone());
};
