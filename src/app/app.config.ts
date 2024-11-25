import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';
import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {RELATIVE_API_URL} from '@core/base-class/crud-base.service';
import {OAuthService} from '@oauth/services';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {coreInterceptor} from '@core/interceptors';

function initializeApp() {
  return (): Promise<void> => {
    return inject(OAuthService).appInit();
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withHashLocation()),
    provideAnimations(),
    provideAppInitializer(initializeApp()),
    provideHttpClient(
      withInterceptors([
        coreInterceptor
      ])
    ),
    {
      provide: RELATIVE_API_URL,
      useValue: ''
    }
  ]
};
