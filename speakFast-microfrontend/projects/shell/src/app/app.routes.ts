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
		path : "forgotPassword", loadComponent : ()=> import('./componets/forgot-password/forgot-password').then((m)=>m.ForgotPassword),

		children :[
			{
        path: '',
        redirectTo: 'resetpassword',
        pathMatch: 'full'
      },

      {
        path: 'resetpassword',
        loadComponent: () =>
          import('./componets/forgot-password/reset-password/reset-password')
            .then(m => m.ResetPassword)
      },

      {
        path: 'sentLink',
        loadComponent: () =>
          import('./componets/forgot-password/link-sent/link-sent')
            .then(m => m.LinkSent)
      },

      {
        path: 'confirmPassword/:token',
        loadComponent: () =>
          import('./componets/forgot-password/confirm-password/confirm-password')
            .then(m => m.ConfirmPassword)
      },

      {
        path: 'passwordChanged',
        loadComponent: () =>
          import('./componets/forgot-password/password-changed/password-changed')
            .then(m => m.PasswordChanged)
      }
		]
	},
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

  	{
		path: 'registrationStudent',
		loadChildren: () =>
			loadRemoteModule({
				type: 'module',
				remoteEntry: 'http://localhost:4204/remoteEntry.js',
				exposedModule: './Routes',
			}).then((module) => module.routes),
	},
	{ path: '', pathMatch: 'full', redirectTo: 'registrationStudent' },
	{ path: '**', redirectTo: 'admin' },
];
