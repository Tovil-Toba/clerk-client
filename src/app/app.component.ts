import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Aura } from 'primeng/themes/aura';

import { ApiService } from '../api/api.service';
import { ApiConfiguration } from '../api/api-configuration';
import { CompaniesComponent } from './companies/companies.component';
import { DarkModeService } from './core/dark-mode.service';
import { HeaderComponent } from './header/header.component';
import { DARK_MODE_CLASS_NAME } from './shared/dark-mode-class-name';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CompaniesComponent, HeaderComponent],
  providers: [ApiService],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly _apiConfiguration = inject(ApiConfiguration);
  private readonly _darkModeService = inject(DarkModeService);
  private readonly _primengConfig = inject(PrimeNGConfig);

  title = 'clerk-client';

  constructor() {
    this._apiConfiguration.rootUrl = 'http://localhost:3000';

    this._primengConfig.theme.set({
      preset: Aura,
      options: {
        cssLayer: {
          name: 'primeng',
          order: 'tailwind-base, primeng, tailwind-utilities',
        },
        darkModeSelector: `.${DARK_MODE_CLASS_NAME}`,
      },
    });

    this._primengConfig.ripple.set(true);

    this._darkModeService.init();
  }
}
