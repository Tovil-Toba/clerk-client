import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./companies/companies.component').then(
        (m) => m.CompaniesComponent,
      ),
  },
  {
    path: 'companies',
    loadComponent: () =>
      import('./companies/companies.component').then(
        (m) => m.CompaniesComponent,
      ),
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./contacts/contacts.component').then((m) => m.ContactsComponent),
  },
  {
    path: 'company-categories',
    loadComponent: () =>
      import('./company-categories/company-categories.component').then(
        (m) => m.CompanyCategoriesComponent,
      ),
  },
  {
    path: 'contact-faces',
    loadComponent: () =>
      import('./contact-faces/contact-faces.component').then(
        (m) => m.ContactFacesComponent,
      ),
  },
  {
    path: 'contact-face-positions',
    loadComponent: () =>
      import('./contact-face-positions/contact-face-positions.component').then(
        (m) => m.ContactFacePositionsComponent,
      ),
  },
  {
    path: 'contact-offers',
    loadComponent: () =>
      import('./contact-offers/contact-offers.component').then(
        (m) => m.ContactOffersComponent,
      ),
  },
  {
    path: 'managers',
    loadComponent: () =>
      import('./managers/managers.component').then((m) => m.ManagersComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent,
      ),
  },
];
