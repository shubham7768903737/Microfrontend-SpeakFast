import { Routes } from '@angular/router';

export const routes: Routes = [
 {
    path: '',
    redirectTo: 'student-registration',
    pathMatch: 'full'
  },
  {
    path: 'student-registration',
    loadComponent: () =>
      import('./components/student-registration-form/student-registration-form')
        .then(m => m.StudentRegistrationForm)
  }
];
