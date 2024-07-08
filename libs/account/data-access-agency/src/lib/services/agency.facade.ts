import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

import { AgencyStatus } from '../types/agency-state.models';
import {
  selectAgency,
  selectAgencyContacts,
  selectAgencyError,
  selectAgencyId,
  selectAgencyLoading,
  selectAgencyRequisites,
  selectAgencyStatus,
} from '../+state/agency.selectors';
import { AgencyEntity, AgencyRequisitesEntity, Contacts, UpdateRequisitesRequestEntity } from '../types/agency.models';
import { ResponseError } from '@http';
import { agencyActions } from '../+state/agency.actions';
import { agencyDTOAdapter } from '../+state/agency-dto.adapter';

@Injectable({ providedIn: 'root' })
export class AgencyFacade {
  private readonly store = inject(Store);

  public readonly status$: Observable<AgencyStatus | null> = this.store.select(selectAgencyStatus);
  public readonly loading$: Observable<boolean> = this.store.select(selectAgencyLoading);
  public readonly agency$: Observable<AgencyEntity | null> = this.store.select(selectAgency);
  public readonly error$: Observable<ResponseError | null> = this.store.select(selectAgencyError);
  public readonly id$: Observable<number | null> = this.store.select(selectAgencyId);

  public readonly contacts$: Observable<Contacts | null> = this.store.select(selectAgencyContacts);

  public readonly requisites$: Observable<AgencyRequisitesEntity | null> = this.store.select(selectAgencyRequisites);

  public init(userId: number): void {
    this.store.dispatch(agencyActions.init({ userId }));
  }

  public updateContacts(contacts: Contacts): void {
    this.agency$.pipe(take(1)).subscribe((agency: AgencyEntity | null) => {
      if (!agency) {
        throw Error('updateContacts: agency is null');
      }
      this.store.dispatch(agencyActions.updateAgencyContacts({ id: agency.id, contacts }));
    });
  }

  public updateRequisites(requisitesRequest: UpdateRequisitesRequestEntity): void {
    this.agency$.pipe(take(1)).subscribe((agency: AgencyEntity | null) => {
      if (!agency) {
        throw Error('updateRequisites: agency is null');
      }
      const requisites = agencyDTOAdapter.requisitesRequestEntityToDTO(requisitesRequest);
      this.store.dispatch(agencyActions.updateAgencyRequisites({ id: agency.id, requisites }));
    });
  }
}
