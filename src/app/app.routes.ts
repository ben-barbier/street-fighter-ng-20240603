import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component'),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/fighter-list/fighter-list.component'),
        // canActivate: [guardDemo],
      },
      {
        path: 'arena',
        loadComponent: () => import('./pages/arena/arena.component'),
      },
    ],
  },
  {
    path: 'landing',
    loadComponent: () => import('./pages/landing-page/landing-page.component'),
  },
  { path: '**', redirectTo: 'landing' },
];
