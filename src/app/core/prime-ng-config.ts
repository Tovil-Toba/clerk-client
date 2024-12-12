import Aura from '@primeng/themes/aura';
import { PrimeNGConfigType } from 'primeng/config';

import { DARK_MODE_CLASS_NAME } from '../shared/dark-mode-class-name';
import { TRANSLATION } from './translation';

export const PRIME_NG_CONFIG: PrimeNGConfigType = {
  ripple: true,
  theme: {
    options: {
      cssLayer: {
        name: 'primeng',
        order: 'tailwind-base, primeng, tailwind-utilities',
      },
      darkModeSelector: `.${DARK_MODE_CLASS_NAME}`,
    },
    preset: Aura,
  },
  translation: TRANSLATION,
};
