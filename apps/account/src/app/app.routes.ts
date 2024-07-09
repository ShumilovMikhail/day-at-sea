import { addObjectGuard, addObjectInfoGuard } from '@account/add-object/data-access';
import { Route } from '@angular/router';
import { authGuard } from '@auth/data-access';

export const appRoutes: Route[] = [
  {
    path: 'account',
    canActivate: [authGuard()],
    children: [
      {
        path: 'settings',
        pathMatch: 'full',
        loadComponent: () => import('@account/settings/feature-settings').then((c) => c.SettingsContainerComponent),
      },
      {
        path: 'settings/contacts/edit',
        loadComponent: () =>
          import('@account/settings/feature-contacts-edit').then((c) => c.ContactsEditContainerComponent),
      },
      {
        path: 'settings/auth/edit',
        loadComponent: () => import('@account/settings/feature-auth-edit').then((c) => c.AuthEditContainerComponent),
      },
      {
        path: 'settings/requisites/edit',
        loadComponent: () =>
          import('@account/settings/feature-requisites-edit').then((c) => c.RequisitesEditContainerComponent),
      },
      {
        path: 'add-object',
        loadComponent: () =>
          import('@account/add-object/feature-add-object-info').then((c) => c.AddObjectInfoContainerComponent),
        pathMatch: 'full',
        canActivate: [addObjectInfoGuard()],
      },
      {
        path: 'add-object/:step',
        loadComponent: () =>
          import('@account/add-object/feature-add-object').then((c) => c.AddObjectContainerComponent),
        canActivate: [addObjectGuard()],
      },
    ],
  },
];
