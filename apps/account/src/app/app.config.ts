import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore, provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';

import { appRoutes } from './app.routes';
import { environment } from '../environments/environment.development';
import { authEffects, authFeature, tokenInterceptor } from '@auth/data-access';
import { API_URL } from '@http';
import { agencyEffects, agencyFeature } from '@account/data-access-agency';
import { DADATA_TOKEN } from '@dadata/data-access-address';
import { WINDOW } from '@utils/types';
import { REMOTE_STORAGE_URL } from '@storage/data-access-storage';
import { addObjectInterceptor } from '@account/add-object/data-access';
import { myObjectsEffects, myObjectsFeature } from '@account/my-objects/data-access';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(authEffects, agencyEffects, myObjectsEffects),
    provideStore({
      [authFeature.name]: authFeature.reducer,
      [agencyFeature.name]: agencyFeature.reducer,
      [myObjectsFeature.name]: myObjectsFeature.reducer,
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([addObjectInterceptor, tokenInterceptor])),
    provideRouter(appRoutes),
    {
      provide: API_URL,
      useValue: environment.API_URL,
    },
    {
      provide: DADATA_TOKEN,
      useValue: environment.DADATA_TOKEN,
    },
    {
      provide: DADATA_TOKEN,
      useValue: environment.DADATA_TOKEN,
    },
    {
      provide: WINDOW,
      useFactory: () => window,
    },
    {
      provide: REMOTE_STORAGE_URL,
      useValue: environment.STORAGE_URL,
    },
    provideAnimationsAsync(),
  ],
};
