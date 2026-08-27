import { Routes } from '@angular/router';

export const adminRoutes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./admin').then(m => m.Admin),

    children: [

      {
        path: '',
        redirectTo: 'recent-enrollments',
        pathMatch: 'full'
      },

      {
        path: 'recent-enrollments',
        loadComponent: () =>
          import('./admin-recent-enrollments-all-student/admin-recent-enrollments-all-student')
            .then(m => m.AdminRecentEnrollmentsAllStudent)
      },

      {
        path: 'students',
        loadComponent: () =>
          import('./admin-allstudents/admin-allstudents')
            .then(m => m.AdminAllstudents)
      },

      {
        path: 'teachers',
        loadComponent: () =>
          import('./admin-teachers/admin-teachers')
            .then(m => m.AdminTeachers)
      },

      {
        path: 'upcoming-batches',
        loadComponent: () =>
          import('./admin-upcoming-batches/admin-upcoming-batches')
            .then(m => m.AdminUpcomingBatches)
      }

    ]
  }

];