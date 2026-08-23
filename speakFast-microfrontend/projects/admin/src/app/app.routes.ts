import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./component/admin/admin').then(m => m.Admin),
        title: 'Admin',
    },
    {
        path: 'admin',
        loadComponent: () => import('./component/admin/admin').then(m => m.Admin),
        title: 'Admin',
    },
    {
        path: 'recent-enrollments',
        loadComponent: () => import('./component/admin/admin-recent-enrollments-all-student/admin-recent-enrollments-all-student')
            .then(m => m.AdminRecentEnrollmentsAllStudent),
        title: 'Recent Enrollments',
    },
    {
        path: 'teachers',
        loadComponent: () => import('./component/admin/admin-teachers/admin-teachers').then(m => m.AdminTeachers),
        title: 'Teachers',
    },
    {
        path: 'students',
        loadComponent: () => import('./component/admin/admin-allstudents/admin-allstudents').then(m => m.AdminAllstudents),
        title: 'All Students',
    },
    {
        path: 'upcoming-batches',
        loadComponent: () => import('./component/admin/admin-upcoming-batches/admin-upcoming-batches').then(m => m.AdminUpcomingBatches),
        title: 'Upcoming Batches',
    },
    {
        path: '**',
        redirectTo: '',
    },
];
