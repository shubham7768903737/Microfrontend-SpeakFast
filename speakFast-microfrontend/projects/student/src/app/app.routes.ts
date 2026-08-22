import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./component/student/student').then((module) => module.Student),
    },
    {
        path: 'student',
        loadComponent: () =>
            import('./component/student/student').then((module) => module.Student),     
    },
    {
        path: 'student-achievement',
        loadComponent: () =>
            import('./component/student-achievement/student-achievement').then((module) => module.StudentAchievement),     
    }
];
