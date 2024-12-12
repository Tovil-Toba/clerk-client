import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

import { DarkModeService } from '../core/dark-mode.service';
import { HEADER_MENU_ITEMS } from './header-menu-items';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, MenubarModule, RouterLink],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly _darkModeService = inject(DarkModeService);

  protected isDarkMode: Signal<boolean> = this._darkModeService.isDarkMode;

  protected readonly menuItems: MenuItem[] = HEADER_MENU_ITEMS;

  protected toggleDarkMode(): void {
    this._darkModeService.toggleDarkMode();
  }
}
