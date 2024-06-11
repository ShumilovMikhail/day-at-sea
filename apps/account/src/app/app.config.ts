import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';

import { appRoutes } from './app.routes';
import { environment } from '../environments/environment.development';
import { authEffects, authFeature, tokenInterceptor } from '@auth/data-access';
import { API_URL } from '@http';
import { userEffects, userFeature } from '@user/data-access';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(authEffects, userEffects),
    provideStore({
      [authFeature.name]: authFeature.reducer,
      [userFeature.name]: userFeature.reducer,
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideRouter(appRoutes),
    {
      provide: API_URL,
      useValue: environment.API_URL,
    },
  ],
};
