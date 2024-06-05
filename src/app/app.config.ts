import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { CharactersEffects } from './store/effects/characters.effects';
import { metaReducers, reducers } from './store/reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore(reducers, {
      metaReducers,
      runtimeChecks: {
        strictActionSerializability: true,
        strictActionTypeUniqueness: true,
        strictActionImmutability: true,
        strictActionWithinNgZone: true,
        strictStateSerializability: true,
        strictStateImmutability: true,
      },
    }),
    provideEffects([CharactersEffects]),
    provideStoreDevtools({ maxAge: 10 }),
  ],
};
