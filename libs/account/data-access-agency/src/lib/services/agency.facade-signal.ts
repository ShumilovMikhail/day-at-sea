import { Injectable, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';

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
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AgencyFacadeSignal {
  private readonly store = inject(Store);

  public readonly status: Signal<AgencyStatus | null> = toSignal(
    this.store.select(selectAgencyStatus)
  ) as Signal<AgencyStatus | null>;
  public readonly loading: Signal<boolean> = toSignal(this.store.select(selectAgencyLoading)) as Signal<boolean>;
  public readonly agency: Signal<AgencyEntity | null> = toSignal(
    this.store.select(selectAgency)
  ) as Signal<AgencyEntity | null>;
  public readonly error: Signal<ResponseError | null> = toSignal(
    this.store.select(selectAgencyError)
  ) as Signal<ResponseError | null>;
  public readonly id: Signal<number | null> = toSignal(this.store.select(selectAgencyId)) as Signal<number | null>;
  public readonly salesChannels: Signal<SalesChannelEntity[] | null> = toSignal(
    this.store.select(selectAgencySalesChannels)
  ) as Signal<SalesChannelEntity[] | null>;
  public readonly contacts: Signal<Contacts | null> = toSignal(
    this.store.select(selectAgencyContacts)
  ) as Signal<Contacts | null>;
  public readonly requisites: Signal<AgencyRequisitesEntity | null> = toSignal(
    this.store.select(selectAgencyRequisites)
  ) as Signal<AgencyRequisitesEntity | null>;
  public readonly rules: Signal<AgencyRulesEntity | null> = toSignal(
    this.store.select(selectAgencyRules)
  ) as Signal<AgencyRulesEntity | null>;

  public init(userId: number): void {
    this.store.dispatch(agencyActions.init({ userId }));
  }

  public updateContacts(contacts: Contacts): void {
    const agency = this.agency();
    if (!agency) {
      throw Error('updateContacts: agency is null');
    }
    this.store.dispatch(agencyActions.updateAgencyContacts({ id: agency.id, contacts }));
  }

  public updateRequisites(requisitesRequest: UpdateRequisitesRequestEntity): void {
    const agency = this.agency();
    if (!agency) {
      throw Error('updateRequisites: agency is null');
    }
    const requisites = agencyDTOAdapter.requisitesRequestEntityToDTO(requisitesRequest);
    this.store.dispatch(agencyActions.updateAgencyRequisites({ id: agency.id, requisites }));
  }

  public addSalesChannels(salesChannelRequest: SalesChannelRequestEntity): void {
    const agency = this.agency();
    if (!agency) {
      throw Error('addSalesChannel: agency is null');
    }
    const salesChannelRequestDTO = agencyDTOAdapter.salesChannelRequestEntityToDTO(salesChannelRequest);
    this.store.dispatch(agencyActions.addAgencySalesChannel({ id: agency.id, salesChannel: salesChannelRequestDTO }));
  }

  public updateSalesChannel(salesChannel: SalesChannelEntity): void {
    const agency = this.agency();
    if (!agency) {
      throw Error('updateSalesChannel: agency is null');
    }
    const salesChannelDTO = agencyDTOAdapter.salesChannelEntityToDTO(salesChannel);
    this.store.dispatch(agencyActions.updateAgencySalesChannel({ id: agency.id, salesChannel: salesChannelDTO }));
  }

  public deleteSalesChannel(salesChannelId: number): void {
    const agency = this.agency();
    if (!agency) {
      throw Error('deleteSalesChannel: agency is null');
    }
    this.store.dispatch(agencyActions.deleteAgencySalesChannel({ id: agency.id, salesChannelId }));
  }
}
