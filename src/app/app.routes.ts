import {Routes} from '@angular/router';
import {authCanActivateChildGuard} from '@oauth/guards/auth-can-activate-child.guard';

export const routes: Routes = [
  {
    path: 'oauth',
    loadChildren: () => import('@oauth/oauth.routes')
      .then(c => c.oauthRoutes)
  },
  {
    path: 'access-denied',
    pathMatch: 'full',
    loadComponent: () => import('@shared/pages')
      .then(c => c.AccessDeniedComponent),
  },
  {
    path: '',
    canActivateChild: [authCanActivateChildGuard],
    loadChildren: () => import('@main/main.routes')
      .then(m => m.mainRoutes)
  },
];
