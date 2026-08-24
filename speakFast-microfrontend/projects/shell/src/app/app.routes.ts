import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
	{
		path: 'login',
		loadComponent: () =>
			import('./componets/login/login').then((module) => module.Login),
	},
	{ path: 'login/confirmPassword', loadComponent: () => import('./componets/forgot-password/confirm-password/confirm-password').then((module) => module.ConfirmPassword) },
	{
		path: 'admin',
		loadChildren: () =>
			loadRemoteModule({
				type: 'module',
				remoteEntry: 'http://localhost:4201/remoteEntry.js',
				exposedModule: './Routes',
			}).then((module) => module.routes),
	},
	{
		path: 'student',
		loadChildren: () =>
			loadRemoteModule({
				type: 'module',
				remoteEntry: 'http://localhost:4202/remoteEntry.js',
				exposedModule: './Routes',
			}).then((module) => module.routes),
	},
	{
		path: 'teacher',
		loadChildren: () =>
			loadRemoteModule({
				type: 'module',
				remoteEntry: 'http://localhost:4203/remoteEntry.js',
				exposedModule: './Routes',
			}).then((module) => module.routes),
	},
	{ path: '', pathMatch: 'full', redirectTo: 'admin' },
	{ path: '**', redirectTo: 'admin' },
];
