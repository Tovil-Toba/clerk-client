import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

import { DarkModeService } from '../core/dark-mode.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, MenubarModule],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly _darkModeService = inject(DarkModeService);

  readonly isDarkMode: Signal<boolean> = this._darkModeService.isDarkMode;

  readonly menuItems: MenuItem[] = [
    {
      label: 'Компании',
      icon: 'fa-solid fa-building',
      routerLink: ['/companies'],
    },
  ];

  toggleDarkMode(): void {
    this._darkModeService.toggleDarkMode();
  }
}
