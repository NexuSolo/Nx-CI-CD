import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then(m => m.Home)
  },
  {
    path: 'users',
    loadComponent: () => import('./components/user-list/user-list').then(m => m.UserList)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
