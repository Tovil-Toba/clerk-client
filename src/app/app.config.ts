import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import {
  provideNgxWebstorage,
  withLocalStorage,
  withNgxWebstorageConfig,
  withSessionStorage,
} from 'ngx-webstorage';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';
import { PRIME_NG_CONFIG } from './core/prime-ng-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideNgxWebstorage(
      withLocalStorage(),
      withSessionStorage(),
      withNgxWebstorageConfig({ prefix: '', separator: '' }),
    ),
    providePrimeNG(PRIME_NG_CONFIG),
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
