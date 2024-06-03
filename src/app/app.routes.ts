import { Router, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { guardDemo } from './shared/guards/guard-demo';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component'),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/fighter-list/fighter-list.component'),
        canActivate: [guardDemo],
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
