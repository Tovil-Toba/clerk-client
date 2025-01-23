import { MenuItem } from 'primeng/api';

export const HEADER_MENU_ITEMS: MenuItem[] = [
  {
    label: 'Компании',
    icon: 'fa-solid fa-building',
    routerLink: ['/companies'],
  },
  {
    label: 'Контактные лица',
    icon: 'fa-solid fa-users',
    routerLink: ['/contact-faces'],
  },
  {
    label: 'Категории компаний',
    icon: 'fa-solid fa-building-memo',
    routerLink: ['/company-categories'],
  },
  {
    label: 'Должности контактных лиц',
    icon: 'fa-solid fa-address-card',
    routerLink: ['/contact-face-positions'],
  },
  {
    label: 'Менеджеры',
    icon: 'fa-solid fa-user-headset',
    routerLink: ['/managers'],
  },
];
