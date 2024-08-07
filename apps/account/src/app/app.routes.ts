import { Route } from '@angular/router';

import { addObjectGuard, addObjectInfoGuard } from '@account/add-object/data-access';
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
        path: 'add-object/infrastructure',
        loadComponent: () =>
          import('@account/add-object/feature-add-object-infrastructure').then(
            (c) => c.AddObjectInfrastructureContainerComponent
          ),
        canActivate: [addObjectGuard()],
      },
      {
        path: 'add-object/characteristics',
        loadComponent: () =>
          import('@account/add-object/feature-add-object-characteristics').then(
            (c) => c.AddObjectCharacteristicsContainerComponent
          ),
        canActivate: [addObjectGuard()],
      },
      {
        path: 'add-object/photos',
        loadComponent: () =>
          import('@account/add-object/feature-add-object-photos').then((c) => c.AddObjectPhotosContainerComponent),
        canActivate: [addObjectGuard()],
      },
      {
        path: 'add-object/photos',
        loadComponent: () =>
          import('@account/add-object/feature-add-object-photos').then((c) => c.AddObjectPhotosContainerComponent),
        canActivate: [addObjectGuard()],
      },
      {
        path: 'add-object/rules',
        loadComponent: () =>
          import('@account/add-object/feature-add-object-rules').then((c) => c.AddObjectRulesContainerComponent),
        canActivate: [addObjectGuard()],
      },
      {
        path: 'add-object/services',
        loadComponent: () =>
          import('@account/add-object/feature-add-object-services').then((c) => c.AddObjectServicesContainerComponent),
        canActivate: [addObjectGuard()],
      },
      {
        path: 'add-object/prices',
        loadComponent: () =>
          import('@account/add-object/feature-add-object-prices').then((c) => c.AddObjectPricesContainerComponent),
        canActivate: [addObjectGuard()],
      },
      {
        path: 'sales-channels',
        loadComponent: () =>
          import('@account/sales-channels/feature-sales-channels').then((c) => c.SalesChannelsContainerComponent),
      },
      {
        path: 'my-objects',
        loadComponent: () =>
          import('@account/my-objects/feature-my-objects').then((c) => c.MyObjectsContainerComponent),
      },
    ],
  },
];
