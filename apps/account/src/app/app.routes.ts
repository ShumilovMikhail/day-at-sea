import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'account',
    children: [
      {
        path: 'settings',
        pathMatch: 'full',
        loadComponent: () =>
          import('@account/settings/feature-settings').then(
            (c) => c.SettingsContainerComponent
          ),
      },
      {
        path: 'settings/contacts/edit',
        loadComponent: () =>
          import('@account/settings/feature-contacts-edit').then(
            (c) => c.ContactsEditContainerComponent
          ),
      },
      {
        path: 'settings/auth/edit',
        loadComponent: () =>
          import('@account/settings/auth-edit').then(
            (c) => c.AuthEditContainerComponent
          ),
      },
    ],
  },
];
