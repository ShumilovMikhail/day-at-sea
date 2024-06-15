import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AgencyStatus } from '../types/agency-state.models';
import {
  selectAgency,
  selectAgencyContacts,
  selectAgencyError,
  selectAgencyLoading,
  selectAgencyStatus,
} from '../+state/agency.selectors';
import { AgencyEntity, Contacts } from '../types/agency.models';
import { ResponseError } from '@http';
import { agencyActions } from '../+state/agency.actions';

@Injectable({ providedIn: 'root' })
export class AgencyFacade {
  private readonly store = inject(Store);

  public readonly status$: Observable<AgencyStatus | null> =
    this.store.select(selectAgencyStatus);
  public readonly loading$: Observable<boolean> =
    this.store.select(selectAgencyLoading);
  public readonly agency$: Observable<AgencyEntity | null> =
    this.store.select(selectAgency);
  public readonly error$: Observable<ResponseError | null> =
    this.store.select(selectAgencyError);

  public readonly contacts$: Observable<Contacts | null> =
    this.store.select(selectAgencyContacts);

  public init(userId: number): void {
    this.store.dispatch(agencyActions.init({ userId }));
  }
}
