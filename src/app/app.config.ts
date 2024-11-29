import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';
import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {OAuthService} from '@oauth/services';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {coreInterceptor} from '@core/interceptors';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

function initializeApp() {
  return (): Promise<void> => {
    return inject(OAuthService).appInit();
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withHashLocation()),
    provideAnimationsAsync(),
    provideAppInitializer(initializeApp()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        coreInterceptor
      ])
    )
  ]
};
