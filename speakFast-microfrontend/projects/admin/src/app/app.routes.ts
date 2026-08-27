import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'admin',
        loadChildren: () =>
            import('./component/admin/admin-route.routes')
                .then(m => m.adminRoutes)
    }

];