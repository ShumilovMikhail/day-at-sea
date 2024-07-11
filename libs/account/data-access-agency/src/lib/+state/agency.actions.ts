import { createActionGroup, props } from '@ngrx/store';

import { ResponseError } from '@http';
import {
  AgencyEntity,
  AgencyRequisitesEntity,
  Contacts,
  SalesChannelDTO,
  SalesChannelEntity,
  UpdateRequisitesRequestDTO,
} from '../types/agency.models';
import { SalesChannelRequestDTO } from '../types/agency-state.models';

export const agencyActions = createActionGroup({
  source: 'Agency',
  events: {
    init: props<{ userId: number }>(),
    getAgency: props<{ userId: number }>(),
    updateAgencyContacts: props<{ id: number; contacts: Contacts }>(),
    updateAgencyRequisites: props<{ id: number; requisites: UpdateRequisitesRequestDTO }>(),
    addAgencySalesChannel: props<{ id: number; salesChannel: SalesChannelRequestDTO }>(),
    updateAgencySalesChannel: props<{ id: number; salesChannel: SalesChannelDTO }>(),
    deleteAgencySalesChannel: props<{ id: number; salesChannelId: number }>(),

    getAgencySuccess: props<{ agency: AgencyEntity }>(),
    updateAgencyContactsSuccess: props<{ contacts: Contacts }>(),
    updateAgencyRequisitesSuccess: props<{ requisites: AgencyRequisitesEntity }>(),
    addAgencySalesChannelSuccess: props<{ salesChannels: SalesChannelEntity[] }>(),
    updateAgencySalesChannelSuccess: props<{ salesChannel: SalesChannelEntity }>(),
    deleteAgencySalesChannelSuccess: props<{ salesChannels: SalesChannelEntity[] }>(),

    getAgencyFailure: props<{ error: ResponseError }>(),
    updateAgencyContactsFailure: props<{ error: ResponseError }>(),
    updateAgencyRequisitesFailure: props<{ error: ResponseError }>(),
    addAgencySalesChannelFailure: props<{ error: ResponseError }>(),
    updateAgencySalesChannelFailure: props<{ error: ResponseError }>(),
    deleteAgencySalesChannelFailure: props<{ error: ResponseError }>(),
  },
});
