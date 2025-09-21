import {
  DOCUMENT,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { DARK_MODE_CLASS_NAME } from '../shared/dark-mode-class-name';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private readonly _document = inject(DOCUMENT);
  private readonly _localStorageService = inject(LocalStorageService);

  private readonly _window = this._document.defaultView;
  private _isDarkMode: WritableSignal<boolean> = signal(false);

  readonly isDarkMode: Signal<boolean> = this._isDarkMode;

  init(): void {
    let isDarkMode: unknown = this._localStorageService.retrieve('isDarkMode');

    if (
      typeof isDarkMode !== 'boolean' &&
      this._window?.matchMedia &&
      this._window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      isDarkMode = true;
    }

    this.setDarkMode(!!isDarkMode);
  }

  setDarkMode(isDarkMode: boolean): void {
    const htmlElement = this._document.querySelector('html');

    if (!htmlElement) {
      return;
    }

    if (isDarkMode) {
      htmlElement.classList.add(DARK_MODE_CLASS_NAME);
    } else {
      htmlElement.classList.remove(DARK_MODE_CLASS_NAME);
    }

    this._isDarkMode.set(isDarkMode);
    this._localStorageService.store('isDarkMode', isDarkMode);
  }

  toggleDarkMode(): void {
    this.setDarkMode(!this._isDarkMode());
  }
}
