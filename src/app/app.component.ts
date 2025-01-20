import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToastModule } from 'primeng/toast';

import { ApiService } from '../api/api.service';
import { ApiConfiguration } from '../api/api-configuration';
import { environment } from '../environments/environment';
import { DarkModeService } from './core/dark-mode.service';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    CardModule,
    ConfirmDialogModule,
    HeaderComponent,
    PanelModule,
    RouterOutlet,
    ScrollPanelModule,
    ToastModule,
  ],
  providers: [ApiService, ConfirmationService, DialogService, MessageService],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly _apiConfiguration = inject(ApiConfiguration);
  private readonly _darkModeService = inject(DarkModeService);

  constructor() {
    this._apiConfiguration.rootUrl = environment.apiUrl;

    this._darkModeService.init();
  }
}
