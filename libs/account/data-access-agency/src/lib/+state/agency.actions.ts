import { createActionGroup, props } from '@ngrx/store';

import { ResponseError } from '@http';
import {
  AgencyEntity,
  AgencyRequisitesEntity,
  Contacts,
  AgencyRulesDTO,
  AgencyRulesEntity,
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
    updateAgencyRules: props<{ id: number; rules: AgencyRulesDTO }>(),
    addAgencySalesChannel: props<{ id: number; salesChannel: SalesChannelRequestDTO }>(),
    updateAgencySalesChannel: props<{ id: number; salesChannel: SalesChannelDTO }>(),
    deleteAgencySalesChannel: props<{ id: number; salesChannelId: number }>(),

    getAgencySuccess: props<{ agency: AgencyEntity }>(),
    updateAgencyContactsSuccess: props<{ contacts: Contacts }>(),
    updateAgencyRulesSuccess: props<{ rules: AgencyRulesEntity }>(),
    updateAgencyRequisitesSuccess: props<{ requisites: AgencyRequisitesEntity }>(),
    addAgencySalesChannelSuccess: props<{ salesChannel: SalesChannelEntity }>(),
    updateAgencySalesChannelSuccess: props<{ salesChannel: SalesChannelEntity }>(),
    deleteAgencySalesChannelSuccess: props<{ id: number }>(),

    getAgencyFailure: props<{ error: ResponseError }>(),
    updateAgencyContactsFailure: props<{ error: ResponseError }>(),
    updateAgencyRulesFailure: props<{ error: ResponseError }>(),
    updateAgencyRequisitesFailure: props<{ error: ResponseError }>(),
    addAgencySalesChannelFailure: props<{ error: ResponseError }>(),
    updateAgencySalesChannelFailure: props<{ error: ResponseError }>(),
    deleteAgencySalesChannelFailure: props<{ error: ResponseError }>(),
  },
});
