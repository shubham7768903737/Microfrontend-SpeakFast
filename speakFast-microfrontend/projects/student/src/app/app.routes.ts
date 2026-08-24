import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'student',
    loadComponent: () =>
      import('./component/student/student')
        .then(module => module.Student),
  },

  {
    path: 'student-achievement',
    loadComponent: () =>
      import('./component/student-achievement/student-achievement')
        .then(module => module.StudentAchievement),
  },

  {
    path: 'student-assignment',
    loadComponent: () =>
      import('./component/student-achievement/student-assignment/student-assignment')
        .then(module => module.StudentAssignment),
  },

  {
    path: '',
    redirectTo: 'student',
    pathMatch: 'full',
  },
];