import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'account',
    children: [
      {
        path: 'settings',
        loadComponent: () =>
          import('@account/settings/feature-settings').then(
            (c) => c.SettingsContainerComponent
          ),
      },
    ],
  },
];
