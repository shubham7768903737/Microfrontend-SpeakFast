import { Routes } from '@angular/router';
import { CouserGuard } from '../core/gurards/coursesGuard.guard';
import { StudentRegistrationGuard } from '../core/gurards/registrationGuard.guard';

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
    {
        path: 'student-registration',
        loadComponent: () => import('./components/student-registration-form/student-registration-form').then(m => m.StudentRegistrationForm),
        title: 'Student-Registration',
        canActivate: [StudentRegistrationGuard]
    },
     {
        path: 'course',
        loadComponent: () => import('./components/courses/courses').then(m => m.Courses),
        title: 'Courses',
        canActivate: [CouserGuard]
    },
];
