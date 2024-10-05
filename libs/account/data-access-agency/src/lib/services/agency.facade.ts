import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

import { AgencyStatus, SalesChannelRequestEntity } from '../types/agency-state.models';
import {
  selectAgency,
  selectAgencyContacts,
  selectAgencyError,
  selectAgencyId,
  selectAgencyLoading,
  selectAgencyRequisites,
  selectAgencyRules,
  selectAgencySalesChannels,
  selectAgencyStatus,
} from '../+state/agency.selectors';
import {
  AgencyEntity,
  AgencyRequisitesEntity,
  AgencyRulesEntity,
  Contacts,
  SalesChannelEntity,
  UpdateRequisitesRequestEntity,
} from '../types/agency.models';
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
  public readonly salesChannels$: Observable<SalesChannelEntity[] | null> =
    this.store.select(selectAgencySalesChannels);
  public readonly contacts$: Observable<Contacts | null> = this.store.select(selectAgencyContacts);
  public readonly requisites$: Observable<AgencyRequisitesEntity | null> = this.store.select(selectAgencyRequisites);
  public readonly rules$: Observable<AgencyRulesEntity | null> = this.store.select(selectAgencyRules);

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

  public addSalesChannels(salesChannelRequest: SalesChannelRequestEntity): void {
    this.agency$.pipe(take(1)).subscribe((agency: AgencyEntity | null) => {
      if (!agency) {
        throw Error('addSalesChannel: agency is null');
      }
      const salesChannelRequestDTO = agencyDTOAdapter.salesChannelRequestEntityToDTO(salesChannelRequest);
      this.store.dispatch(agencyActions.addAgencySalesChannel({ id: agency.id, salesChannel: salesChannelRequestDTO }));
    });
  }

  public updateSalesChannel(salesChannel: SalesChannelEntity): void {
    this.agency$.pipe(take(1)).subscribe((agency: AgencyEntity | null) => {
      if (!agency) {
        throw Error('addSalesChannel: agency is null');
      }
      const salesChannelDTO = agencyDTOAdapter.salesChannelEntityToDTO(salesChannel);
      this.store.dispatch(agencyActions.updateAgencySalesChannel({ id: agency.id, salesChannel: salesChannelDTO }));
    });
  }

  public deleteSalesChannel(salesChannelId: number): void {
    this.agency$.pipe(take(1)).subscribe((agency: AgencyEntity | null) => {
      if (!agency) {
        throw Error('addSalesChannel: agency is null');
      }
      this.store.dispatch(agencyActions.deleteAgencySalesChannel({ id: agency.id, salesChannelId }));
    });
  }
}
