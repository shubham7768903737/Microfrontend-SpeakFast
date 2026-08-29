import { Routes } from '@angular/router';
import { Admin } from './component/admin/admin';

export const routes: Routes = [

   {
    path : '',
    loadChildren : ()=> import('./component/admin/admin-route.routes').then((m)=>m.adminRoutes)
   }

];