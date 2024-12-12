import { MenuItem } from 'primeng/api';

export const HEADER_MENU_ITEMS: MenuItem[] = [
  {
    label: 'Компании',
    icon: 'fa-solid fa-building',
    routerLink: ['/companies'],
  },
  {
    label: 'Категории компаний',
    icon: 'fa-solid fa-building-memo',
    routerLink: ['/company-categories'],
  },
  {
    label: 'Менеджеры',
    icon: 'fa-solid fa-users',
    routerLink: ['/managers'],
  },
];
