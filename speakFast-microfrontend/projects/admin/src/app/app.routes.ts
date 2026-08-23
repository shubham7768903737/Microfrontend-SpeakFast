import { Routes } from '@angular/router';

export const routes: Routes = [
   {
    path : '',
    loadComponent: () =>
        import('./component/admin/admin').then((module) => module.Admin),
   },
   {
    path : 'admin',
    loadComponent: () =>
        import('./component/admin/admin').then((module) => module.Admin),
   }
];
