import {Routes} from '@angular/router';

export const oauthRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('@oauth/oauth.component')
      .then(m => m.OauthComponent),
    children: [
      {
        path: 'sign-up',
        loadComponent: () => import('@oauth/pages')
          .then(m => m.SignUpComponent),
      },
      {
        path: 'login',
        loadComponent: () => import('@oauth/pages')
          .then(m => m.LoginComponent),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
    ]
  }
]
