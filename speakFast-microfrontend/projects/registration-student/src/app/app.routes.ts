import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/teachers-slots/teachers-slots').then(m => m.TeachersSlots),
        title: 'TeachersSlots',
    },
    {
        path: 'teacherslot',
        loadComponent: () => import('./components/teachers-slots/teachers-slots').then(m => m.TeachersSlots),
        title: 'TeachersSlots',
    },
];
