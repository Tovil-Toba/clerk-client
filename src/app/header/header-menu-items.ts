import { MenuItem } from 'primeng/api';

export const HEADER_MENU_ITEMS: MenuItem[] = [
  {
    id: 'companies',
    label: 'Компании',
    icon: 'fa-solid fa-building',
    routerLink: ['/companies'],
  },
  {
    id: 'contact-faces',
    label: 'Контактные лица',
    icon: 'fa-solid fa-users',
    routerLink: ['/contact-faces'],
  },
  {
    id: 'contacts',
    label: 'Контакты',
    icon: 'fa-solid fa-rectangle-history-circle-user',
    routerLink: ['/contacts'],
  },
  {
    id: 'managers',
    label: 'Менеджеры',
    icon: 'fa-solid fa-user-headset',
    routerLink: ['/managers'],
  },
  {
    id: 'misc',
    label: 'Прочее',
    icon: 'fa-solid fa-list-ul',
    items: [
      {
        id: 'company-categories',
        label: 'Категории компаний',
        icon: 'fa-solid fa-building-memo',
        routerLink: ['/company-categories'],
      },
      {
        id: 'contact-face-positions',
        label: 'Должности контактных лиц',
        icon: 'fa-solid fa-address-card',
        routerLink: ['/contact-face-positions'],
      },
      {
        id: 'contact-offers',
        label: 'Предложения контактов',
        icon: 'fa-solid fa-briefcase-blank',
        routerLink: ['/contact-offers'],
      },
    ],
  },
];

export const getHeaderMenuItem = (
  id: string,
  menuItems: MenuItem[] = HEADER_MENU_ITEMS,
): MenuItem | undefined => {
  let menuItem = menuItems.find((_menuItem) => _menuItem.id === id);

  if (menuItem) {
    return menuItem;
  }

  menuItems.forEach((_menuItem) => {
    if (_menuItem?.items && !menuItem) {
      menuItem = getHeaderMenuItem(id, _menuItem?.items);
    }
  });

  return menuItem;
};
