import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

export const guardDemo = (): true | UrlTree => {
  const router = inject(Router);
  return router.createUrlTree(['/arena']);
};
