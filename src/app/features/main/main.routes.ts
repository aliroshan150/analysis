import {Routes} from '@angular/router';

export const mainRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('@main/main.component')
      .then(m => m.MainComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('@main/pages')
          .then(m => m.HomeComponent),
      }
    ]
  }
];
