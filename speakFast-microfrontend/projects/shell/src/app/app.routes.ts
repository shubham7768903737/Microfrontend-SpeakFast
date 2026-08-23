import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
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
	{ path: '', pathMatch: 'full', redirectTo: 'student' },
	{ path: '**', redirectTo: 'student' },
];
