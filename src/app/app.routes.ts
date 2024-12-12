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
    path: 'company-categories',
    loadComponent: () =>
      import('./company-categories/company-categories.component').then(
        (m) => m.CompanyCategoriesComponent,
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
