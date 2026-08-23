import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./component/admin/admin').then((module) => module.Admin),
    },
    {
        path: 'admin',
        loadComponent: () =>
            import('./component/admin/admin').then((module) => module.Admin),
    },
    {
        path: 'teachers',
        loadComponent: () =>
            import('./component/admin/admin-teachers/admin-teachers').then((module) => module.AdminTeachers),
    },
    
];
